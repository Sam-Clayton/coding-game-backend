export default [
 { kata_id: 1, signature: "addNumbers", input: "0, 0", expected: "0" },
  { kata_id: 1, signature: "addNumbers", input: "-1, 5", expected: "4" },
  { kata_id: 1, signature: "addNumbers", input: "1000, 2000", expected: "3000" },

  { kata_id: 2, signature: "isEven", input: "0", expected: "true" },
  { kata_id: 2, signature: "isEven", input: "-4", expected: "true" },
  { kata_id: 2, signature: "isEven", input: "7", expected: "false" },

  { kata_id: 3, signature: "reverseString", input: "''", expected: "''" },
  { kata_id: 3, signature: "reverseString", input: "'abc'", expected: "'cba'" },
  { kata_id: 3, signature: "reverseString", input: "'racecar'", expected: "'racecar'" },

  { kata_id: 4, signature: "findMax", input: "[1,2,3,4,5]", expected: "5" },
  { kata_id: 4, signature: "findMax", input: "[-1,-2,-3]", expected: "-1" },
  { kata_id: 4, signature: "findMax", input: "[100]", expected: "100" },
];
