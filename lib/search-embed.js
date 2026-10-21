// 단어가 아니라 "뜻"으로 비슷한 메모를 찾아 주는 "임베딩 검색"이에요.
// 메모와 질문을 각각 숫자 벡터로 바꾸고(임베딩), 두 벡터가 얼마나 같은 방향을
// 보는지(코사인 유사도)로 점수를 매겨요. "인터넷 암호"와 "와이파이 비밀번호"처럼
// 단어는 달라도 뜻이 비슷하면 점수가 높아요.
// 서버에서만 실행돼요 (파일을 직접 읽기 때문에 브라우저에서는 못 써요).
import fs from "fs";
import path from "path";
import crypto from "crypto";

// 메모 폴더와 임베딩 캐시 파일 위치
const NOTES_DIR = path.join(process.cwd(), "notes");
const CACHE_FILE = path.join(process.cwd(), ".cache", "embeddings.json");

// 이 맥에서 돌고 있는 Ollama 의 임베딩 API 와 모델 이름
const OLLAMA_URL = "http://localhost:11434/api/embed";
const MODEL = "bge-m3";

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

// 글 여러 개를 한 번에 Ollama 에 보내서 벡터 배열로 받아요.
// 돌려주는 값: [[0.01, -0.02, ...], ...] (글 하나당 벡터 하나)
async function embed(texts) {
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, input: texts }),
  });
  if (!res.ok) throw new Error(`Ollama 임베딩 실패: ${res.status} ${await res.text()}`);
  return (await res.json()).embeddings;
}

// 메모 내용이 바뀌었는지 알아보려고 본문의 "지문"(해시)을 만들어요.
// 본문이 한 글자라도 다르면 해시도 달라져요.
function hashOf(text) {
  return crypto.createHash("sha1").update(text).digest("hex");
}

// 캐시 파일 읽기/쓰기. 모양: { "치과.md": { hash, vector }, ... }
function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) return {};
  return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
}
function saveCache(cache) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
}

// 메모 전체의 벡터를 준비해요. 캐시에 있고 내용이 그대로면 그대로 쓰고,
// 새로 생겼거나 내용이 바뀐 메모만 다시 임베딩해요.
// 돌려주는 값: [{ file, text, vector }]
async function loadNoteVectors() {
  const notes = loadNotes();
  const cache = loadCache();

  // 다시 계산해야 하는 메모 = 캐시에 없거나 해시가 달라진 메모
  const stale = notes.filter((note) => cache[note.file]?.hash !== hashOf(note.text));

  if (stale.length > 0) {
    const vectors = await embed(stale.map((note) => note.text));
    stale.forEach((note, i) => {
      cache[note.file] = { hash: hashOf(note.text), vector: vectors[i] };
    });
    // 지워진 메모는 캐시에서도 빼요.
    const alive = new Set(notes.map((note) => note.file));
    for (const file of Object.keys(cache)) if (!alive.has(file)) delete cache[file];
    saveCache(cache);
  }

  return notes.map((note) => ({ ...note, vector: cache[note.file].vector }));
}

// 코사인 유사도: 두 벡터가 같은 방향이면 1, 상관없으면 0 에 가까워요.
// = (a·b) / (|a| × |b|)
function cosine(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 질문과 뜻이 가장 비슷한 메모를 점수 순으로 골라요.
// 돌려주는 값: [{ file, score, text }] (점수 높은 순, 기본 3개)
// 키워드 검색과 똑같은 모양이라 route.js 에서 바꿔 끼울 수 있어요.
export async function search(question, limit = 3) {
  const [questionVector] = await embed([question]);
  const notes = await loadNoteVectors();

  return notes
    .map(({ file, text, vector }) => ({ file, text, score: cosine(questionVector, vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
