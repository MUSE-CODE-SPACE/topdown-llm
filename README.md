# 🪄 Top-Down LLM — Build "Muse", episode by episode

Learn to build a **real AI assistant** the *top-down* way: ship something that works
**first**, then learn each concept **only when your project hits a wall**.
Beginner-friendly. One episode = one real feature = one commit.

> 한국어: 이론부터 쌓지 않습니다. **작동하는 걸 먼저 만들고**, 막힐 때마다 필요한 개념만 배웁니다.
> 한 에피소드 = 기능 하나 = 커밋 하나.

## Why top-down? / 왜 탑다운인가
- Take on a concrete project; learn **on demand** (not bottom-up).
- **Teach it back** in your own words — if you can't, you don't get it yet.
- Compare only to **yesterday-you**.
- Use AI to *understand*, not to skip — read every line.

## Episodes / 에피소드
| EP | You'll feel… | You'll learn |
|----|--------------|--------------|
| **0** | "Make it talk." ✅ | first Claude call, a working chat |
| 1 | "Why does it babble?" | system prompt / persona |
| 2 | "It doesn't know my notes" | RAG |
| 3 | "It can't do things" | tool use |
| 4 | "It forgets me" | memory |
| 5 | "Multi-step breaks" | agent loop |
| 6 | "Scared it breaks things" | guardrails |
| 7 | "Is it any good?" | eval |
| 8 | "Too slow / costly" | caching, model choice |
| 9 | "Share it" | deploy |
| 10 | Capstone + recap | put it together |

## 📋 Don't retype — copy the code / 코드는 외우지 말고 복사하세요
Beginners: you never have to type long code by hand. Each episode's exact files live here —
open them and hit the **Copy** button (top-right of each file on GitHub).
초보자분들 — 긴 코드를 손으로 칠 필요 없어요. 매 에피소드의 *진짜* 파일이 여기 있으니
열어서 우측 상단 **Copy** 버튼만 누르세요.

**EP0 files / EP0 파일 (copy these 2):**
- 🧠 brain / 두뇌 → [`app/api/chat/route.js`](app/api/chat/route.js)
- 💬 face / 얼굴 → [`app/page.js`](app/page.js)
- 🎨 styles / 꾸미기 → [`app/globals.css`](app/globals.css)
- 🔑 your key / 내 키 → make `.env.local`, copy from [`.env.example`](.env.example)

Or just clone the whole thing / 통째로 받으려면:
```bash
git clone https://github.com/MUSE-CODE-SPACE/topdown-llm.git
```

## Run EP0 / EP0 실행
```bash
npm install
cp .env.example .env.local      # then paste your Anthropic API key
npm run dev                      # open http://localhost:3000
```
Get a key at https://console.anthropic.com — paste into `.env.local` as `ANTHROPIC_API_KEY`.

## Stack
Next.js (App Router) · Anthropic Claude · deploy on Vercel. Built live with Cursor / Claude Code.

## Status
- **EP0 ✅** working chat (`app/page.js`, `app/api/chat/route.js`)
