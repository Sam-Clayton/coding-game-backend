import axios from "axios";
import dotenv from "dotenv";
import { encode, decode } from "../utils.js";
const __dirname = import.meta.dirname;

dotenv.config({ path: `${__dirname}/../.env.api-key` });
const key = process.env.API_KEY;

export async function sendSubmission(sourceCode) {
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

  const result = await axios.post(url, data, { params, headers });
  return decode(result.data);
}
