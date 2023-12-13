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

import { inputDay4 } from "./inputs/day4";
import { inputDay4Example } from "./inputs/day4_example";

type cardInfos = {
  winningNumbers: number[];
  myNumbers: number[];
  copiesAmount: number;
};

const parseLines = (input: string): cardInfos[] => {
  const toNumber = (input: string) =>
    input
      .trim()
      .split(" ")
      .filter((n) => n.length > 0)
      .map((n) => parseInt(n));

  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [card, numbers] = line.split(":");
      const [winningNumbers, myNumbers] = numbers.split("|");

      return {
        winningNumbers: toNumber(winningNumbers),
        myNumbers: toNumber(myNumbers),
        copiesAmount: 1,
      };
    });
};

const Day4 = (input: string) => {
  const cards = parseLines(input);

  const cardPoints = cards.map((card) => {
    return card.myNumbers.reduce((acc, myNumber) => {
      if (card.winningNumbers.includes(myNumber)) {
        if (acc == 0) return 1;
        return acc * 2;
      }
      return acc;
    }, 0);
  });

  return cardPoints.reduce((acc, points) => acc + points, 0);
};

const Day4Part2 = (input: string) => {
  const cards = parseLines(input);

  cards.forEach((card, idx) => {
    const matchingNumbers = card.myNumbers.reduce((acc, myNumber) => {
      if (card.winningNumbers.includes(myNumber)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const indexesToCopy = Array.from(
      { length: matchingNumbers },
      (_, i) => idx + i + 1
    );

    indexesToCopy.forEach((index) => {
      cards[index].copiesAmount += card.copiesAmount;
    });

    return cards;
  });

  return cards.reduce((acc, card) => acc + card.copiesAmount, 0);
};

export const RunDay4 = () => {
  console.log("Day 4");

  console.log("Part 1");
  console.log(Day4(inputDay4Example));
  console.log(Day4(inputDay4));

  console.log("Part 2");
  console.log(Day4Part2(inputDay4Example));
  console.log(Day4Part2(inputDay4));
};
