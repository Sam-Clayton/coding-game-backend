import { Pool } from "pg";
import dotenv from "dotenv";
const __dirname = import.meta.dirname;

const ENV = process.env.NODE_ENV || "development";
console.log(ENV);

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE) throw new Error("No PGDATABASE configured");

const db = new Pool();
export default db;
