import { sendSubmission } from "../models/submission.model.js";
import { testsQuery } from "../queries/tests.query.js";
import { isPrimitive } from "../utils.js";

export async function postSubmission(req, res) {
  const { kata_id, user_code } = req.body;

  const { signature, input, expected } = testsQuery(kata_id);

  let assertions = "";

  const sourceCode = `
  import assert from "assert";
  ${user_code}
  try {
    assert.${
      isPrimitive(expected) ? "strictEqual" : "deepEqual"
    }(${signature}(${input}), ${expected})
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
