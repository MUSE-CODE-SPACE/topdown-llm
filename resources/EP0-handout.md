# EP0 Handout — copy everything here / EP0 자료 — 여기서 다 복사하세요

Absolute beginner? You should never have to type long things by hand.
This page has **every command, every file, and "what each thing is"** — just copy.
완전 초보? 긴 걸 손으로 칠 필요 없어요. **모든 명령·파일·"이게 뭔지" 설명**이 여기 다 있어요 — 복사만 하세요.

---

## 0) What you're downloading / 뭘 받는 건가요
| Thing / 받는 것 | What it is / 정체 | Cost / 비용 |
|---|---|---|
| **Node** | The engine that runs our project on your computer. / 프로젝트를 돌리는 엔진. | Free / 무료 |
| **create-next-app** | A starter kit that makes the empty project for us. / 빈 프로젝트를 만들어주는 키트. | Free / 무료 |
| **@anthropic-ai/sdk** | Muse's toolkit to talk to Claude. / Claude와 대화하는 도구 상자. | Free / 무료 |
| **API key** | Muse's password to borrow Claude's brain. *Usage is billed to you* — keep it secret. / Claude를 빌리는 비밀번호. *사용량이 과금됨* — 비밀로. | Pay-as-you-go / 사용한 만큼 |

> 🔑 An API key is like your front-door code — **never** paste it in public (GitHub, comments, chat).
> 🔑 API 키는 현관 비밀번호 같은 거예요 — 깃허브·댓글·채팅에 **절대** 올리지 마세요.

## 1) One-time setup / 한 번만 하는 준비
- Install Node (LTS): https://nodejs.org  → just click the big button. / 노드 설치: 큰 버튼 클릭.
- Check it worked / 됐는지 확인:
```bash
node -v
```

## 2) Make the project / 프로젝트 만들기
```bash
npx create-next-app@latest muse
cd muse
```
(If it asks questions, the defaults are fine — just press Enter. / 질문 나오면 기본값으로 엔터.)

## 3) Install Muse's toolkit / 도구 상자 설치
```bash
npm install @anthropic-ai/sdk
```

## 4) Add your key (secret) / 키 넣기 (비밀)
Make a file named **`.env.local`** in the project, with one line:
프로젝트에 **`.env.local`** 파일을 만들고 한 줄:
```bash
ANTHROPIC_API_KEY=sk-ant-여기에-본인-키-붙여넣기
```
Get the key at / 키 발급: https://console.anthropic.com → API Keys → Create Key

## 5) The two files we write / 우리가 쓰는 파일 두 개
> Don't retype — open these on GitHub and hit **Copy** / 외우지 말고 깃허브에서 **Copy**:
> https://github.com/MUSE-CODE-SPACE/topdown-llm

### `app/api/chat/route.js`  (the brain / 두뇌)
```js
// EP0 — the one thing that makes Muse talk.
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "No API key yet. Add ANTHROPIC_API_KEY to .env.local (see README), then restart." },
        { status: 500 }
      );
    }
    const { messages } = await req.json();

    const reply = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: "You are Muse, a warm, concise personal assistant. Answer simply and kindly.",
      messages,
    });

    const text = reply.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return Response.json({ text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err?.message ?? "Something went wrong" }, { status: 500 });
  }
}
```

### `app/page.js`  (the face / 얼굴)
> Full file on GitHub (copy it) / 전체 파일은 깃허브에서 복사:
> https://github.com/MUSE-CODE-SPACE/topdown-llm/blob/main/app/page.js

### `app/globals.css`  (styling / 꾸미기)
> Copy from GitHub / 깃허브에서 복사:
> https://github.com/MUSE-CODE-SPACE/topdown-llm/blob/main/app/globals.css

## 6) Run it / 실행
```bash
npm run dev
```
Open the address it prints (usually http://localhost:3000), type "안녕 Muse!", and it talks. 🎉
출력된 주소(보통 http://localhost:3000)를 열고 "안녕 Muse!" 입력 → 대답해요. 🎉

## 7) If something breaks / 안 될 때
| You see / 증상 | Fix / 해결 |
|---|---|
| "No API key yet…" | Make `.env.local` with your key, then restart `npm run dev`. / 키 넣고 재시작. |
| "command not found: npm" | Install Node (step 1). / 노드 설치. |
| Port 3000 busy / 포트 사용 중 | Use the port it prints (e.g. 3001). / 출력된 다른 포트 사용. |

---
*Top-Down LLM · EP0 · 누구나 따라 만드는 AI 비서 Muse*
