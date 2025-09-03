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

  { kata_id: 5, signature: "capitalize", input: "'javaScript'", expected: "'JavaScript'" },
  { kata_id: 5, signature: "capitalize", input: "''", expected: "''" },
  { kata_id: 5, signature: "capitalize", input: "'a'", expected: "'A'" },

  { kata_id: 6, signature: "sumArray", input: "[]", expected: "0" },
  { kata_id: 6, signature: "sumArray", input: "[10, -2, 3]", expected: "11" },
  { kata_id: 6, signature: "sumArray", input: "[0,0,0]", expected: "0" },

  { kata_id: 7, signature: "removeDuplicates", input: "[]", expected: "[]" },
  { kata_id: 7, signature: "removeDuplicates", input: "[1,1,1,1]", expected: "[1]" },
  { kata_id: 7, signature: "removeDuplicates", input: "[2,3,2,3,4]", expected: "[2,3,4]" },

  { kata_id: 8, signature: "isPalindrome", input: "''", expected: "true" },
  { kata_id: 8, signature: "isPalindrome", input: "'abba'", expected: "true" },
  { kata_id: 8, signature: "isPalindrome", input: "'hello'", expected: "false" },

  { kata_id: 9, signature: "fibonacci", input: "0", expected: "0" },
  { kata_id: 9, signature: "fibonacci", input: "1", expected: "1" },
  { kata_id: 9, signature: "fibonacci", input: "7", expected: "13" },

  { kata_id: 10, signature: "mergeObjects", input: "{}, {a:1}", expected: "{a:1}" },
  { kata_id: 10, signature: "mergeObjects", input: "{x:1}, {x:2}", expected: "{x:2}" },
  { kata_id: 10, signature: "mergeObjects", input: "{a:1,b:2}, {c:3}", expected: "{a:1,b:2,c:3}" },

  { kata_id: 11, signature: "flatten", input: "[]", expected: "[]" },
  { kata_id: 11, signature: "flatten", input: "[[1,2],[3,[4]]]", expected: "[1,2,3,4]" },
  { kata_id: 11, signature: "flatten", input: "[1,[2,[3,[4]]]]", expected: "[1,2,3,4]" },

  { kata_id: 12, signature: "countVowels", input: "''", expected: "0" },
  { kata_id: 12, signature: "countVowels", input: "'AEIOU'", expected: "5" },
  { kata_id: 12, signature: "countVowels", input: "'bcdfg'", expected: "0" },

  { kata_id: 13, signature: "factorial", input: "0", expected: "1" },
  { kata_id: 13, signature: "factorial", input: "1", expected: "1" },
  { kata_id: 13, signature: "factorial", input: "6", expected: "720" },

  { kata_id: 14, signature: "findPrimes", input: "1", expected: "[]" },
  { kata_id: 14, signature: "findPrimes", input: "2", expected: "[2]" },
  { kata_id: 14, signature: "findPrimes", input: "15", expected: "[2,3,5,7,11,13]" },

  { kata_id: 15, signature: "deepClone", input: "{}", expected: "{}" },
  { kata_id: 15, signature: "deepClone", input: "{x:1,y:{z:2}}", expected: "{x:1,y:{z:2}}" },

  { kata_id: 16, signature: "validateEmail", input: "'user@domain'", expected: "false" },
  { kata_id: 16, signature: "validateEmail", input: "'user@domain.com'", expected: "true" },
  { kata_id: 16, signature: "validateEmail", input: "'user.name@domain.co.uk'", expected: "true" },

  { kata_id: 17, signature: "mergeSorted", input: "[], [1,2]", expected: "[1,2]" },
  { kata_id: 17, signature: "mergeSorted", input: "[5], [1,2]", expected: "[1,2,5]" },

  { kata_id: 18, signature: "countWords", input: "''", expected: "0" },
  { kata_id: 18, signature: "countWords", input: "'Hello'", expected: "1" },

  { kata_id: 19, signature: "sortNumbers", input: "[]", expected: "[]" },
  { kata_id: 19, signature: "sortNumbers", input: "[5,5,5]", expected: "[5,5,5]" },

  { kata_id: 20, signature: "sumDigits", input: "0", expected: "0" },
  { kata_id: 20, signature: "sumDigits", input: "999", expected: "27" },

  { kata_id: 21, signature: "intersection", input: "[], [1,2]", expected: "[]" },
  { kata_id: 21, signature: "intersection", input: "[1,2,3], [4,5,6]", expected: "[]" },

  { kata_id: 22, signature: "isAnagram", input: "'aabb', 'bbaa'", expected: "true" },
  { kata_id: 22, signature: "isAnagram", input: "'abc', 'ab'", expected: "false" },

  { kata_id: 23, signature: "power", input: "5,0", expected: "1" },
  { kata_id: 23, signature: "power", input: "2,10", expected: "1024" },

  { kata_id: 24, signature: "binarySearch", input: "[1,2,3,4],3", expected: "2" },
  { kata_id: 24, signature: "binarySearch", input: "[1,2,3,4],5", expected: "-1" },

  { kata_id: 25, signature: "subsets", input: "[]", expected: "[[]]" },
  { kata_id: 25, signature: "subsets", input: "[1,2,3]", expected: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" },
];