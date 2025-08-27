import { sendSubmission } from "../models/submission.models";

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
  const { stdout } = await sendSubmission(sourceCode);
  res.status(201).send(stdout);
}
