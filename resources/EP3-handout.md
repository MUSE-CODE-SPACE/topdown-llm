# EP3 Handout — Muse에게 '도구' 쥐여주기 (Tool Use)

복붙용. EP2(래그) 다음. 완성 코드 태그: `ep3`.
AI는 계산을 *추측*해서 가끔 틀려요. → **도구(계산기)** 를 주면, AI가 직접 불러서 정확히 해요.
핵심 흐름: AI가 "이건 도구가 필요해" 판단 → 우리가 **도구를 실행** → 결과를 돌려주면 → AI가 최종 답.

---

## `app/api/chat/route.js` 에 추가

### ① 도구 정의 (MUSE_PERSONA 아래)
```js
// EP3 — Muse가 부를 수 있는 도구. (LLM은 계산을 추측하지만, 도구는 정확하다.)
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

// 도구는 우리가 직접 실행 — 안전하게(숫자와 + - * / ( ) 만).
function runCalc(expression) {
  if (!/^[\d\s+\-*/().]+$/.test(expression)) return "invalid expression";
  try { return String(Function(`"use strict"; return (${expression})`)()); }
  catch { return "could not calculate"; }
}
```

### ② 툴 사용 루프 (`messages.create` 부분 교체)
```js
const convo = [...messages];
let reply = await anthropic.messages.create({
  model: "claude-sonnet-4-6", max_tokens: 1024,
  system: MUSE_PERSONA + context, tools, messages: convo,
});

while (reply.stop_reason === "tool_use") {       // AI가 도구를 부르면
  const call = reply.content.find((b) => b.type === "tool_use");
  const result = call.name === "calc" ? runCalc(call.input.expression) : "unknown tool";
  convo.push({ role: "assistant", content: reply.content });                 // AI의 도구 호출 기록
  convo.push({ role: "user", content: [{ type: "tool_result", tool_use_id: call.id, content: result }] }); // 결과 전달
  reply = await anthropic.messages.create({       // 다시 물어서 최종 답
    model: "claude-sonnet-4-6", max_tokens: 1024,
    system: MUSE_PERSONA + context, tools, messages: convo,
  });
}
```

## 해보기
```bash
npm run dev
```
- "987654 곱하기 4321 정확히?" → 도구 호출 → 4,267,652,934 🎯
- 도구를 빼면, 큰 수 곱셈에서 가끔 틀려요(추측).

## 도구는 계속 늘릴 수 있어요
같은 패턴으로 `tools`에 항목을 추가하면 됨 — 오늘 날짜, 웹 검색, 일정 추가 등. (이름 + 설명 + input_schema, 그리고 실행 함수.)

## 이 편 완성 코드
- 보기: https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep3
- git: `git fetch --tags && git checkout ep3`
---
*다음 편(EP4): Muse가 나를 '기억'하게 — memory*
