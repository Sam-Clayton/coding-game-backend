import fs from "fs/promises";
const __dirname = import.meta.dirname;

export default async function fetchApi() {
  const api = await fs.readFile(`${__dirname}/../endpoints.json`);
  return JSON.parse(api);
}
