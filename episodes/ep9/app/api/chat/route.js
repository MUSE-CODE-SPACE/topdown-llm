// EP0 — the one thing that makes Muse talk.
// A tiny server route that forwards your message to Claude and returns the reply.
// We keep it deliberately small. Every later episode grows THIS file (or its neighbors)
// only when the project hits a wall. That's top-down.

import Anthropic from "@anthropic-ai/sdk";
import { NOTES } from "../../notes"; // EP2 — your notes
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"; // EP4 — memory on disk

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

// EP4 — memory: remember things across sessions by saving them to a small file.
const MEM_FILE = process.cwd() + "/data/memory.json";
function loadMemory() {
  try { return JSON.parse(readFileSync(MEM_FILE, "utf8")); } catch { return []; }
}
function saveMemory(list) {
  mkdirSync(process.cwd() + "/data", { recursive: true });
  writeFileSync(MEM_FILE, JSON.stringify(list.slice(-30), null, 2)); // keep last 30
}

// EP2 — the tiny "retrieve" step of RAG: find the notes most related to the question.
function retrieve(query, notes, k = 2) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return notes
    .map((note) => ({ note, hits: words.filter((w) => note.toLowerCase().includes(w)).length }))
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, k)
    .map((x) => x.note);
}

// EP1 — Muse's personality lives here. Change these lines, change who Muse is.
const MUSE_PERSONA =
  "You are Muse — a warm, upbeat personal assistant. " +
  "Keep replies short and focused: 2 to 4 sentences, simple words, one friendly emoji. " +
  "If a question is vague, ask one quick clarifying question instead of guessing.";

// EP6 — guardrail #1: tell the AI what it must NOT do.
const SAFETY =
  "\n\nSafety rules (always follow): never help with harmful, illegal, or destructive " +
  "actions (e.g. deleting files, hacking, weapons), and never run unsafe code. " +
  "If asked, kindly refuse in one sentence and offer a safe alternative.";

// EP6 — guardrail #2: check the user's input before we even call the AI.
function guardInput(text) {
  if (!text || !text.trim()) return "메시지를 입력해 주세요 🙂";
  if (text.length > 2000) return "메시지가 너무 길어요. 조금 줄여서 다시 보내주실래요? 🙏";
  return null; // ok
}

// EP3 — a tool Muse can actually call. (LLMs guess at math; a tool does it exactly.)
const tools = [
  {
    name: "calc",
    description: "Do exact arithmetic. Always use this for any math.",
    input_schema: {
      type: "object",
      properties: { expression: { type: "string", description: "e.g. 1234 * 5678" } },
      required: ["expression"],
    },
  },
];

// We run the tool ourselves — safely (numbers and + - * / ( ) only).
function runCalc(expression) {
  if (!/^[\d\s+\-*/().]+$/.test(expression)) return "invalid expression";
  try { return String(Function(`"use strict"; return (${expression})`)()); }
  catch { return "could not calculate"; }
}

// EP5 — a 2nd tool. With more than one tool, Muse can chain steps by itself = an agent.
tools.push({
  name: "today",
  description: "Get today's date as YYYY-MM-DD.",
  input_schema: { type: "object", properties: {}, required: [] },
});
function runTool(call) {
  if (call.name === "calc") return runCalc(call.input.expression);
  if (call.name === "today") return new Date().toISOString().slice(0, 10);
  return "unknown tool";
}

// EP8 — speed & cost: small question → small, cheap, fast model; otherwise the strong one.
function pickModel(text) {
  return text.trim().length < 30 ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";
}

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "No API key yet. Add ANTHROPIC_API_KEY to .env.local (see README), then restart." },
        { status: 500 }
      );
    }
    const { messages } = await req.json(); // [{ role: "user"|"assistant", content: "..." }]

    // EP2 — RAG: find relevant notes, then add them to the system so Muse can use them.
    const lastUser = messages[messages.length - 1]?.content ?? "";

    // EP6 — stop bad/empty input before it reaches the model.
    const blocked = guardInput(lastUser);
    if (blocked) return Response.json({ text: blocked });
    const found = retrieve(lastUser, NOTES);
    const context = found.length ? `\n\nWhat you know about the user:\n- ${found.join("\n- ")}` : "";

    // EP4 — memory: load what the user told us before, and remember this message for next time.
    const memory = loadMemory();
    const memText = memory.length ? `\n\nThings the user told you earlier:\n- ${memory.slice(-8).join("\n- ")}` : "";
    if (lastUser) { memory.push(lastUser); saveMemory(memory); }

    // EP3 — tool-use loop: let Muse call a tool, run it, hand the result back, repeat.
    const convo = [...messages];
    // EP8 — pick a model by size, and CACHE the stable instructions (cheaper + faster on repeat).
    const model = pickModel(lastUser);
    const system = [
      { type: "text", text: MUSE_PERSONA + SAFETY, cache_control: { type: "ephemeral" } }, // stable → cached
      { type: "text", text: context + memText },                                            // changes each time
    ];
    let reply = await anthropic.messages.create({
      model,
      max_tokens: 1024,
      system,
      tools,
      messages: convo,
    });

    while (reply.stop_reason === "tool_use") {
      const call = reply.content.find((b) => b.type === "tool_use");
      const result = runTool(call); // EP5 — any of our tools
      convo.push({ role: "assistant", content: reply.content });
      convo.push({ role: "user", content: [{ type: "tool_result", tool_use_id: call.id, content: result }] });
      reply = await anthropic.messages.create({
        model,
        max_tokens: 1024,
        system,
        tools,
        messages: convo,
      });
    }

    const text = reply.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return Response.json({ text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err?.message ?? "Something went wrong" }, { status: 500 });
  }
}
