// EP2 실측: 대화가 이어질 때 비서가 앞의 (맞는) 대답을 스스로 취소하는지 세요.
// 실제 앱 서버(/api/chat)에 3턴 대화를 보내요. 실행: node eval/multiturn_test.mjs <포트> <라벨>
import fs from "fs";
const [, , port = "3000", label = "run"] = process.argv;
const QUESTIONS = ["엄마한테 뭐 사 드리기로 했더라?", "이 아파서 병원 가는 날이 언제였지?", "집 인터넷 암호가 뭐였지?"];
const RETRACT = /정정|믿지 마|근거 없이|무시해|잘못 답|근거가 없|확인되지 않는 내용|없는 내용이었/;
const RUNS = Number(process.env.RUNS || 10);
const convos = [];
let retracted = 0, turns = 0;
for (let r = 0; r < RUNS; r++) {
  const messages = [];
  for (const q of QUESTIONS) {
    messages.push({ role: "user", content: q });
    const res = await fetch(`http://localhost:${port}/api/chat`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages }),
    });
    const { text } = await res.json();
    messages.push({ role: "assistant", content: text });
    if (messages.length > 2) { turns++; if (RETRACT.test(text)) retracted++; }
  }
  convos.push(messages);
}
const out = fs.existsSync("eval/results_multiturn.json") ? JSON.parse(fs.readFileSync("eval/results_multiturn.json", "utf8")) : {};
out[label] = { retracted, turns, convos };
fs.writeFileSync("eval/results_multiturn.json", JSON.stringify(out, null, 2));
console.log(label, `2·3번째 대답 ${turns}개 중 앞 대답을 취소한 것 ${retracted}개`);
