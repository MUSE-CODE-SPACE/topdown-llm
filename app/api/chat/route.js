// EP0 — the one thing that makes Muse talk.
// A tiny server route that forwards your message to Claude and returns the reply.
// We keep it deliberately small. Every later episode grows THIS file (or its neighbors)
// only when the project hits a wall. That's top-down.

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

export async function POST(req) {
  try {
    const { messages } = await req.json(); // [{ role: "user"|"assistant", content: "..." }]

    const reply = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: "You are Muse, a warm, concise personal assistant. Answer simply and kindly.",
      messages,
    });

    const text = reply.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return Response.json({ text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err?.message ?? "Something went wrong" }, { status: 500 });
  }
}
