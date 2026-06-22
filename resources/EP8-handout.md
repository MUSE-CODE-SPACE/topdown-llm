# EP8 Handout — 빠르고 싸게 (캐싱 · 모델 선택)

EP7 다음. 태그 `ep8`. 똑같은 품질을 더 싸고 빠르게.
두 가지: ① 작은 질문엔 작은(싼·빠른) 모델 ② 안 바뀌는 지시문은 **캐싱**.

## `app/api/chat/route.js`
모델 선택:
```js
// EP8 — 작은 질문 → 작고 싼 빠른 모델, 그 외 → 강한 모델
function pickModel(text) {
  return text.trim().length < 30 ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";
}
```
요청 처리 안에서 — 모델 고르고 system을 '캐시 블록'으로:
```js
const model = pickModel(lastUser);
const system = [
  { type: "text", text: MUSE_PERSONA + SAFETY, cache_control: { type: "ephemeral" } }, // 안 바뀜 → 캐싱
  { type: "text", text: context + memText },                                            // 매번 바뀜
];
```
그리고 두 create 호출의 `model: "..."` , `system: "..."` 를 `model,` `system,` 으로 교체.

## 왜?
- **모델 선택**: "안녕!" 같은 짧은 건 굳이 비싼 모델 필요 X → haiku로 빠르고 싸게.
- **캐싱**: 매번 똑같이 보내는 성격·안전 규칙을, 모델이 다시 안 읽고 '캐시'에서 → 반복 호출이 더 싸고 빠름.

## 이 편 코드
폴더 episodes/ep8 · `git checkout ep8` · tree/ep8
---
*다음 편(EP9): 세상에 공개 — 배포(deploy)*
