// EP2 실측: 같은 질문 10개를 검색 방식별로 물어보고 정답률을 재요.
// 실행: node --env-file=.env.local eval/rag_test.mjs keyword embed none
// 함정 질문: QSET=trap node --env-file=.env.local eval/rag_test.mjs keyword embed
import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const QSET = process.env.QSET || "";
const questions = JSON.parse(fs.readFileSync(`eval/questions${QSET ? "_" + QSET : ""}.json`, "utf8"));
const RESULTS = `eval/results${QSET ? "_" + QSET : ""}.json`;
const RUNS = 3;

// route.js 의 시스템 프롬프트를 그대로 가져와요 (앱과 같은 조건).
const route = fs.readFileSync("app/api/chat/route.js", "utf8");
const SYSTEM_PROMPT = route.match(/const SYSTEM_PROMPT = `([\s\S]*?)`;/)[1];

function formatNotes(notes) {
  if (notes.length === 0) return "\n\n[참고 메모]\n(질문과 관련된 메모를 찾지 못했어요)";
  return "\n\n[참고 메모]\n" + notes.map((n) => `--- 파일: ${n.file} ---\n${n.text}`).join("\n\n");
}

const searchers = {
  none: async () => [],
  keyword: async (q) => (await import("../lib/search-keyword.js")).search(q),
  embed: async (q) => (await import("../lib/search-embed.js")).search(q),
};

const modes = process.argv.slice(2);
const out = fs.existsSync(RESULTS) ? JSON.parse(fs.readFileSync(RESULTS, "utf8")) : {};

for (const mode of modes) {
  const rows = [];
  for (const item of questions) {
    const t0 = Date.now();
    const found = await searchers[mode](item.q);
    const searchMs = Date.now() - t0;
    const files = found.map((n) => n.file);
    const answers = [];
    for (let r = 0; r < RUNS; r++) {
      const res = await client.messages.create({
        model: "claude-sonnet-5-5",
        max_tokens: 1024,
        system: SYSTEM_PROMPT + formatNotes(found),
        messages: [{ role: "user", content: item.q }],
      });
      const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("");
      answers.push({ text, correct: new RegExp(item.check).test(text) });
    }
    const row = {
      id: item.id, type: item.type, q: item.q, gold: item.gold,
      top3: files, scores: found.map((n) => Math.round(n.score * 1000) / 1000),
      hit1: item.gold ? files[0] === item.gold : null, hit3: item.gold ? files.includes(item.gold) : null,
      correct: answers.filter((a) => a.correct).length, searchMs, answers,
    };
    rows.push(row);
    console.log(mode, item.id, row.hit3 ? "찾음" : "못찾음", `${row.correct}/${RUNS}`, files.map((f, i) => f + ":" + row.scores[i]).join(", "));
  }
  const sum = (f) => rows.filter(f).length;
  out[mode] = {
    hit3: sum((r) => r.hit3), hit1: sum((r) => r.hit1),
    correct: rows.reduce((s, r) => s + r.correct, 0), total: rows.length * RUNS,
    same: { hit3: sum((r) => r.type === "같은 말" && r.hit3), correct: rows.filter((r) => r.type === "같은 말").reduce((s, r) => s + r.correct, 0) },
    diff: { hit3: sum((r) => r.type === "다른 말" && r.hit3), correct: rows.filter((r) => r.type === "다른 말").reduce((s, r) => s + r.correct, 0) },
    rows,
  };
  console.log(mode, "검색 적중", out[mode].hit3 + "/10", "정답", out[mode].correct + "/" + out[mode].total);
}
fs.writeFileSync(RESULTS, JSON.stringify(out, null, 2));
