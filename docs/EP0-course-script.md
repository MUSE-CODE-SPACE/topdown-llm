# EP0 (COURSE) — "Make Muse talk" / "뮤즈, 말문이 트이다"  (v3, feedback-applied)

Full build-along (~8–10 min). Not a tech lecture — a **confidence** episode:
"In the AI era, *I* can build this too." Top-down: working result first → build → break it → teach-back.
풀 빌드어라롱(~8~10분). 기술 강의가 아니라 **자신감** 영상 — "AI 시대, 나도 만들 수 있다."
EN narration = **Jessica** · KO narration = **JY (trendy)** · dual subtitles.

Legend: 🎙️ narration · 🖥️ on screen · ⌨️ typed/shown · 💬 host aside · 🎵 music cue

> Honest framing: **we write two tiny files; the starter project provides the rest.**
> ⚠️ AUDIENCE = absolute beginners. **Never make them retype long code.** Whenever a file
> appears (route.js, page.js, globals.css), the narration MUST say: "외우지 마세요 —
> 설명란/깃허브 링크에서 그대로 복사하세요" while we read & explain it. Repo (copy source):
> https://github.com/MUSE-CODE-SPACE/topdown-llm

---

## COLD OPEN (0:00–0:22) — proof first + "YOU build it"
🖥️ Finished Muse chat answering "안녕! 너 뭐 할 수 있어?" in Korean *and* English.
🎙️ EN: "This little assistant is already talking back to me — in two languages. And the wild part isn't that some AI company made this. It's that *you* are going to build it today. Two tiny files. Never coded before? Perfect. Let's go."
🎙️ KO: "이 작은 비서, 벌써 두 나라 말로 대답하고 있죠. 근데 놀라운 건요, AI 만드는 큰 회사가 만든 게 아니라 — 오늘 이걸 **여러분이 직접 만든다**는 거예요. 작은 파일 딱 두 개로요. 코딩 처음이라고요? 완벽해요. 가보죠."

## SCENE 1 (0:22–1:05) — the big idea (kept tiny)
🎙️ EN: "Most courses make you climb a mountain of theory before you build a thing. We go the other way — **top-down**: build something that works *first*, learn each piece *only when the project needs it*. Everything you learn, you use five seconds later. So you actually stay hooked."
🎙️ KO: "보통 강좌는 뭔가 만들기도 전에 이론 산을 넘게 하죠. 우린 반대로 가요 — **탑다운**: 작동하는 걸 *먼저* 만들고, 개념은 *프로젝트가 필요로 할 때만* 배워요. 배운 걸 5초 뒤에 바로 쓰니까, 계속 궁금해지고 손이 안 멈춰요."
🖥️ tag: "Top-down: build first, learn on demand."

## SCENE 2 (1:05–1:40) — meet Muse (the ladder)
🎙️ EN: "Meet **Muse**, your own AI assistant. Today we build just one thing: talking. But here's the fun part — almost every AI product in the world starts *right here*. Talking… then remembering… then using tools… and that's an AI agent. Today is step one of that ladder."
🎙️ KO: "소개할게요 — **Muse**, 여러분만의 AI 비서. 오늘 만들 건 딱 하나, '말하기'. 근데 재밌는 건요, 세상 대부분의 AI 서비스가 *바로 여기서* 시작해요. 말하기… 그다음 기억하기… 도구 쓰기… 그러면 그게 AI 에이전트예요. 오늘은 그 사다리의 첫 칸이에요."
🖥️ ladder: 말하기 → 기억 → 도구 → 에이전트 (light up 말하기)

## SCENE 3 (1:40–2:45) — set up the playground (beginner-safe)
🎙️ EN: "One-time setup: you need **Node** on your computer — it's what runs our project. Never installed it? No stress — 2-minute link in the description. Then one command makes a starter project: `npx create-next-app muse` — or just ask your editor's AI to do it. I'm in Cursor, anything works. This hands us a project with all the boring plumbing done. We only touch this **`app`** folder — two files inside it."
🎙️ KO: "한 번만 하는 준비: 컴퓨터에 **Node**가 있어야 해요 — 우리 프로젝트를 돌려주는 거예요. 설치 안 해봤다고요? 걱정 마세요, 설명란에 2분이면 되는 링크 있어요. 그다음 명령어 하나로 시작 프로젝트를 만들어요: `npx create-next-app muse` — 아니면 에디터 AI한테 그냥 시켜도 돼요. 저는 Cursor 쓰는데 아무거나 괜찮아요. 이러면 귀찮은 밑작업 다 된 프로젝트가 생겨요. 우리가 손댈 건 이 **`app`** 폴더 하나 — 안에 파일 두 개."
🖥️ project tree; highlight `app/`; note `globals.css` already there.

