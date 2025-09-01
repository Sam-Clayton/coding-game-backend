export default [
  {
    title: "Add Two Numbers",
    description:
      "Write a function that takes two numbers and returns their sum",
    initial_code: "function addNumbers(a, b) {}",
    solution_code: "function addNumbers(a, b) { return a + b }",
    difficulty: "easy",
    created_at: 1595294400000,
  },
   {
        title: "Check Even Number",
        description: "Return true if the number is even, otherwise false",
        initial_code: "function isEven(n) {}",
        solution_code: "function isEven(n) { return n % 2 === 0 }",
        difficulty: "easy",
        created_at: 1595380800000
    },
  {
    title: "Reverse a String",
    description: "Write a function that takes a string and returns it reversed",
    initial_code: "function reverseString(str) {}",
    solution_code:
      'function reverseString(str) { return str.split("").reverse().join(""); }',
    difficulty: "medium",
    created_at: 1595640000000,
  },
];
