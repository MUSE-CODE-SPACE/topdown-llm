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

## 📦 Each episode's code / 에피소드별 코드
Every episode is one commit on `main`, **tagged** so you can grab that exact point.
각 에피소드는 `main`의 커밋 하나이고, **태그**로 그 시점 코드를 받을 수 있어요.

| EP | Browse / 보기 | Git | Handout (copy) |
|----|---------------|-----|----------------|
| EP0 | [tree/ep0](https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep0) | `git checkout ep0` | [EP0-handout](resources/EP0-handout.md) |
| EP1 | [tree/ep1](https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep1) | `git checkout ep1` | [EP1-handout](resources/EP1-handout.md) |
| EP2 | [tree/ep2](https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep2) | `git checkout ep2` | [EP2-handout](resources/EP2-handout.md) |
| EP3 | [tree/ep3](https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep3) | `git checkout ep3` | [EP3-handout](resources/EP3-handout.md) |
| EP4 | [tree/ep4](https://github.com/MUSE-CODE-SPACE/topdown-llm/tree/ep4) | `git checkout ep4` | [EP4-handout](resources/EP4-handout.md) |

**Git이 어렵다면** — 각 편 전체 코드가 폴더로도 있어요(다운로드/복사만 하면 끝):
[episodes/ep0](episodes/ep0) · [ep1](episodes/ep1) · [ep2](episodes/ep2) · [ep3](episodes/ep3) · [ep4](episodes/ep4)

`main` is always the latest episode. / `main`은 항상 최신 편.

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
