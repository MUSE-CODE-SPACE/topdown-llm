# EP5 Handout — 여러 단계를 스스로 (에이전트 루프)

EP4 다음. 태그 `ep5`. 도구가 둘 이상이면, Muse가 **스스로 여러 단계**를 밟아요 = 에이전트.

## `app/api/chat/route.js` — 2번째 도구 추가
```js
// EP5 — 도구가 둘 이상이면, Muse가 단계를 스스로 이어붙인다 = 에이전트.
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
```
그리고 루프 안의 실행을 `runTool`로:
```js
const result = runTool(call); // 어떤 도구든
```
(EP3의 while 루프가 그대로 여러 번 돌아요. 도구→결과→또 도구→… → 최종 답.)

## 해보기
"오늘 며칠이야? 그리고 그 날짜 숫자(연·월·일)를 다 더하면?" → 🔧 today → 🔧 calc → 답.

## 이 편 코드
폴더 episodes/ep5 · `git checkout ep5` · tree/ep5
---
*다음 편(EP6): 사고 안 치게 — 가드레일*
