import db from "../connection.js";
import {
  dropTables,
  insertData,
  createKatas,
  createTests,
  createHints,
  createTags,
  createNotes,
} from "./manage-tables.js";

export async function seed(
  kataData,
  kataTestingData,
  hintData,
  tagData,
  noteData
) {
  try {
    await dropTables("tests", "hints", "katas", "tags", "notes");

    await createKatas();
    await createTests();
    await createHints();
    await createTags();
    await createNotes();

    await insertData("katas", kataData);
    await insertData("tests", kataTestingData);
    await insertData("hints", hintData);
    await insertData("tags", tagData);
    await insertData("notes", noteData);
  } catch (err) {
    return err;
  }
}
