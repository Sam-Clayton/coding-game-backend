import { getAuth } from "@clerk/express";
import { sendSubmission, updateUserKatas } from "../models/submission.model.js";
import { testsQuery } from "../queries/tests.query.js";
import { usersQuery } from "../queries/users.query.js";
import { generateCode } from "./utils.js";

export default async function postSubmission(req, res) {
  const { kata_id, user_code } = req.body;
  const { rows } = await testsQuery(kata_id);

  if (rows.length === 0)
    return Promise.reject({ status: 400, msg: "Invalid kata_id" });

  const sourceCode = await generateCode(user_code, rows);
  const outcome = await sendSubmission(sourceCode);

  if (outcome.result === "PASS") {
    // const { userId } = getAuth(req);
    // const user_id = await usersQuery(userId);
    const user_id = 1; //hardcoded for now
    await updateUserKatas(user_id, kata_id);
  }

  res.send(outcome);
}
