import prettier from "prettier";

export function isPrimitive(data) {
  return data !== Object(data);
}

export async function assertionsBuilder(testCases) {
  const assertions = testCases.map(
    ({ signature, input, expected }) =>
      `assert.${
        isPrimitive(expected) ? "strictEqual" : "deepEqual"
      }(${signature}(${input}), ${expected});`
  );
  return `
  try {
    ${assertions.join("\n")}
    console.log("PASS");
  } catch (err) {
    if (err.code === "ERR_ASSERTION") {
      console.log("FAIL");
    } else {
      console.log(err);
    }
  }
  `;
}

export async function generateCode(userCode, testCases) {
  const assertions = await assertionsBuilder(testCases);

  let sourceCode = `
  const assert = require("assert");
  ${userCode}
  ${assertions}
  `;
  return await prettier.format(sourceCode, { parser: "babel" });
}
