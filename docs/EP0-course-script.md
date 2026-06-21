# EP0 (COURSE) — "Make Muse talk" / "뮤즈, 말문이 트이다"  (v2, review-applied)

Full build-along lesson (~8–10 min). Fun, exciting, finish-it-together — and **reproducible**:
follow along and it actually runs.
Top-down: working result first → build to completion → break it → teach-back.
풀 빌드어라롱(~8~10분). 재미·흥미진진, 끝까지 같이 완성 — 그리고 **따라하면 진짜 돌아가게**.
EN narration = Jessica · KO narration = (pending pick) · dual subtitles.

Legend: 🎙️ narration · 🖥️ on screen · ⌨️ typed/shown · 💬 host aside

> Honest framing locked: **we write two tiny files; the starter project provides the rest.**

---

## COLD OPEN (0:00–0:20) — proof first
🖥️ Finished Muse chat already answering "안녕! 너 뭐 할 수 있어?" in Korean *and* English.
🎙️ EN: "This little assistant is already talking back to me — in two languages. The wild part? The whole thing is just **two tiny files** we'll write together. By the end of this video you'll have built the exact same thing… even if you've never coded. Let's go."
🎙️ KO: "이 작은 비서, 벌써 저한테 대답하고 있죠 — 그것도 두 나라 말로. 놀라운 건요, 핵심은 우리가 직접 쓸 **작은 파일 딱 두 개**예요. 이 영상 끝나면 여러분도 똑같은 걸 만들어요 — 코드 한 줄 안 써봤어도요. 가보죠."

## SCENE 1 (0:20–1:05) — the big idea (kept tiny)
🎙️ EN: "Most courses make you climb a mountain of theory before you build anything. We do the opposite. It's called **top-down**: build something that works *first*, then learn each piece *only when your project needs it*. Everything you learn, you use five seconds later — so you stay hooked."
🎙️ KO: "보통 강좌는 뭔가 만들기도 전에 이론 산을 넘게 하죠. 우리는 반대로 가요. 이름하여 **탑다운** — 작동하는 걸 *먼저* 만들고, 개념은 *프로젝트가 필요로 할 때만* 배워요. 배운 걸 5초 뒤에 바로 쓰니까, 계속 궁금해지고 손이 멈추질 않아요."
🖥️ tag: "Top-down: build first, learn on demand."

## SCENE 2 (1:05–1:35) — meet Muse
🎙️ EN: "Meet **Muse** — your own AI assistant. Today Muse does one thing: talk. Sounds small, but this chat is the *seed*. Over the season we grow it — it'll read your notes, use tools, remember you, even keep itself safe. All of it starts with *hello*."
🎙️ KO: "소개할게요 — **Muse**, 여러분만의 AI 비서예요. 오늘 Muse가 하는 건 딱 하나, '말하기'. 작아 보이지만 이 대화창이 *씨앗*이에요. 앞으로 쭉 키울 거예요 — 내 노트를 읽고, 도구를 쓰고, 나를 기억하고, 심지어 스스로를 지킬 줄도 알게 돼요. 그 모든 게 '안녕' 한마디에서 시작해요."

## SCENE 3 (1:35–2:45) — set up the playground (beginner-safe)
💬 Name the real step, then reassure. No silent assumptions.
🎙️ EN: "First, a one-time setup: you need **Node** on your computer — it's what runs our project. Never installed it? No stress, there's a 2-minute link in the description. Done? Then one command makes a starter project for us: `npx create-next-app muse` — or literally ask your editor's AI to do it. I'm in Cursor, but anything works. This gives us a ready project with all the boring plumbing already done. We only touch this **`app`** folder — and we'll write just two files inside it."
🎙️ KO: "먼저, 한 번만 하는 준비: 컴퓨터에 **Node**가 있어야 해요 — 우리 프로젝트를 실행해주는 거예요. 설치 안 해봤다고요? 걱정 마세요, 설명란에 2분이면 되는 링크 있어요. 됐으면, 명령어 하나로 시작용 프로젝트를 만들어요: `npx create-next-app muse` — 아니면 에디터 AI한테 그냥 시켜도 돼요. 저는 Cursor를 쓰지만 아무거나 괜찮아요. 이러면 귀찮은 밑작업이 다 된 프로젝트가 생겨요. 우리가 손댈 건 이 **`app`** 폴더 하나 — 그 안에 파일 딱 두 개만 쓸 거예요."
🖥️ project tree; highlight `app/`. Note `globals.css` already exists in the starter.

