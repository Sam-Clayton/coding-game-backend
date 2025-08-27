import { sendSubmission } from "../models/submission.model.js";

const code = `
function add(a, b) {
  return a + b;
}
`.trim();

const test = `
add(1, 2) === 3 ? "PASS" : "FAIL"
`.trim();

export async function postSubmission(req, res) {
  const sourceCode = `
  ${code}
  console.log(${test});
  `;
  const result = await sendSubmission(sourceCode);
  const resultJson = JSON.stringify({ output: result });
  res.status(201).send(resultJson);
}
