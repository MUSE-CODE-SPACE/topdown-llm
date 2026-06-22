# 배포 (Deploy) — Muse를 세상에 공개하기

가장 쉬운 길: **GitHub → Vercel** (무료, 클릭 몇 번).

## 1) 빌드 확인 (내 컴퓨터)
```bash
npm run build   # ✓ Compiled / 라우트 목록이 나오면 OK
```

## 2) GitHub에 올리기 (이미 했다면 패스)
```bash
git add -A && git commit -m "deploy" && git push
```

## 3) Vercel에 연결
1. https://vercel.com 로그인(깃허브 계정)
2. **Add New → Project** → 내 `topdown-llm` 레포 선택 → **Import**
3. **Environment Variables** 에 추가:
   - `ANTHROPIC_API_KEY` = 본인 키 (절대 코드에 X, 여기에만)
4. **Deploy** 클릭 → 잠시 후 **공개 링크**(`...vercel.app`) 완성 🎉

## 주의
- API 키는 Vercel **Environment Variables** 에만. (코드/깃에 올리지 않기 — EP0부터 지킨 규칙)
- EP4 메모리(`data/memory.json`)는 서버 파일이라, 서버리스 환경에선 매 요청마다 초기화될 수 있어요(데모용). 실서비스는 DB로.

🔗 전체: https://github.com/MUSE-CODE-SPACE/topdown-llm
