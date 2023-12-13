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

type SymbolInfos = {
  x: number;
  y: number;
  value: string;
};

type NumberInfos = {
  startPositionX: number;
  endPositionX: number;
  y: number;
  value: number;
  adjacentSymbol?: SymbolInfos;
};

const parseLines = (input: string) => {
  return input.trim().replace(/\./g, " ").split("\n");
};

const findNumbers = (input: string, y: number) => {
  const matches = input.match(/\d+/g);

  if (matches === null) return [];

  return matches.reduce((acc: NumberInfos[], match) => {
    const lastMatch = acc.length !== 0 && acc[acc.length - 1];
    const lastMatchEndPositionX = lastMatch ? lastMatch.endPositionX : 0;

    const startPosX = input.indexOf(match, lastMatchEndPositionX); //This ensures that we dont get the position of a previous match

    return [
      ...acc,
      {
        startPositionX: startPosX,
        endPositionX: startPosX + match.length - 1,
        y,
        value: parseInt(match),
      },
    ];
  }, []);
};

const isSymbol = (char: string) => {
  return char !== null && char !== " " && isNaN(parseInt(char));
};

const getCharAt = (matrix: string[][], x: number, y: number) => {
  if (x < 0 || y < 0 || x >= matrix[0].length || y >= matrix.length)
    return null;
  return matrix[y][x];
};

const getAdjacentCoords = (x: number, y: number) => {
  return [
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x - 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ];
};

const getAdjacentChars = (matrix: string[][], x: number, y: number) => {
  return getAdjacentCoords(x, y).map((p) => ({
    x: p.x,
    y: p.y,
    value: getCharAt(matrix, p.x, p.y),
  }));
};

const findAdjacentSymbol = (
  matrix: string[][],
  x: number,
  y: number
): SymbolInfos => {
  return getAdjacentChars(matrix, x, y).find((char) => isSymbol(char.value));
};

const getPartNumbers = (numbers: NumberInfos[], matrix: string[][]) => {
  return numbers
    .map((number) => {
      for (let x = number.startPositionX; x <= number.endPositionX; x++) {
        const adjacentSymbol = findAdjacentSymbol(matrix, x, number.y);
        if (adjacentSymbol) {
          return {
            ...number,
            adjacentSymbol: adjacentSymbol,
          };
        }
      }
      return null;
    })
    .filter((n) => n !== null);
};

const getNumbersFrom = (lines: string[]) => {
  return lines.reduce((acc: NumberInfos[], line, y) => {
    return [...acc, ...findNumbers(line, y)];
  }, []);
};

const Day3 = (input: string) => {
  const lines = parseLines(input);
  const numbers = getNumbersFrom(lines);
  const matrix = lines.map((line) => line.split(""));

  const partNumbers = getPartNumbers(numbers, matrix);

  return partNumbers.reduce((acc, number) => {
    return acc + number.value;
  }, 0);
};

const Day3Part2 = (input: string) => {
  const lines = parseLines(input);
  const numbers = getNumbersFrom(lines);
  const matrix = lines.map((line) => line.split(""));

  const partNumbers = getPartNumbers(numbers, matrix);
  const adjacentToGears = partNumbers.filter(
    (pn) => pn.adjacentSymbol.value === "*"
  );

  const gears = adjacentToGears
    .map((pn) => pn.adjacentSymbol)
    .filter(
      (value, index, self) =>
        self.findIndex((v) => v.x === value.x && v.y === value.y) === index
    );

  const connectedByGears = gears
    .map((gear) => {
      return adjacentToGears.filter(
        (pn) => pn.adjacentSymbol.x === gear.x && pn.adjacentSymbol.y === gear.y
      );
    })
    .filter((g) => g.length > 1);

  return connectedByGears
    .map((g: NumberInfos[]) => g[0].value * g[1].value)
    .reduce((acc, value) => acc + value, 0);
};

export const RunDay3 = () => {
  console.log("Day 3");

  console.log("Part 1");
  console.log(Day3(inputDay3));

  console.log("Part 2");
  console.log(Day3Part2(inputDay3));
};
