import axios from "axios";
import dotenv from "dotenv";
import db from "../db/connection.js";
import { encode, decode } from "../utils.js";

const __dirname = import.meta.dirname;
dotenv.config({ path: `${__dirname}/../.env.api-key` });
const key = process.env.API_KEY;

if (!key) throw new Error("Missing API_KEY in environment variables");

export async function sendSubmission(sourceCode) {
  try {
    const url = "https://judge0-ce.p.rapidapi.com/submissions";

    const data = {
      language_id: 63,
      source_code: encode(sourceCode),
    };

    const params = {
      base64_encoded: "true",
      wait: "true",
      fields: "stdout",
    };

    const headers = {
      "x-rapidapi-key": key,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    };

    const {
      data: { stdout },
    } = await axios.post(url, data, { params, headers });
    const decodedOutcome = decode(stdout).trim();

    return { result: decodedOutcome.split("\n")[0] };
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserKatas(clerk_user_id, kata_id) {
  const { rows } = await db.query(
    `
    SELECT * FROM user_katas 
    WHERE clerk_user_id = $1 
    AND kata_id = $2
    `,
    [clerk_user_id, kata_id]
  );

  if (rows.length === 0) {
    await db.query(
      `
      INSERT INTO user_katas (clerk_user_id, kata_id)
      VALUES ($1, $2)
      `,
      [clerk_user_id, kata_id]
    );
  }
}

export async function updateUserLevel(clerk_user_id) {
  const amount = 100;

  await db.query(
    `
    UPDATE users
    SET 
    xp = xp + $1,
    level = FLOOR((xp + $1) / 1000) + 1
    WHERE clerk_user_id = $2;
    `,
    [amount, clerk_user_id]
  );
}
