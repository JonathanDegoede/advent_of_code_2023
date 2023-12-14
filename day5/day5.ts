/**
 * 
The Elf leads you over to the pile of colorful cards. There, you discover dozens of scratchcards, all with their opaque covering already scratched off. Picking one up, it looks like each card has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have. You organize the information into a table (your puzzle input).

As far as the Elf has been able to figure out, you have to figure out which of the numbers you have appear in the list of winning numbers. The first match makes the card worth one point and each match after the first doubles the point value of that card.

For example:

Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11*/

import { inputDay5 } from "./inputs/day5";
import { inputDay5Example } from "./inputs/day5_example";

type MappingInfos = {
  lowerBound: number;
  upperBound: number;
  offset: number;
  group: string;
};

type RawMapping = {
  line: string;
  group: string;
};

const parseLines = (input: string) => {
  const lines = input.trim().split("\n");

  const seeds = lines[0]
    .split(" ")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));

  const rawMappings: RawMapping[] = [];

  const regexAlphabet = /[a-z]/;
  const numericRegex = /[0-9]/;
  let currentGroup = undefined;
  lines.splice(2).forEach((line) => {
    if (regexAlphabet.test(line[0])) {
      currentGroup = line.split(" ")[0];
    }

    if (numericRegex.test(line[0])) {
      rawMappings.push({
        line,
        group: currentGroup,
      });
    }
  });

  const mappingsInfos: MappingInfos[] = rawMappings.map((rawMapping) => {
    const [destination, source, length] = rawMapping.line
      .split(" ")
      .map((x) => parseInt(x));
    return {
      lowerBound: source,
      upperBound: source + length - 1,
      offset: destination - source,
      group: rawMapping.group,
    };
  });

  return {
    seeds,
    mappingsInfos,
  };
};

const Day5 = (input: string) => {
  const { seeds, mappingsInfos } = parseLines(input);

  const locations: number[] = seeds.map((seed) => {
    let mappedForGroup: string = undefined;
    return mappingsInfos.reduce((acc, mapping) => {
      if (mappedForGroup === mapping.group) {
        return acc;
      }

      if (acc >= mapping.lowerBound && acc <= mapping.upperBound) {
        mappedForGroup = mapping.group;
        return acc + mapping.offset;
      }
      return acc;
    }, seed);
  });

  return locations.sort((a, b) => a - b)[0];
};

export const RunDay5 = () => {
  console.log("Day 5");

  console.log("Part 1");
  console.log(Day5(inputDay5Example));
  console.log(Day5(inputDay5));
};
