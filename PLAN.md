# Top-Down LLM — Master Plan (Single Source of Truth)

> **READ THIS FIRST (any new session).** This file is the canonical, session-resilient
> spec. If MuseWork and this file disagree, **this file wins** until reconciled.
> Mirror of record: MuseWork project "Top-Down LLM" (create in UI; see §8).
> 한국어 요약은 각 섹션 끝 `🇰🇷` 줄.

---

## 1. Vision
Anyone in the world — **absolute beginners included** — builds a real AI assistant app
(**"Muse"**) from scratch, learning each concept **only when their project needs it**.

Delivered as: **bilingual (EN-first + KO) YouTube series** + **public GitHub repo**
(each episode = one real feature = one commit) + optional in-app lessons.

🇰🇷 누구나(초보 포함) 따라 만들며, 막힐 때만 개념을 배우는 탑다운 강좌. 영어 우선 + 한국어 병행.

## 2. Why top-down (durable rationale — do not drift)
Bottom-up courses (theory → theory → theory) lose beginners. Top-down keeps momentum.
Based on **Andrej Karpathy (2020-11-07)** + **Gabriel Petersson (OpenAI)** — both verified:
1. Take on a **concrete project**; learn **on-demand** (not bottom-up breadth-first).
2. **Teach back** in your own words (can't explain = don't understand yet).
3. Compare only to **yesterday-you**, never to others.
Twist (Gabriel): use AI to **understand, not to skip** — read every line.

🇰🇷 프로젝트 먼저 → 막히면 개념 → 내 말로 설명 → 어제의 나와 비교. AI는 이해용(코드 다 읽기).

## 3. Audience & language
- Global, beginner-friendly. **English-first** content (universal).
- **Korean parallel** (dual subtitles EN+KO). **Voices LOCKED: EN = Jessica (ElevenLabs cgSgspJ2msm6clMCkdW9), KO = JY trendy (bQlkYuipD5BHEhntA5iz).**
- **Code & UI in English** (universal). Comments minimal, plain.

🇰🇷 해외 누구나. 영어 우선·한국어 병기. 코드/UI는 영어.

## 4. The product users build — "Muse"
A **personal AI assistant that learns YOUR stuff**.
- **Signature hook (self-referential):** a **"Top-Down Tutor" mode** where Muse teaches the
  user with the *same* method (project-first, on-demand, 12-year-old explanations, teach-back).
- Genuinely useful + the #1 thing beginners want → good for retention/views.

🇰🇷 만들 앱 = "내 걸 아는 AI 비서 Muse". 시그니처: 탑다운 튜터 모드(자기참조).