## SCENE 4 (2:45–3:55) — the one thing you need: a key
💬 Demystify. This is where beginners feel dumb — don't let them.
🎙️ EN: "Before Muse can think, it needs a brain to borrow — we'll borrow **Claude**, Anthropic's AI. For that we need one thing: an **API key**. Think of it as Muse's password to Claude. Go to console.anthropic.com, create a key, copy it. Now — important — we never paste a key into our code where the world can see it. We put it in a secret file, **`.env.local`**. The dot means 'hidden,' and Next.js automatically keeps this file out of your shared code. One line:"
⌨️ `.env.local` → `ANTHROPIC_API_KEY=sk-ant-...`
🎙️ EN (cont.): "That's your key, safely locked away — like a password you'd never post anywhere. You can even check your commit later and see it's not there. That's the safety."
🎙️ KO: "Muse가 생각하려면 빌려올 두뇌가 필요해요 — 우리는 Anthropic의 AI, **Claude**를 빌릴 거예요. 그러려면 딱 하나, **API 키**가 필요해요. Muse가 Claude한테 들어가는 비밀번호라고 보면 돼요. console.anthropic.com 에서 키를 만들고 복사해요. 자, 중요해요 — 키는 절대 코드에 그대로 붙여넣지 않아요. 남들이 다 보거든요. 대신 비밀 파일, **`.env.local`** 에 넣어요. 앞의 점은 '숨김'이라는 뜻이고, Next.js가 이 파일을 공유 코드에서 자동으로 빼줘요. 딱 한 줄:"
🎙️ KO (cont.): "이게 안전하게 잠가둔 내 키예요 — 어디에도 올리면 안 되는 비밀번호처럼요. 나중에 커밋을 열어봐도 키가 없는 걸 확인할 수 있어요. 그게 안전장치예요."

## SCENE 5 (3:55–5:35) — the brain (route.js)
🎙️ EN: "Now the fun part — Muse's brain. One file: `app/api/chat/route.js`. Quick word: this runs on the **server** — just code on a computer *you* control, not in the visitor's browser. That's exactly why our secret key is safe here. This file is a little messenger: it takes what you typed, hands it to Claude, brings the answer back. I'll explain every line like you're brand new — that's the whole point."
⌨️ show committed `route.js`
🎙️ EN (walk): "We bring in Anthropic's toolkit. We create the messenger — and notice, it quietly reads the secret key we hid; we never typed the key here. A safety net: if the key's missing, Muse says so kindly instead of crashing. The heart is `messages.create`: pick the model — `claude-sonnet-4-6` — give Muse a personality in one `system` line, pass the conversation. Claude replies in 'blocks'; we stitch the text together and send it back. That's the entire brain."
🎙️ KO: "이제 재밌는 부분 — Muse의 두뇌예요. 파일 하나: `app/api/chat/route.js`. 잠깐, 이건 **서버**에서 돌아요 — *내가* 관리하는 컴퓨터에서 도는 코드란 뜻이에요. 방문자 브라우저가 아니라요. 그래서 우리 비밀 키가 여기선 안전한 거예요. 이 파일은 작은 심부름꾼이에요: 내가 입력한 걸 받아서 Claude한테 전하고, 답을 받아와요. 한 줄 한 줄, 완전 초보라고 생각하고 다 설명할게요. 그게 핵심이니까요."
🎙️ KO (walk): "Anthropic 도구 상자를 가져와요. 심부름꾼을 만드는데 — 보세요, 아까 숨겨둔 비밀 키를 조용히 읽어와요. 키를 여기 직접 쓰지 않았죠. 안전망도 있어요: 키가 없으면 뻗는 대신 Muse가 친절하게 알려줘요. 핵심은 `messages.create`. 모델을 고르고 — `claude-sonnet-4-6` — `system` 한 줄로 성격을 주고, 대화를 넘겨요. Claude는 답을 '블록'으로 주는데, 우리는 글자만 이어붙여 돌려보내요. 이게 두뇌 전부예요."

## SCENE 5.5 (5:35–5:55) — give Muse its toolkit (install)
💬 The step that makes "run" actually work.
🎙️ EN: "One quick install so Muse has its toolkit — the Anthropic library we just imported: `npm install @anthropic-ai/sdk`. (Did it with the starter? Even easier.) That's the last setup. Promise."
🎙️ KO: "Muse한테 도구 상자를 깔아줄 차례예요 — 방금 가져온 Anthropic 라이브러리요: `npm install @anthropic-ai/sdk`. (시작 프로젝트에 이미 있다면 더 좋고요.) 이게 마지막 준비예요. 약속."

## SCENE 6 (5:55–6:55) — the face (page.js)
🎙️ EN: "A brain needs a face. `app/page.js` is our chat screen: a list of messages, a text box, a Send button. Hit Send and it ships your message to the brain we built and shows what comes back — with a little '…' while Muse thinks, so it feels alive. The styling? It's in `app/globals.css`, already in the starter — or grab mine from the repo. No design degree required."
🎙️ KO: "두뇌엔 얼굴이 필요하죠. `app/page.js`가 우리 채팅 화면이에요: 메시지 목록, 입력칸, 전송 버튼. 전송을 누르면 방금 만든 두뇌로 메시지를 보내고 돌아온 답을 보여줘요 — Muse가 생각하는 동안 '…'도 띄워서 살아있는 느낌이 나죠. 꾸미기요? `app/globals.css`에 있어요. 시작 프로젝트에 이미 있거나, 제 레포에서 가져오면 돼요. 디자인 학위? 필요 없어요."

