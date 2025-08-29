import db from "../connection.js";
import { seed } from "./seed.js";
import data from "../data/dev-data";

async function runSeed() {
  await seed(data);
  db.end();
}

runSeed();