## SCENE 4 (2:45–3:55) — the one thing you need: a key (relatable!)
💬 The #1 beginner mistake. Make it stick.
🎙️ EN: "Before Muse can think, it borrows a brain — **Claude**, Anthropic's AI. To borrow it, you need one thing: an **API key**. Quick real-talk: you wouldn't post your front-door code in a YouTube comment, right? An API key is exactly the same — this is how the cost of borrowing the AI gets charged to *you*. So we never paste it into our code. It goes in a secret file, **`.env.local`** — the dot means 'hidden,' and Next.js keeps it out of your shared code automatically. One line:"
⌨️ `.env.local` → `ANTHROPIC_API_KEY=sk-ant-...`
🎙️ KO: "Muse가 생각하려면 두뇌를 빌려와요 — Anthropic의 AI, **Claude**요. 빌리려면 딱 하나, **API 키**가 필요해요. 솔직히 말할게요 — 여러분 집 현관 비밀번호를 유튜브 댓글에 안 적잖아요? API 키도 똑같아요. **AI를 빌려오는 비용이 여기서 빠져나가거든요.** 그래서 절대 코드에 직접 붙여넣지 않아요. 비밀 파일, **`.env.local`** 에 넣어요 — 앞의 점은 '숨김'이란 뜻이고, Next.js가 이 파일을 공유 코드에서 자동으로 빼줘요. 딱 한 줄:"
🎙️ EN (cont.): "Guard it like that front-door code. You can even check your commit later — it's not there."
🎙️ KO (cont.): "현관 비번처럼 지켜요. 나중에 커밋 열어봐도 키는 없어요 — 그게 안전장치예요."

## SCENE 5 (3:55–5:30) — the brain (route.js) — "the private room"
🎙️ EN: "Now the fun part — Muse's brain: `app/api/chat/route.js`. Think of this file as a **private room**. The API key is only ever visible *in here*. Visitors send a message, get an answer, and leave — the real password never walks out the door. *That private room is what people mean by a 'server.'* And this room is a little messenger: takes what you typed, hands it to Claude, brings the answer back. I'll read every line like you're brand new."
⌨️ show committed `route.js`
🎙️ EN (walk): "Bring in Anthropic's toolkit. Make the messenger — and look, it quietly reads the key we hid; we never typed it here. A safety net: if the key's missing, Muse says so kindly instead of crashing. The heart is `messages.create`: pick the model `claude-sonnet-4-6`, give Muse a personality in one `system` line, pass the conversation. Claude replies in 'blocks'; we stitch the text and send it back. That's the whole brain."
🎙️ KO: "이제 재밌는 부분 — Muse의 두뇌: `app/api/chat/route.js`. 이 파일을 **비밀방**이라고 생각해봐요. API 키는 오직 *이 안에서만* 보여요. 사용자는 메시지를 보내고 대답만 받아서 나가요 — 진짜 비밀번호는 절대 밖으로 안 나가요. *바로 이 비밀방이 사람들이 말하는 '서버'예요.* 그리고 이 방은 작은 심부름꾼이에요: 내가 입력한 걸 받아서 Claude한테 전하고, 답을 받아와요. 한 줄 한 줄, 완전 초보라고 생각하고 읽어줄게요."
🎙️ KO (walk): "Anthropic 도구 상자를 가져와요. 심부름꾼을 만드는데 — 보세요, 숨겨둔 키를 조용히 읽어와요. 여기 직접 안 썼죠. 안전망: 키가 없으면 뻗는 대신 Muse가 친절히 알려줘요. 핵심은 `messages.create`: 모델 `claude-sonnet-4-6` 고르고, `system` 한 줄로 성격 주고, 대화를 넘겨요. Claude는 답을 '블록'으로 주고, 우린 글자만 이어붙여 돌려보내요. 이게 두뇌 전부예요."

## SCENE 5.5 (5:30–5:50) — give Muse its toolkit (install)
🎙️ EN: "One quick install so Muse has its toolkit — the Anthropic library we just imported: `npm install @anthropic-ai/sdk`. That's the last bit of setup. Promise."
🎙️ KO: "Muse한테 도구 상자 하나 깔아줄게요 — 방금 가져온 Anthropic 라이브러리요: `npm install @anthropic-ai/sdk`. 이게 마지막 준비예요. 약속."

## SCENE 6 (5:50–6:45) — the face (page.js)
🎙️ EN: "A brain needs a face. `app/page.js` is the chat screen: a message list, a text box, a Send button. Hit Send → it ships your message to the brain → shows what comes back, with a little '…' while Muse thinks. Styling lives in `app/globals.css` — already in the starter, or grab mine from the repo. No design degree required."
🎙️ KO: "두뇌엔 얼굴이 필요하죠. `app/page.js`가 채팅 화면이에요: 메시지 목록, 입력칸, 전송 버튼. 전송 누르면 → 두뇌로 보내고 → 돌아온 답을 보여줘요. 생각하는 동안 '…'도 뜨고요. 꾸미기는 `app/globals.css`에 있어요 — 스타터에 이미 있거나 제 레포에서. 디자인 학위? 필요 없어요."

