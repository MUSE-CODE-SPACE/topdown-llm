import test from "node:test";
import assert from "node:assert/strict";
import { retrieve, guardInput, runCalc, pickModel, tutorMode } from "../app/api/chat/lib.js";

test("retrieve: ranks notes by keyword hits, keeps top k", () => {
  const notes = ["고양이 이름은 모카", "제주도 여행 3박 4일", "커피는 라떼"];
  assert.deepEqual(retrieve("고양이 모카 이름", notes), ["고양이 이름은 모카"]);
  assert.deepEqual(retrieve("제주도 고양이", notes, 1).length, 1);
  assert.deepEqual(retrieve("없는 단어", notes), []);
  assert.deepEqual(retrieve("", notes), []);
});

test("guardInput: empty and too-long messages are blocked", () => {
  assert.ok(guardInput(""));
  assert.ok(guardInput("   "));
  assert.ok(guardInput(undefined));
  assert.ok(guardInput("a".repeat(2001)));
  assert.equal(guardInput("안녕"), null);
  assert.equal(guardInput("a".repeat(2000)), null);
});

test("runCalc: exact arithmetic, rejects anything but numbers/operators", () => {
  assert.equal(runCalc("1234 * 5678"), "7006652");
  assert.equal(runCalc("(1 + 2) / 4"), "0.75");
  assert.equal(runCalc("process.exit(1)"), "invalid expression");
  assert.equal(runCalc("2 +"), "could not calculate");
});

test("pickModel: short → haiku, long → sonnet", () => {
  assert.equal(pickModel("hi"), "claude-haiku-4-5-20251001");
  assert.equal(pickModel("x".repeat(29)), "claude-haiku-4-5-20251001");
  assert.equal(pickModel("x".repeat(30)), "claude-sonnet-4-6");
  assert.equal(pickModel("   hi   "), "claude-haiku-4-5-20251001");
});

test("tutorMode: only triggers on learning intent", () => {
  assert.equal(tutorMode("오늘 날씨 어때"), "");
  assert.match(tutorMode("파이썬 가르쳐 줘"), /Tutor mode/);
  assert.match(tutorMode("배우고 싶어"), /Tutor mode/);
});
