import { Pool } from "pg";
import dotenv from "dotenv";
const __dirname = import.meta.dirname;

const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

if (!process.env.PGDATABASE) throw new Error("No PGDATABASE configured");

export default new Pool();
