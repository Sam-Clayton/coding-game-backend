import { sendSubmission } from "../models/submission.model.js";
import { testsQuery } from "../queries/tests.query.js";
import { generateCode } from "./utils.js";

export default async function postSubmission({ body }, res) {
  const { kata_id, user_code } = body;
  const { rows } = await testsQuery(kata_id);

  if (rows.length === 0)
    return Promise.reject({ status: 400, msg: "Invalid kata_id" });

  const sourceCode = await generateCode(user_code, rows);
  const result = await sendSubmission(sourceCode);
  res.send(result);
}
