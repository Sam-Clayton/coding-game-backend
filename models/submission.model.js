import axios from "axios";
import dotenv from "dotenv";
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
    return { result: decode(stdout).trim() };
  } catch (err) {
    console.log(err);
  }
}
