import { formatData } from "../../utils.js";
import {
  createAchievements,
  createHints,
  createKatas,
  createKataTags,
  createTags,
  createTests,
  createUsers,
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
}) {
  try {
    await dropTables(
      "user_katas",
      "user_achievements",
      "kata_tags",
      "tests",
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
    await insertData("achievements", formatData(achievementData));
    await insertData("tags", formatData(tagData), "tag");
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
