"use client";
import { useState } from "react";

// EP0 — the simplest chat that works. Type, send, Muse replies. That's it.
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply = data.text ?? `⚠️ ${data.error ?? "Something went wrong"}`;
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", content: "⚠️ Network error" }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="wrap">
      <h1>🪄 Muse <span className="ep">EP0</span></h1>
      <div className="chat">
        {messages.length === 0 && <p className="hint">Say hi to Muse 👋</p>}
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>{m.content}</div>
        ))}
        {busy && <div className="bubble assistant">…</div>}
      </div>
      <div className="row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message…"
        />
        <button onClick={send} disabled={busy}>Send</button>
      </div>
    </main>
  );
}