## SCENE 7 (6:45–7:40) — the moment it talks 🎉 (let it land)
🖥️ `npm run dev` → open printed URL (usually localhost:3000) → type "안녕 Muse!"
🎙️ EN: "Run `npm run dev`, open the address it prints, type — 'Hi Muse!' … (beat) … 'Hello! How can I help you?' … Wait. Did you just see that? A program *you* built a minute ago just spoke to you. This isn't my app anymore — it's **yours**. Ask it anything. Korean, English, a dumb joke. It's alive, and it's yours."
🎙️ KO: "`npm run dev` 실행하고, 뜨는 주소 열고, 입력해요 — '안녕 Muse!' … (잠깐) … '안녕하세요! 무엇을 도와드릴까요?' … 잠깐만요. 여러분, 지금 이거 보셨어요? 1분 전에 *여러분이* 만든 프로그램이, 방금 여러분한테 말을 걸었어요. 이제 이건 제 앱이 아니라 — **여러분 앱**이에요. 뭐든 물어보세요. 한국어, 영어, 썰렁한 농담까지. 살아있고, 여러분 거예요."

## SCENE 8 (7:40–8:20) — break it on purpose (my favorite)
💬 Real dev is "왜 안 되지?" on repeat. Normalize it.
🖥️ remove the key, send a message → friendly error bubble.
🎙️ EN: "My favorite part — let's break it on purpose, so errors never scare you. Remove the key, send a message. See? It doesn't explode — Muse calmly says: 'No API key yet. Add ANTHROPIC_API_KEY to .env.local.' Put it back, restart… alive again. Here's the truth: a developer isn't someone with no errors — it's someone who got comfortable with them. An error isn't failure; it's the computer handing you a hint."
🎙️ KO: "제가 제일 좋아하는 부분 — 일부러 한번 고장내볼게요. 에러가 다신 안 무섭게요. 키를 지우고 메시지를 보내요. 보세요? 안 터져요 — Muse가 차분하게 말해요: 'API 키가 아직 없어요. .env.local에 ANTHROPIC_API_KEY를 넣어주세요.' 다시 넣고 재시작하면… 부활. 진실을 말할게요: 개발자는 에러가 *없는* 사람이 아니라, 에러랑 *친해진* 사람이에요. 에러는 실패가 아니라, 컴퓨터가 힌트를 주는 거예요."

## SCENE 9 (8:20–9:05) — teach-back + the win 🎵
🎵 music softens here.
🎙️ EN: "Before we close — say it in your own words: 'My app takes my message, sends it to a model, and shows the reply.' If you can say that, you really get it — that's the rule of this course. And the only scoreboard that matters: yesterday, you had no AI app. Today, you do. It doesn't have to be perfect — you built one more thing than yesterday. *That* is a developer's win."
🎙️ KO: "마치기 전에 — 내 말로 말해봐요: '내 앱은 내 메시지를 받아서, 모델에 보내고, 답을 보여준다.' 이게 말되면 진짜 이해한 거예요 — 이 강좌의 규칙이죠. 그리고 유일하게 중요한 점수판: 어제의 나는 AI 앱이 없었어요. 오늘의 나는 있습니다. 완벽하지 않아도 괜찮아요 — 어제보다 하나 더 만들었으니까. *그게* 개발자의 승리예요."

## SCENE 10 (9:05–9:30) — cliffhanger + strong CTA
🎙️ EN: "But chat a while and you'll notice… Muse rambles. No personality, no focus. Next episode we fix that — we give Muse a soul, in basically one line. Subscribe so you don't miss it. And tell me in the comments: **if your Muse could take one job off your hands, what would you give it first?** I'll build the best answers right into the series. See you in EP1."
🎙️ KO: "근데 한참 얘기하다 보면 느낄 거예요… Muse가 횡설수설해요. 성격도, 집중력도 없죠. 다음 편에서 고쳐요 — 사실상 한 줄로 영혼을 넣어줄 거예요. 놓치지 않게 구독하고, 댓글로 알려줘요: **당신의 Muse가 한 가지 일을 대신해준다면, 가장 먼저 뭘 시키고 싶나요?** 좋은 답들은 다음 편들에 직접 반영할게요. EP1에서 만나요."

---

## Production notes / 제작 노트
- Identity: a **confidence** episode ("나도 만들 수 있다"), not a dry tutorial. Scene 7 = emotional peak (let the reply land, react genuinely). Scene 9 = quiet music, warm close.
- Voices: EN = Jessica · KO = JY (trendy). Dual subtitles. Real screen-record in Cursor.
- On-screen code = committed repo (route.js / page.js / globals.css) → viewers `git checkout` EP0 to match.
- Reproduction shown end-to-end: Node → `npx create-next-app` → write 2 files → `.env.local` key → `npm install @anthropic-ai/sdk` → `npm run dev`.
- Accuracy (verified vs code): model `claude-sonnet-4-6`; real missing-key string quoted in Scene 8; `.env.local` gitignored + uncommitted; bilingual reply confirmed live.
- Pin CTA comment (EN: "If your Muse could take one job off your hands, what would you give it first? 👇" / KO: "당신의 Muse가 한 가지 일을 대신해준다면, 가장 먼저 뭘 시키고 싶나요? 👇").
- ~80s vertical teaser (docs/EP0-script.md) funnels here.
