# EP1 Handout — Muse의 '페르소나(역할)' 한 줄

복붙용 자료. EP0를 끝낸 상태에서 시작해요. (EP0 코드: 태그 `ep0`)
This builds on EP0. Don't retype — copy below.

---

## 핵심 한 줄 정리
페르소나 = **말투(성격)** 만이 아니라 **역할(role)**. 역할을 주면 답이 그 분야 **전문가**처럼 바뀐다.
이 가벼운 한 줄이 시작 — 여기에 **필요한 정보(데이터)를 더하면** 점점 전문화된다(→ 다음 편 **래그/RAG**).

## 바꾸는 파일은 하나: `app/api/chat/route.js`
EP0의 `system: "..."` 한 줄을, 아래처럼 **MUSE_PERSONA 상수**로 바꿔요.

### ① 상수 추가 (`new Anthropic()` 아래)
```js
// EP1 — Muse의 성격/역할이 여기 산다. 이 줄을 바꾸면 Muse가 달라진다.
const MUSE_PERSONA =
  "You are Muse — a warm, upbeat personal assistant. " +
  "Keep replies short and focused: 2 to 4 sentences, simple words, one friendly emoji. " +
  "If a question is vague, ask one quick clarifying question instead of guessing.";
```

### ② 연결 (`messages.create` 안의 system)
```js
system: MUSE_PERSONA,
```

## 역할(role)을 바꿔보기 — 같은 질문, 다른 전문가
`MUSE_PERSONA` 만 바꾸면 끝. 예시(복붙):
```js
// 여행 플래너
const MUSE_PERSONA =
  "You are Muse, an expert day & travel planner. " +
  "Give a concrete plan with time blocks (11:00, 14:00…) and a rough budget. " +
  "Keep it tight, 4-6 short lines, one emoji. Answer in Korean.";
```
```js
// 공부 코치
const MUSE_PERSONA =
  "You are Muse, an encouraging study coach. " +
  "Break the goal into 3 small steps and give one motivating line. " +
  "Short, friendly, one emoji. Answer in Korean.";
```

## 이 편 완성 코드 받기
- 브라우저로 보기: https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep1
- 통째로(태그): `git fetch --tags && git checkout ep1`
- 파일만 복사: [`app/api/chat/route.js`](https://github.com/MUSE-CODE-SPACE/topdown-llm/blob/ep1/app/api/chat/route.js)

## 실행
```bash
npm run dev   # 그리고 모호하게 물어보세요 — 짧게 답하고 되물어요
```
---
*다음 편(EP2): 역할에 '내 정보'를 더하기 — 래그(RAG)*
