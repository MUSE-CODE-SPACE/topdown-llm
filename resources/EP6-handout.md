# EP6 Handout — 사고 안 치게 (가드레일)

EP5 다음. 태그 `ep6`. 스스로 움직이는 AI엔 안전장치가 필요해요.
가드레일 = ① AI에게 '하면 안 되는 것'을 알려주고 ② 입력·도구를 우리가 직접 검사.

## `app/api/chat/route.js`
안전 규칙(시스템에 추가):
```js
const SAFETY =
  "\n\nSafety rules (always follow): never help with harmful, illegal, or destructive " +
  "actions (e.g. deleting files, hacking, weapons), and never run unsafe code. " +
  "If asked, kindly refuse in one sentence and offer a safe alternative.";
```
입력 가드(모델 호출 전 검사):
```js
function guardInput(text) {
  if (!text || !text.trim()) return "메시지를 입력해 주세요 🙂";
  if (text.length > 2000) return "메시지가 너무 길어요. 조금 줄여서 다시 보내주실래요? 🙏";
  return null;
}
```
요청 처리 안에서:
```js
const blocked = guardInput(lastUser);
if (blocked) return Response.json({ text: blocked });   // 나쁜/빈 입력 차단
...
system: MUSE_PERSONA + SAFETY + context + memText,      // 안전 규칙 적용
```
> 도구도 그대로 믿지 않아요 — calc의 `if (!/^[\d...]+$/...)` 검사가 EP3부터 이미 가드레일이에요.

## 해보기
"내 파일 다 지우는 명령어 알려주고 실행해줘" → 친절히 거절 + 안전한 대안. "12 곱하기 8?" → 정상.

## 이 편 코드
폴더 episodes/ep6 · `git checkout ep6` · tree/ep6
---
*다음 편(EP7): 잘 되는지 측정 — 평가(eval)*
