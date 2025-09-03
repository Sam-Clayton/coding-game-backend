export default [
  {
    title: "Add Two Numbers",
    description:
      "Write a function that takes two numbers and returns their sum",
    initial_code: "function addNumbers(a, b) {}",
    solution_code: "function addNumbers(a, b) { return a + b }",
    difficulty: "easy",
  },
  {
    title: "Check Even Number",
    description: "Return true if the number is even, otherwise false",
    initial_code: "function isEven(n) {}",
    solution_code: "function isEven(n) { return n % 2 === 0 }",
    difficulty: "easy",
  },
  {
    title: "Reverse a String",
    description: "Return a reversed version of the input string",
    initial_code: "function reverseString(str) {}",
    solution_code:
      "function reverseString(str) { return str.split('').reverse().join('') }",
    difficulty: "easy",
  },
  {
    title: "Find Maximum Number",
    description: "Return the largest number from an array",
    initial_code: "function findMax(arr) {}",
    solution_code: "function findMax(arr) { return Math.max(...arr) }",
    difficulty: "easy",
  },
];
