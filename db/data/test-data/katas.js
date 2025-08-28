export default [
  {
    title: "Add Two Numbers",
    description:
      "Write a function that takes two numbers and returns their sum",
    signature: "addNumbers",
    initial_code: "function addNumbers(a, b) {}",
    solution_code: "function addNumbers(a, b) { return a + b }",
    difficulty: "easy",
    created_at: 1595294400000,
  },
  {
    title: "Return Hello",
    description: 'Write a function that always returns the string "Hello"',
    signature: "sayHello",
    initial_code: "function sayHello() {}",
    solution_code: 'function sayHello() { return "Hello"; }',
    difficulty: "easy",
    created_at: 1595467200000,
  },
  {
    title: "Reverse a String",
    description: "Write a function that takes a string and returns it reversed",
    signature: "reverseString",
    initial_code: "function reverseString(str) {}",
    solution_code:
      'function reverseString(str) { return str.split("").reverse().join(""); }',
    difficulty: "medium",
    created_at: 1595640000000,
  },
];
