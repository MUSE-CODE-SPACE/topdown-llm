# EP0 — "Make Muse talk" / "뮤즈가 말하게 하기"  (v2, review-applied)

Result-first, top-down. The working assistant appears in second 1, THEN how.
Beginner-safe, warm casual KO register throughout. Target ~80s.
결과 먼저(탑다운): 작동하는 비서를 1초에 보여주고 → 어떻게 만들었는지. 초보 친화·따뜻한 반말체 일관. 목표 ~80초.

| # | 🇬🇧 English (narration) | 🇰🇷 한국어 (내레이션) | 화면 |
|---|------------------------|----------------------|------|
| 1 | I just told this AI to introduce itself — and it did, in Korean *and* English. No theory, no setup speech. Watch me build it from one empty file. | 방금 이 AI한테 "자기소개 해봐" 했더니, 진짜 했어요 — 한국어로도 영어로도. 이론도, 설명도 없이. 빈 파일 하나로 만드는 거 보여줄게요. | 실제 동작 챗(캡처) 풀화면 |
| 2 | We're building "Muse," your own AI assistant — the *top-down* way: build first, learn each piece only when you need it. | 우리가 만들 건 'Muse', 나만의 AI 비서예요. 방식은 '탑다운' — 일단 만들고, 필요할 때만 하나씩 배워요. | 화면 태그 "Top-down: build first" |
| 3 | One small file sends your message to Claude and brings back the reply. One simple screen to type. That's the whole app. | 작은 파일 하나가 내 메시지를 Claude에게 보내고 답을 받아와요. 입력할 화면 하나. 이게 앱의 전부예요. | route.js + page.js 파일명 |
| 4 | One thing you need: a free key from Anthropic's console — think of it as Muse's password to Claude. Paste it in, never share it. | 딱 하나 필요해요: Anthropic 콘솔에서 받는 키 — Muse가 Claude한테 들어가는 비밀번호라고 보면 돼요. 붙여넣고, 절대 공유는 금지. | .env.local에 키 넣는 장면 |
| 5 | Run it… and there it is — that talking Muse from the start. You just shipped a working AI app on day one. | 실행하면… 바로 그거예요. 처음에 봤던, 말하는 Muse. 첫날부터 작동하는 AI 앱을 만든 거예요. | 콜백: 1번 챗 다시 |
| 6 | Yesterday you'd never shipped an app. Today you have one — that's the only comparison that matters. | 어제의 나는 앱을 만들어본 적 없었죠. 오늘은 하나 만들었어요. 비교는 딱 거기까지만. | 어제의 나 vs 오늘 |
| 7 | Now say it in your own words: "my app sends a message to a model, and shows the reply." If you can explain it, you own it. | 이제 내 말로 설명해봐요. "내 앱은 모델에 메시지를 보내고, 답을 보여준다." 설명할 수 있으면, 내 거예요. | 티치백 |
| 8 | Next: why does it babble? We'll give Muse a real personality. Tell me in the comments — what should *your* Muse help you with? | 다음 편: 얘는 왜 자꾸 횡설수설할까? Muse에게 진짜 성격을 입혀줄게요. 댓글로 알려줘요 — 당신의 Muse는 뭘 도와주면 좋겠어요? | EP1 예고 + CTA |

## Register / 톤 규칙 (review fix)
- KO: 처음~끝까지 **따뜻한 반말 친구체(-요/-봐요)** 로 통일. "당신에게" 같은 번역체 금지, "Claude에게"(O).
- 첫 3초 = **작동 화면 먼저**(promise 아님). line 2 'top-down'은 화면 태그로 짧게(이론 front-load 방지).

## CTA pinned comment / 고정 댓글
- EN: "What should your Muse help you with? 👇 (We give it a personality in EP1.)"
- KO: "당신의 Muse는 뭘 도와주면 좋겠어요? 👇 (EP1에서 성격을 입혀요.)"

## Accuracy / 정확성 (검증됨)
- Model id in repo `claude-sonnet-4-6` — Anthropic 카탈로그 Active 모델로 확인. 영상 표기 코드와 일치.
- Key: console.anthropic.com → `.env.local`(gitignore·미커밋 확인). 키 누락 시 라우트가 친절한 에러 반환(코드 폴리시 적용).
- "한국어·영어 둘 다 응답" — EP0 빌드에서 실측 확인.
- 길이: ~80초 목표. (Option B '80초' 카피 쓰면 실제 컷도 ~80초로 — 부정확 표현 금지 규칙.)
