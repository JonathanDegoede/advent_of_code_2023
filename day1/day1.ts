/**
 * 
 * 
 * On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
 * 
 */
import { inputDay1 } from "./inputs/day1";
import { inputDay1Part2Example } from "./inputs/day1_part2_example";
import { inputDay1Example } from "./inputs/day1_example";

const numericalValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const alphabeticalValues = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "zero",
];

const Day1 = (input: string, nums: string[], words: string[]) => {
  const inputArray = input.split("\n");

  const extractAlphabeticalNumbers = (
    currentLine: string,
    currentIndex: number
  ) => {
    const numericalChars = [];
    for (let j = 0; j < words.length; j++) {
      const substring = currentLine.substring(currentIndex);
      if (substring.startsWith(words[j])) {
        numericalChars.push(j + 1);
      }
    }

    return numericalChars;
  };

  const extractNumericalNumbers = (
    currentLine: string,
    currentIndex: number
  ) => {
    const numericalChars = [];
    const currentChar = currentLine[currentIndex];
    if (nums.includes(currentChar)) {
      numericalChars.push(parseInt(currentChar));
    }
    return numericalChars;
  };

  const extractNumbers = (currentLine: string) => {
    const numericalChars = [];
    for (let i = 0; i < currentLine.length; i++) {
      numericalChars.push(...extractNumericalNumbers(currentLine, i));
      numericalChars.push(...extractAlphabeticalNumbers(currentLine, i));
    }
    return numericalChars;
  };

  return inputArray.reduce((acc: number, currentLine: string) => {
    const numericalChars = extractNumbers(currentLine);

    if (numericalChars.length < 1) {
      return acc;
    }

    const firstDigit = numericalChars[0];
    const lastDigit = numericalChars[numericalChars.length - 1];
    const calibrationValue = parseInt(`${firstDigit}${lastDigit}`);

    return acc + calibrationValue;
  }, 0);
};

export const RunDay1 = () => {
  console.log("Day 1");
  console.log("part 1");
  console.log(Day1(inputDay1Example, numericalValues, alphabeticalValues));
  console.log(Day1(inputDay1, numericalValues, alphabeticalValues));

  console.log("part 2");
  console.log(Day1(inputDay1Part2Example, numericalValues, alphabeticalValues));
  console.log(Day1(inputDay1, numericalValues, alphabeticalValues));
};