## SCENE 7 (6:55–7:45) — the moment it talks 🎉
🖥️ `npm run dev` → open the printed URL (usually localhost:3000) → type "안녕 Muse!"
🎙️ EN: "Moment of truth. Run `npm run dev`, open the address it prints — usually localhost:3000 — type hello… and—" (beat) "—Muse answers. Look at that. A real AI assistant, built by *you*, talking back. Ask it anything — Korean, English, a dumb joke. It's *yours* now."
🎙️ KO: "결정적 순간. `npm run dev` 실행하고, 화면에 뜨는 주소를 열어요 — 보통 localhost:3000 — 안녕 입력하고… 그리고—" (잠깐) "—Muse가 답해요. 보세요. 진짜 AI 비서를, *여러분이* 만든 게, 대답을 하잖아요. 뭐든 물어보세요 — 한국어, 영어, 썰렁한 농담까지. 이제 *여러분 거*예요."

## SCENE 8 (7:45–8:25) — break it on purpose (build confidence)
🖥️ remove the key, send a message → friendly error bubble.
🎙️ EN: "Quick — let's break it on purpose, so errors never scare you. I'll remove the key and send a message. See? It doesn't explode — Muse calmly says: 'No API key yet. Add ANTHROPIC_API_KEY to .env.local.' That friendly message is the safety net we built. Put the key back, restart… alive again. Errors aren't the enemy — they're Muse telling you what it needs."
🎙️ KO: "잠깐 — 일부러 한번 고장내볼게요. 에러가 다신 안 무섭게요. 키를 지우고 메시지를 보내요. 보세요? 안 터져요 — Muse가 차분하게 말해요: 'API 키가 아직 없어요. .env.local에 ANTHROPIC_API_KEY를 넣어주세요.' 이 친절한 메시지가 아까 우리가 만든 안전망이에요. 키를 다시 넣고 재시작하면… 다시 살아나요. 에러는 적이 아니라, Muse가 필요한 걸 말해주는 거예요."

## SCENE 9 (8:25–9:05) — teach-back + yesterday-you
🎙️ EN: "Before we close — say it back in your own words: 'My app takes my message, sends it to a model, and shows the reply.' If you can say that, you actually get it — that's the rule of this course. And the only scoreboard that matters: yesterday, you'd never shipped an app. Today, you have one. That's the win."
🎙️ KO: "마치기 전에 — 내 말로 다시 말해봐요. '내 앱은 내 메시지를 받아서, 모델에 보내고, 답을 보여준다.' 이게 말이 되면 진짜 이해한 거예요 — 이 강좌의 규칙이죠. 그리고 유일하게 중요한 점수판: 어제의 나는 앱을 만들어본 적 없었어요. 오늘은 하나 있어요. 그게 승리예요."

## SCENE 10 (9:05–9:30) — cliffhanger + CTA
🎙️ EN: "But chat with Muse a while and you'll notice… it rambles. No personality, no focus. Next episode we fix that — we give Muse a soul, in basically one line. Subscribe so you don't miss it, and tell me in the comments: **what should *your* Muse help you with?** I'll fold the best ideas into the episodes as we build. See you in EP1."
🎙️ KO: "근데 Muse랑 한참 얘기하다 보면 느낄 거예요… 횡설수설해요. 성격도, 집중력도 없죠. 다음 편에서 고쳐요 — 사실상 한 줄로 Muse에게 영혼을 넣어줄 거예요. 놓치지 않게 구독하고, 댓글로 알려줘요: **당신의 Muse는 뭘 도와주면 좋겠어요?** 좋은 아이디어는 다음 편들 만들면서 같이 반영할게요. EP1에서 만나요."

---

## Production notes / 제작 노트
- Format: longform build-along (real screen-record in Cursor; EN cut = Jessica, KO cut = picked voice; dual subtitles).
- On-screen code = the committed repo (route.js / page.js / globals.css) so viewers can `git checkout` EP0 and match exactly.
- Reproduction path shown end-to-end: Node → `npx create-next-app` → write 2 files → `.env.local` key → `npm install @anthropic-ai/sdk` → `npm run dev`. (No missing step.)
- Engagement: pin the CTA comment (EN+KO).
- Accuracy (verified vs code): model `claude-sonnet-4-6` (route.js), real missing-key string quoted in Scene 8, `.env.local` gitignored + uncommitted, bilingual reply confirmed live.
- The ~80s vertical teaser (docs/EP0-script.md) is the SHORT that funnels here.
