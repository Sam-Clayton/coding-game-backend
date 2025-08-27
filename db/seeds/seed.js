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

export async function seed(kataData, testData, hintData, tagData, noteData) {
  try {
    await dropTables("kata_tags", "tests", "hints", "notes", "tags", "katas");

    await createKatas();
    await createTests();
    await createHints();
    await createTags();
    await createNotes();
    await createKataTags();

    await insertData("katas", kataData);
    await insertData("tests", testData);
    await insertData("hints", hintData);
    await insertData("tags", tagData);
    await insertData("notes", noteData);
  } catch (err) {
    return err;
  }
}
