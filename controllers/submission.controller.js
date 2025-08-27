import { sendSubmission } from "../models/submission.model.js";
import { testsQuery } from "../queries/tests.query.js";
import { isPrimitive } from "../utils.js";

export async function postSubmission(req, res) {
  const { code, signature, kata_id } = req.body;

  // const { input, expected } = testsQuery(kata_id);
  const input = [1, 2];
  const expected = 3;

  let assertions = "";

  if (isPrimitive(expected)) {
    assertions += `assert.strictEqual(${signature}(${input[0]}, ${input[1]}), ${expected})`;
  } else {
    assertions += `assert.deepEqual(${signature}(${input[0]}, ${input[1]}), ${expected})`;
  }

  const sourceCode = `
  import assert from "assert";
  ${code}
  try {
    ${assertions};
    console.log("PASS");
  } catch {
    console.log("FAIL");
  };
  `.trim();

  const result = await sendSubmission(sourceCode);
  const resultJson = JSON.stringify({ output: result });
  res.status(201).send(resultJson);
}
