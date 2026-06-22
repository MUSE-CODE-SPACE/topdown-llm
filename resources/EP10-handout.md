# EP10 Handout — 졸업: 다 합쳐서 + 탑다운 튜터 (capstone)

EP9 다음. 태그 `ep10`. 10편 동안 한 줄씩 쌓은 Muse의 마지막 조각 — 시그니처 '탑다운 튜터'.

## 지금까지 만든 Muse (한 파일 안에)
EP0 챗 · EP1 성격 · EP2 래그 · EP3 도구 · EP4 기억 · EP5 에이전트 · EP6 가드레일 · EP7 평가 · EP8 비용/속도 · EP9 배포

## EP10 추가 — `app/api/chat/route.js`
```js
// EP10 — 배우고 싶다고 하면, Muse가 '탑다운'으로 가르친다(자기참조 시그니처).
function tutorMode(text) {
  if (!/가르쳐|배우고 싶|공부|어떻게 시작|배우려/.test(text)) return "";
  return "\n\nTutor mode (top-down): start with one tiny doable project, not theory. " +
    "Explain only what's needed right now, in plain words a beginner gets. " +
    "End by asking the learner to say it back in their own words. Compare them only to yesterday's self.";
}
```
그리고 system 안정 블록에 더하기: `MUSE_PERSONA + SAFETY + tutorMode(lastUser)`

## 해보기
"리액트 배우고 싶어, 어떻게 시작해?" → 작은 프로젝트부터 → 지금 당장 실행 → 내 말로 다시 설명.

## 탑다운 학습법 (이 강좌가 가르친 것)
1. 프로젝트 먼저, 막히면 그때 개념. 2. AI엔 캐묻되, 코드는 직접 읽기. 3. 내 말로 설명(teach-back). 4. 비교는 어제의 나하고만.

## 이 편 코드 / 전체
폴더 episodes/ep10 · `git checkout ep10` · tree/ep10 · main = 완성본
---
*함께해줘서 고마워요. 끝이 아니라 시작 — 여러분만의 Muse를 계속 키워가세요. 🚀*
