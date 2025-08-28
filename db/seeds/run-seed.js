import data from "";
import seed from "../seeds/seed.js";
import db from "../connection.js";

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
