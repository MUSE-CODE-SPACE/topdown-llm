# EP2 Handout — Muse가 '내 노트'로 답하게 (래그/RAG)

복붙용. EP1(페르소나) 다음. 완성 코드 태그: `ep2`.
RAG = **검색(retrieve) + 생성(generate)**. 내 정보를 *찾아서* → 답에 *넣는다*.

---

## ① 내 노트 파일 — `app/notes.js` (새 파일)
```js
// EP2 — Muse가 참고할 '나에 대한' 메모. 자유롭게 바꿔보세요.
export const NOTES = [
  "내 이름은 윤이고, 프론트엔드 개발을 공부하는 중이다.",
  "이번 주 목표는 탑다운 LLM 강좌 EP2를 금요일까지 만드는 것이다.",
  "커피는 디카페인 라떼만 마신다.",
  "다음 달에 제주도로 3박 4일 여행을 간다.",
  "고양이 이름은 모카이고, 두 살이다.",
];
```

## ② `app/api/chat/route.js` — 검색 + 주입
맨 위 import 추가:
```js
import { NOTES } from "../../notes"; // EP2 — 내 노트
```
`new Anthropic()` 아래에 '검색' 함수 추가:
```js
// EP2 — RAG의 'retrieve': 질문과 가장 관련된 노트를 고른다 (간단 키워드 점수).
function retrieve(query, notes, k = 2) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return notes
    .map((note) => ({ note, hits: words.filter((w) => note.toLowerCase().includes(w)).length }))
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, k)
    .map((x) => x.note);
}
```
`messages.create` 직전에 '주입':
```js
const lastUser = messages[messages.length - 1]?.content ?? "";
const found = retrieve(lastUser, NOTES);
const context = found.length ? `\n\nWhat you know about the user:\n- ${found.join("\n- ")}` : "";
```
그리고 system을 합쳐요:
```js
system: MUSE_PERSONA + context,
```

## 해보기
```bash
npm run dev
```
- "나 다음 달에 어디 여행가?" → 제주도 🌊
- "우리 고양이 이름 뭐였지?" → 모카 🐱
- `notes.js`를 바꾸면 답도 바뀐다.

## ⚠️ 일부러 한계 보기 (다음 단계 떡밥)
키워드만 맞춰서, 말을 **바꿔 물으면 못 찾을 때**가 있어요(예: "여행" 대신 "휴가").
→ 다음 단계에서 **의미로 찾기(임베딩/벡터 검색)** 로 업그레이드해요.

## 이 편 완성 코드
- 보기: https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep2
- git: `git fetch --tags && git checkout ep2`
- 파일: [notes.js](https://github.com/MUSE-CODE-SPACE/topdown-llm/blob/ep2/app/notes.js) · [route.js](https://github.com/MUSE-CODE-SPACE/topdown-llm/blob/ep2/app/api/chat/route.js)
---
*다음 편(EP3): Muse에게 '도구'를 쥐여주기 — 계산·검색·실행*
