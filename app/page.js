"use client"; // 브라우저에서 실행되는 화면이에요.
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]); // 대화 기록 [{ role, content }]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 새로고침해도 대화가 남도록 브라우저(localStorage)에 저장해요.
  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem("chat") || "[]"));
  }, []);
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  async function send(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const next = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // 대화 전체를 서버로 보내야 AI가 앞의 내용을 기억해요.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.text);
      setMessages([...next, { role: "assistant", content: data.text }]);
    } catch (error) {
      alert(error.message || "서버에 연결할 수 없어요.");
      setMessages(messages); // 실패하면 방금 보낸 질문을 되돌려요.
    } finally {
      setLoading(false); // 성공하든 실패하든 '생각하는 중...'을 꺼요.
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", padding: 16, boxSizing: "border-box" }}>
      <h1 style={{ fontSize: 22 }}>
        나만의 AI 비서{" "}
        <button onClick={() => setMessages([])} style={{ fontSize: 13 }}>새 대화</button>
      </h1>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {messages.length === 0 && <p style={{ color: "#888" }}>무엇이든 물어보세요!</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{ display: "inline-block", padding: "8px 12px", borderRadius: 12, whiteSpace: "pre-wrap", textAlign: "left", maxWidth: "80%", background: m.role === "user" ? "#2563eb" : "#fff", color: m.role === "user" ? "#fff" : "#000" }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: "#888" }}>생각하는 중...</p>}
      </div>

      <form onSubmit={send} style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력하세요" style={{ flex: 1, padding: 10, fontSize: 16 }} />
        <button disabled={loading} style={{ padding: "0 16px" }}>보내기</button>
      </form>
    </main>
  );
}
