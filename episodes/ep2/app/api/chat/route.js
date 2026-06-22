// EP0 — the one thing that makes Muse talk.
// A tiny server route that forwards your message to Claude and returns the reply.
// We keep it deliberately small. Every later episode grows THIS file (or its neighbors)
// only when the project hits a wall. That's top-down.

import Anthropic from "@anthropic-ai/sdk";
import { NOTES } from "../../notes"; // EP2 — your notes

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

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

    const reply = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: MUSE_PERSONA + context,
      messages,
    });

    const text = reply.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return Response.json({ text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err?.message ?? "Something went wrong" }, { status: 500 });
  }
}
