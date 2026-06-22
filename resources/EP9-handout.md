# EP9 Handout — 세상에 공개 (배포/deploy)

EP8 다음. 태그 `ep9`. 내 컴퓨터에서만 돌던 Muse를, 링크 하나로 누구나.

## 흐름 (코드 변경 거의 없음 — 과정이 핵심)
1. **빌드 확인**: `npm run build` → ✓ 라우트 목록 나오면 OK
2. **GitHub 푸시**: `git push`
3. **Vercel 연결**: vercel.com → Add New → Project → 레포 Import
4. **환경변수**: `ANTHROPIC_API_KEY` = 본인 키 (Vercel에만!)
5. **Deploy** → 공개 링크 `...vercel.app` 🎉

자세한 단계: 레포의 `DEPLOY.md`

## 주의
- 키는 **Vercel 환경변수에만** (코드/깃 X — EP0부터의 규칙).
- 파일 메모리(EP4)는 데모용. 실서비스는 DB로.

## 이 편 코드
폴더 episodes/ep9 · `git checkout ep9` · tree/ep9
---
*다음 편(EP10): 졸업 — 다 합쳐서 + 어제의 나*
