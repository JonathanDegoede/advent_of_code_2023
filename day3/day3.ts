/**
 * 
 * any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
*/

import { inputDay3 } from "./inputs/day3";
import { inputDay3Example } from "./inputs/day3_example";

const parseLines = (input: string) => {
  return input.trim().replace(/\./g, " ").split("\n");
};

const findNumbers = (input: string, y: number) => {
  const matches = input.match(/\d+/g);

  if (matches === null) return [];

  return matches.map((match) => ({
    startPositionX: input.indexOf(match),
    endPositionX: input.indexOf(match) + match.length - 1,
    y,
    value: parseInt(match),
  }));
};

const isSymbol = (char: string) => {
  return char !== null && char !== " " && isNaN(parseInt(char));
};

const getCharAt = (matrix: string[][], x: number, y: number) => {
  if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[0].length)
    return null;
  return matrix[y][x];
};

const isAdjacentToSymbol = (matrix: string[][], x: number, y: number) => {
  const adjacent = [
    getCharAt(matrix, x - 1, y - 1),
    getCharAt(matrix, x, y - 1),
    getCharAt(matrix, x + 1, y - 1),
    getCharAt(matrix, x - 1, y),
    getCharAt(matrix, x + 1, y),
    getCharAt(matrix, x - 1, y + 1),
    getCharAt(matrix, x, y + 1),
    getCharAt(matrix, x + 1, y + 1),
  ];

  return adjacent.some((char) => isSymbol(char));
};

const Day3 = (input: string) => {
  const lines = parseLines(input);
  const numbers = lines.reduce((acc, line) => {
    return [...acc, ...findNumbers(line, acc.length)];
  }, []);
  const matrix = lines.map((line) => line.split(""));

  console.log(matrix);

  const partNumbers = numbers
    .map((number) => {
      for (let x = number.startPositionX; x <= number.endPositionX; x++) {
        if (isAdjacentToSymbol(matrix, x, number.y)) {
          return number;
        }
      }
      return null;
    })
    .filter((n) => n !== null);

  return partNumbers.reduce((acc, number) => {
    return acc + number.value;
  }, 0);
};

export const RunDay3 = () => {
  console.log("Day 3");

  console.log("Part 1");
  console.log(Day3(inputDay3Example));
  console.log(Day3(inputDay3));
};
