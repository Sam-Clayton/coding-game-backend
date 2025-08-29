import { formatData } from "../../utils.js";
import {
  dropTables,
  insertData,
  createKatas,
  createTests,
  createHints,
  createTags,
  createKataTags,
} from "./manage-tables.js";

export async function seed({
  hintData,
  kataData,
  kataTagsData,
  tagData,
  testData,
}) {
  try {
    await dropTables("kata_tags", "tags", "hints", "tests", "katas");

    await createKatas();
    await createTests();
    await createHints();
    await createTags();
    await createKataTags();

    await insertData(
      "katas",
      formatData(kataData),
      "title",
      "description",
      "signature",
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
    await insertData("hints", formatData(hintData), "kata_id", "hint");
    await insertData("tags", formatData(tagData), "tag");
    await insertData("kata_tags", formatData(kataTagsData), "kata_id", "tag");
  } catch (err) {
    console.log(err);
  }
}
