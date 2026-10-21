// 질문에 들어 있는 단어가 많이 나오는 메모를 찾아 주는 "키워드 검색"이에요.
// 서버에서만 실행돼요 (파일을 직접 읽기 때문에 브라우저에서는 못 써요).
import fs from "fs";
import path from "path";

// 메모 폴더 위치: 프로젝트 루트의 notes/
const NOTES_DIR = path.join(process.cwd(), "notes");

// notes/ 안의 .md 파일을 전부 읽어서 [{ file, text }] 로 돌려줘요.
function loadNotes() {
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      text: fs.readFileSync(path.join(NOTES_DIR, file), "utf8"),
    }));
}

// 질문을 단어로 쪼개요. 한글/영어/숫자만 남기고, 한 글자짜리는 버려요.
// 예: "치과 예약 언제야?" → ["치과", "예약", "언제야"]
function toWords(question) {
  return question
    .toLowerCase()
    .split(/[^가-힣a-z0-9]+/)
    .filter((word) => word.length >= 2);
}

// 메모 본문에 단어가 몇 번 나오는지 세요.
function countWord(text, word) {
  return text.toLowerCase().split(word).length - 1;
}

// 질문과 가장 잘 맞는 메모를 점수 순으로 골라요.
// 점수 = 질문 단어들이 메모에 등장한 횟수의 합
// 돌려주는 값: [{ file, score, text }] (점수 높은 순, 기본 3개)
export function search(question, limit = 3) {
  const words = toWords(question);

  return loadNotes()
    .map((note) => ({
      ...note,
      score: words.reduce((sum, word) => sum + countWord(note.text, word), 0),
    }))
    .filter((note) => note.score > 0) // 한 단어도 안 겹치면 제외
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
