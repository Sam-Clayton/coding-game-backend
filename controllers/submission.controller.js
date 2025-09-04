// import { getAuth } from "@clerk/express";
import {
  sendSubmission,
  updateUserKatas,
  updateUserLevel,
} from "../models/submission.model.js";
import { testsQuery } from "../queries/tests.query.js";
import { generateCode } from "./utils.js";

export default async function postSubmission(req, res) {
  try {
    const { kata_id, user_code } = req.body;
    const { rows } = await testsQuery(kata_id);

    if (rows.length === 0)
      return Promise.reject({ status: 400, msg: "Invalid kata_id" });

    const sourceCode = await generateCode(user_code, rows);
    const outcome = await sendSubmission(sourceCode);

    // if (outcome.result === "PASS") {
    //   const { userId } = getAuth(req);
    //   await updateUserKatas(userId, kata_id);
    //   await updateUserLevel(userId);
    // }
    res.send(outcome);
  } catch (err) {
    console.log(err);
  }
}