## 5. Stack (FIXED — change only with a logged decision)
- **Next.js** (App Router) + **Anthropic Claude API** (latest model; default to newest Claude).
- Deploy: **Vercel** (one-click link).
- Built via **Cursor / Claude Code** (vibe-coding shown on screen for beginners).
- RAG: **simple first** (files + cosine) → **real vector DB** when it breaks (EP2).
- Repo: **public GitHub `topdown-llm`** (owner's own name; no AI-trace in commits).

🇰🇷 Next.js + Claude + Vercel, Cursor 바이브코딩. RAG는 간단→진짜. 공개 레포(본인 명의).

## 6. Episode roadmap (problem triggers the concept)
| EP | Quest (symptom) | Concept summoned | App feature shipped |
|----|------------------|------------------|---------------------|
| 0  | "Make it talk in 30 min" | first API call / vibe coding | working chat |
| 1  | "Why does it babble?" | system prompt / persona | Muse has a personality |
| 2  | "It doesn't know my notes" | **RAG** | answers from YOUR docs |
| 3  | "It can't do/calc/search" | **tool use** | calls tools |
| 4  | "It forgets me" | **memory** | remembers across sessions |
| 5  | "Multi-step tasks break" | agent loop / planning | does chains of steps |
| 6  | "Scared it does damage" | guardrails / safety | safe actions |
| 7  | "Is it any good?" | **eval** | measured quality |
| 8  | "Too slow / costly" | caching / model choice | fast & cheap |
| 9  | "Want to share it" | deploy | public link |
| 10 | Capstone + "yesterday-me" recap | synthesis | shippable app |

Each EP links **down** to the existing bottom-up LLM Master chapters for "go deeper".

🇰🇷 증상이 개념을 소환하는 11편. 각 편은 기존 LLM Master 챕터로 '더 깊이' 연결.

## 7. Per-episode Definition of Done (checklist — every EP)
- [ ] App feature implemented + committed (repo) — 1 commit, clear message
- [ ] `PLAN.md` / `README.md` updated (status, what shipped)
- [ ] EN video produced (1080×1920 short and/or longform) + captions
- [ ] KO video/captions
- [ ] Engagement CTA in-video + pinned-comment text (both langs)
- [ ] Facts verified vs official docs (Anthropic/Next/etc.) — cite in description
- [ ] Telegram delivery + Downloads copy
- [ ] (optional) in-app lesson markdown

🇰🇷 매 편 완료 기준 체크리스트(커밋·문서·EN/KO 영상·자막·CTA·검증·전송).

## 8. Session-resilience protocol
1. New session: read **this PLAN.md** + MuseWork project "Top-Down LLM".
2. Find current EP from §9 Status Log (bottom). Resume from first unchecked item.
3. Conventions: assets in `renders/tdl-ep<N>/`; episodes `EP0..EP10`; voices fixed (§3).
4. Accuracy + no-hallucination rules from global memory always apply.

🇰🇷 새 세션은 이 파일 + §9 상태로그부터. 규칙 고정.

## 9. Status log (append-only; newest at bottom)
- 2026-06-21 — Plan created. Stack & roadmap fixed.
- 2026-06-21 — MuseWork project "Top-Down LLM" created (id `cmqnqubrz07wtp301j2umeja9`);
  populated 6 requirements + 5 plan milestones (M0–M4) + EP0 task. M0 IN_PROGRESS.
- 2026-06-21 — **EP0 DONE (app).** Repo scaffolded (Next.js 16 + Claude `claude-sonnet-4-6`),
  working chat verified live (KO+EN reply, /api/chat 200). 2 commits (f7a52b3, a2cc558).
  Multi-angle review run (tech=SHIP, translation=edits-applied, pedagogy=improvements-applied).
  EP0 bilingual script v2 at `docs/EP0-script.md`. Key server-side only, `.env.local` uncommitted.
- 2026-06-21 — EP0 COURSE script v3 done (full build-along, ~9min). User feedback applied:
  "you build it" cold open, AI-product ladder, relatable API-key + "private room"=server,
  emotional Scene 7, "developers befriend errors", stronger CTA, expanded yesterday-you ending.
  Voices LOCKED (EN Jessica / KO JY). Identity = confidence episode. Multi-angle reviewed
  (tech SHIP, translation/pedagogy edits applied incl. reproducibility blockers fixed).
- 2026-06-21 — **EP0 KO VIDEO DONE & delivered** (3:23, 1080p). 100% real footage:
  real Muse-talks browser clip, real route.js/page.js code screens, real terminal,
  real friendly-error screen (captured via key-rename trick, .env.local restored).
  Narration JY. Assets in video-agentic-roadmap/renders/tdl-ep0/ (scripts: build-ep0-vo/
  screens/compose, gen-ep0-srt). KNOWN POLISH: bottom-right callouts (sc5/sc6/sc8) slightly
  overlap captions → move callouts to top in a re-render.
  NEXT: (a) callout-position fix, (b) EN cut (Jessica) same pipeline, (c) push repo public when approved.

## 10. Open decisions / TODO
- [x] Voices locked: EN=Jessica, KO=JY trendy (2026-06-21).
- [ ] Longform vs shorts per EP (likely: 1 longform build-along + 1 short teaser each).
- [ ] Series landing page (resonance-space?) for global discovery.
- [x] MuseWork project id: `cmqnqubrz07wtp301j2umeja9` (name "Top-Down LLM"). Requirements×6, Plan M0–M4, EP0 task queued (2026-06-21).
