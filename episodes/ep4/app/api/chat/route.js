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
    const found = retrieve(lastUser, NOTES);
    const context = found.length ? `\n\nWhat you know about the user:\n- ${found.join("\n- ")}` : "";

    // EP4 — memory: load what the user told us before, and remember this message for next time.
    const memory = loadMemory();
    const memText = memory.length ? `\n\nThings the user told you earlier:\n- ${memory.slice(-8).join("\n- ")}` : "";
    if (lastUser) { memory.push(lastUser); saveMemory(memory); }

    // EP3 — tool-use loop: let Muse call a tool, run it, hand the result back, repeat.
    const convo = [...messages];
    let reply = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: MUSE_PERSONA + context + memText,
      tools,
      messages: convo,
    });

    while (reply.stop_reason === "tool_use") {
      const call = reply.content.find((b) => b.type === "tool_use");
      const result = call.name === "calc" ? runCalc(call.input.expression) : "unknown tool";
      convo.push({ role: "assistant", content: reply.content });
      convo.push({ role: "user", content: [{ type: "tool_result", tool_use_id: call.id, content: result }] });
      reply = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: MUSE_PERSONA + context + memText,
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
