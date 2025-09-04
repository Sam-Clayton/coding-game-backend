import { formatData } from "../../utils.js";
import {
  createAchievements,
  createHints,
  createKatas,
  createKataTags,
  createTags,
  createTests,
  createUsers,
  createNotes,
  createUserAchievements,
  createUserKatas,
  dropTables,
  insertData,
} from "./table-schemas/index.js";

export async function seed({
  achievementData,
  hintData,
  kataData,
  kataTagsData,
  tagData,
  testData,
  userData,
  noteData,
}) {
  try {
    await dropTables(
      "user_katas",
      "user_achievements",
      "kata_tags",
      "tests",
      "notes",
      "hints",
      "tags",
      "achievements",
      "users",
      "katas"
    );

    await createKatas();
    await createUsers();
    await createAchievements();
    await createTags();
    await createHints();
    await createNotes();
    await createTests();
    await createKataTags();
    await createUserAchievements();
    await createUserKatas();

    await insertData(
      "katas",
      formatData(kataData),
      "title",
      "description",
      "initial_code",
      "solution_code",
      "difficulty"
    );
    await insertData(
      "users",
      formatData(userData),
      "clerk_user_id",
      "username",
      "is_admin"
    );
    await insertData("achievements", formatData(achievementData));
    await insertData("tags", formatData(tagData), "tag");
    await insertData("notes", formatData(noteData), "kata_id", "note");
    await insertData("hints", formatData(hintData), "kata_id", "hint");
    await insertData(
      "tests",
      formatData(testData),
      "kata_id",
      "signature",
      "input",
      "expected"
    );
    await insertData("kata_tags", formatData(kataTagsData), "kata_id", "tag");
  } catch (err) {
    console.log(err);
  }
}
