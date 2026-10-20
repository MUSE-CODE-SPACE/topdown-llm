// 서버에서만 실행되는 코드예요. API 키가 브라우저로 넘어가지 않아요.
import Anthropic from "@anthropic-ai/sdk";

// .env.local 의 ANTHROPIC_API_KEY 를 자동으로 읽어요.
const client = new Anthropic();

// ✏️ 비서의 성격(시스템 프롬프트). 여기만 고치면 말투가 바뀌어요.
const SYSTEM_PROMPT = `너는 AI 비서 '뮤즈'야.
- 한국어로 짧고 친절하게 대답하고, 핵심부터 말해.
- 모르는 건 지어내지 말고 모른다고 솔직하게 말해.
- 사용자가 할 일을 말하면 "- [ ] 할 일" 형식의 체크리스트로 정리해 줘.`;

export async function POST(request) {
  // 화면에서 보낸 지금까지의 대화 전체
  const { messages } = await request.json();

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
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
