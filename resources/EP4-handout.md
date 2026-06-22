# EP4 Handout — Muse가 나를 '기억'하게 (memory)

EP3 다음. 태그 `ep4`. AI는 새 대화를 열면 다 잊어요. → 파일에 저장해서 **세션을 넘어 기억**.

## `app/api/chat/route.js`
상단 import:
```js
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"; // EP4 — memory on disk
```
기억 함수(파일 읽기/쓰기):
```js
const MEM_FILE = process.cwd() + "/data/memory.json";
function loadMemory() { try { return JSON.parse(readFileSync(MEM_FILE, "utf8")); } catch { return []; } }
function saveMemory(list) { mkdirSync(process.cwd() + "/data", { recursive: true }); writeFileSync(MEM_FILE, JSON.stringify(list.slice(-30), null, 2)); }
```
요청 처리 안에서(노트 context 아래):
```js
const memory = loadMemory();
const memText = memory.length ? `\n\nThings the user told you earlier:\n- ${memory.slice(-8).join("\n- ")}` : "";
if (lastUser) { memory.push(lastUser); saveMemory(memory); }
```
그리고 system에 합치기: `system: MUSE_PERSONA + context + memText,`
> `.gitignore`에 `data/` 추가 (개인 기억은 커밋 안 함).

## 해보기
"내 생일은 3월 3일이야" → 새로고침(새 세션) → "내 생일 언제?" → **3월 3일!** 🎂

## 이 편 코드
- 폴더: episodes/ep4 · 태그: `git checkout ep4` · tree/ep4
---
*다음 편(EP5): 여러 단계를 스스로 — 에이전트 루프*
