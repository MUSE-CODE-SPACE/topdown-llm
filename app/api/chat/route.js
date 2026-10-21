// 서버에서만 실행되는 코드예요. API 키가 브라우저로 넘어가지 않아요.
import Anthropic from "@anthropic-ai/sdk";
import { search } from "../../../lib/search-keyword";

// .env.local 의 ANTHROPIC_API_KEY 를 자동으로 읽어요.
const client = new Anthropic();

// ✏️ 비서의 성격(시스템 프롬프트). 여기만 고치면 말투가 바뀌어요.
const SYSTEM_PROMPT = `너는 AI 비서 '뮤즈'야.
- 한국어로 짧고 친절하게 대답하고, 핵심부터 말해.
- 사용자가 할 일을 말하면 "- [ ] 할 일" 형식의 체크리스트로 정리해 줘.
- 아래 [참고 메모]에 있는 내용만 근거로 대답해. 메모에 없는 내용은 지어내지 말고 "메모에 없어서 모르겠어요"라고 말해.
- 대답 끝에 실제로 참고한 메모 파일 이름을 "(참고: 치과.md)" 형식으로 적어. 참고한 메모가 없으면 적지 마.`;

// 검색된 메모들을 시스템 프롬프트 뒤에 붙일 글로 만들어요.
function formatNotes(notes) {
  if (notes.length === 0) return "\n\n[참고 메모]\n(질문과 관련된 메모를 찾지 못했어요)";
  return (
    "\n\n[참고 메모]\n" +
    notes.map((note) => `--- 파일: ${note.file} ---\n${note.text}`).join("\n\n")
  );
}

export async function POST(request) {
  // 화면에서 보낸 지금까지의 대화 전체
  const { messages } = await request.json();

  // 가장 마지막 질문(사용자 메시지)으로 메모를 검색해요.
  const question = messages[messages.length - 1].content;
  const notes = search(question);

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT + formatNotes(notes), // 성격 + 참고 메모
      messages,
    });
    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");
    return Response.json({ text });
  } catch (error) {
    return Response.json({ text: "오류가 났어요: " + error.message }, { status: 500 });
  }
}
