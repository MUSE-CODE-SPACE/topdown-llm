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
