import db from "../connection.js";
import {
  dropTables,
  insertData,
  createKatas,
  createTests,
  createHints,
  createTags,
  createNotes,
  createKataTags,
} from "./manage-tables.js";
import { formatData } from "../../utils.js";

export async function seed({ kataData, testData, hintData, tagData }) {
  console.log(kataData);

  try {
    await dropTables("kata_tags", "tests", "hints", "notes", "tags", "katas");

    await createKatas();
    await createTests();
    await createHints();
    await createTags();
    await createNotes();
    await createKataTags();

    await insertData("katas", formatData(kataData));
    await insertData("tests", formatData(testData));
    await insertData("hints", formatData(hintData));
    await insertData("tags", formatData(tagData));
    await insertData("notes", formatData(noteData));
  } catch (err) {
    return err;
  }
}
