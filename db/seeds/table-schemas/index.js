export { createKatas, createKataTags } from "./kata.tables.js";
export {
  createUsers,
  createUserAchievements,
  createUserKatas,
} from "./user.tables.js";
export { dropTables, insertData } from "./utils.js";

export { default as createAchievements } from "./achievement.tables.js";
export { default as createHints } from "./hint.tables.js";
export { default as createNotes } from "./note.tables.js";
export { default as createTags } from "./tag.tables.js";
export { default as createTests } from "./test.tables.js";
