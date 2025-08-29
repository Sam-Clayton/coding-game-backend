import { sendSubmission } from "../models/submission.model.js";
import { testsQuery } from "../queries/tests.query.js";
import { isPrimitive } from "../utils.js";

export default async function postSubmission(req, res) {
  try {
    console.log(req.body);
    const { kata_id, user_code } = req.body;
    const { rows } = await testsQuery(kata_id);
    const { signature, input, expected } = rows[0];

    const sourceCode = `
    const assert = require("assert");
    
    ${user_code}
    try {
      assert.${
        isPrimitive(expected) ? "strictEqual" : "deepEqual"
      }(${signature}(${input}), ${expected});
      console.log("PASS");
    } catch (err) {
      console.log("FAIL");
    };
    `.trim();
    console.log(sourceCode);

    const result = await sendSubmission(sourceCode);
    res.status(201).send({ output: result });
  } catch (err) {
    console.log(err);
  }
}
