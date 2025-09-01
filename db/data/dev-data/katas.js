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
  {
    title: "Capitalize First Letter",
    description: "Capitalize the first letter of a string",
    initial_code: "function capitalize(str) {}",
    solution_code:
      "function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1) }",
    difficulty: "easy",
  },
  {
    title: "Sum of Array",
    description: "Return the sum of all numbers in an array",
    initial_code: "function sumArray(arr) {}",
    solution_code:
      "function sumArray(arr) { return arr.reduce((a, b) => a + b, 0) }",
    difficulty: "easy",
  },
  {
    title: "Remove Duplicates",
    description: "Return an array with duplicates removed",
    initial_code: "function removeDuplicates(arr) {}",
    solution_code:
      "function removeDuplicates(arr) { return [...new Set(arr)] }",
    difficulty: "medium",
  },
  {
    title: "Palindrome Check",
    description: "Return true if a string is a palindrome",
    initial_code: "function isPalindrome(str) {}",
    solution_code:
      "function isPalindrome(str) { return str === str.split('').reverse().join('') }",
    difficulty: "medium",
  },
  {
    title: "Fibonacci Sequence",
    description: "Return the nth number in the Fibonacci sequence",
    initial_code: "function fibonacci(n) {}",
    solution_code:
      "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2) }",
    difficulty: "medium",
  },
  {
    title: "Merge Two Objects",
    description: "Merge two objects into one",
    initial_code: "function mergeObjects(obj1, obj2) {}",
    solution_code:
      "function mergeObjects(obj1, obj2) { return {...obj1, ...obj2} }",
    difficulty: "medium",
  },
  {
    title: "Flatten Array",
    description: "Flatten a nested array into a single array",
    initial_code: "function flatten(arr) {}",
    solution_code: "function flatten(arr) { return arr.flat(Infinity) }",
    difficulty: "medium",
  },
  {
    title: "Count Vowels",
    description: "Return the number of vowels in a string",
    initial_code: "function countVowels(str) {}",
    solution_code:
      "function countVowels(str) { return (str.match(/[aeiou]/gi) || []).length }",
    difficulty: "easy",
  },
  {
    title: "Factorial",
    description: "Return the factorial of a number",
    initial_code: "function factorial(n) {}",
    solution_code:
      "function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1) }",
    difficulty: "medium",
  },
  {
    title: "Find Prime Numbers",
    description: "Return all prime numbers up to n",
    initial_code: "function findPrimes(n) {}",
    solution_code:
      "function findPrimes(n) { let primes = []; for(let i=2;i<=n;i++){if(Array.from({length:i-2},(_,j)=>j+2).every(x=>i%x!==0)) primes.push(i);} return primes; }",
    difficulty: "hard",
  },
  {
    title: "Deep Clone Object",
    description: "Return a deep copy of an object",
    initial_code: "function deepClone(obj) {}",
    solution_code:
      "function deepClone(obj) { return JSON.parse(JSON.stringify(obj)) }",
    difficulty: "medium",
  },
  {
    title: "Validate Email",
    description: "Return true if a string is a valid email",
    initial_code: "function validateEmail(email) {}",
    solution_code:
      "function validateEmail(email) { return /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(email) }",
    difficulty: "medium",
  },
  {
    title: "Merge Sorted Arrays",
    description: "Merge two sorted arrays into a single sorted array",
    initial_code: "function mergeSorted(arr1, arr2) {}",
    solution_code:
      "function mergeSorted(arr1, arr2) { return [...arr1,...arr2].sort((a,b)=>a-b) }",
    difficulty: "medium",
  },
  {
    title: "Count Words",
    description: "Return the number of words in a string",
    initial_code: "function countWords(str) {}",
    solution_code:
      "function countWords(str) { return str.trim().split(/\\s+/).length }",
    difficulty: "easy",
  },
  {
    title: "Sort Numbers",
    description: "Return a sorted array of numbers",
    initial_code: "function sortNumbers(arr) {}",
    solution_code: "function sortNumbers(arr) { return arr.sort((a,b)=>a-b) }",
    difficulty: "easy",
  },
  {
    title: "Sum of Digits",
    description: "Return the sum of digits of a number",
    initial_code: "function sumDigits(n) {}",
    solution_code:
      "function sumDigits(n) { return n.toString().split('').reduce((a,b)=>a+Number(b),0) }",
    difficulty: "medium",
  },
  {
    title: "Intersection of Arrays",
    description: "Return the intersection of two arrays",
    initial_code: "function intersection(arr1, arr2) {}",
    solution_code:
      "function intersection(arr1, arr2) { return arr1.filter(x => arr2.includes(x)) }",
    difficulty: "medium",
  },
  {
    title: "Anagram Check",
    description: "Return true if two strings are anagrams",
    initial_code: "function isAnagram(str1, str2) {}",
    solution_code:
      "function isAnagram(str1, str2) { return str1.split('').sort().join('') === str2.split('').sort().join('') }",
    difficulty: "medium",
  },
  {
    title: "Power Function",
    description: "Return base raised to the exponent",
    initial_code: "function power(base, exp) {}",
    solution_code: "function power(base, exp) { return Math.pow(base, exp) }",
    difficulty: "easy",
  },
  {
    title: "Binary Search",
    description:
      "Return the index of target in a sorted array, or -1 if not found",
    initial_code: "function binarySearch(arr, target) {}",
    solution_code:
      "function binarySearch(arr, target) { let l=0, r=arr.length-1; while(l<=r){let m=Math.floor((l+r)/2); if(arr[m]===target) return m; else if(arr[m]<target) l=m+1; else r=m-1;} return -1; }",
    difficulty: "hard",
  },
  {
    title: "Generate Subsets",
    description: "Return all subsets of an array",
    initial_code: "function subsets(arr) {}",
    solution_code:
      "function subsets(arr) { let res=[[]]; for(let num of arr){res.push(...res.map(x=>[...x,num]))} return res }",
    difficulty: "hard",
  },
];
