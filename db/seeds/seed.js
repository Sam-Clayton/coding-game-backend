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

export async function seed({ kataData, testData, hintData, tagData }) {
  try {
    await dropTables("kata_tags", "tests", "hints", "notes", "tags", "katas");

    await createKatas();
    await createTests();
    await createHints();
    await createTags();
    await createNotes();
    await createKataTags();

    console.log("hello");
    await insertData(
      "katas",
      formatData(kataData),
      "title",
      "description",
      "initial_code",
      "solution_code",
      "difficulty",
      "created_at"
    );
    await insertData(
      "tests",
      formatData(testData),
      "kata_id",
      "input",
      "expected"
    );
    await insertData("hints", formatData(hintData), "kata_id", "hint_text");
    await insertData("tags", formatData(tagData), "name");
  } catch (err) {
    console.log(err);
  }
}
