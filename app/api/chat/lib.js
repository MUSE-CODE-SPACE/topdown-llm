// Pure helpers used by app/api/chat/route.js — no network, no disk, so they can be unit-tested.

// EP2 — the tiny "retrieve" step of RAG: find the notes most related to the question.
export function retrieve(query, notes, k = 2) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return notes
    .map((note) => ({ note, hits: words.filter((w) => note.toLowerCase().includes(w)).length }))
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, k)
    .map((x) => x.note);
}

// EP6 — guardrail #2: check the user's input before we even call the AI.
export function guardInput(text) {
  if (!text || !text.trim()) return "메시지를 입력해 주세요 🙂";
  if (text.length > 2000) return "메시지가 너무 길어요. 조금 줄여서 다시 보내주실래요? 🙏";
  return null; // ok
}

// EP3 — we run the calc tool ourselves — safely (numbers and + - * / ( ) only).
export function runCalc(expression) {
  if (!/^[\d\s+\-*/().]+$/.test(expression)) return "invalid expression";
  try { return String(Function(`"use strict"; return (${expression})`)()); }
  catch { return "could not calculate"; }
}

// EP8 — speed & cost: small question → small, cheap, fast model; otherwise the strong one.
export function pickModel(text) {
  return text.trim().length < 30 ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";
}

// EP10 — Muse's signature: the Top-Down Tutor. If you want to learn, it teaches the way you built it.
export function tutorMode(text) {
  if (!/가르쳐|배우고 싶|공부|어떻게 시작|배우려/.test(text)) return "";
  return "\n\nTutor mode (top-down): start with one tiny doable project, not theory. " +
    "Explain only what's needed right now, in plain words a beginner gets. " +
    "End by asking the learner to say it back in their own words. Compare them only to yesterday's self.";
}
