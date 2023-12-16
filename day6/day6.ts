import { inputDay6 } from "./inputs/day6";
import { inputDay6Example } from "./inputs/day6_example";
import { inputDay6Part2 } from "./inputs/day6_part2";

const parseLines = (input: string) => {
  return input
    .trim()
    .split("\n")
    .map((line) =>
      line
        .split(":")[1]
        .split(" ")
        .map((item) => parseInt(item))
        .filter((item) => !isNaN(item))
    );
};

const Day6 = (input: string) => {
  const [times, distances] = parseLines(input);
  const waysToBeatRecord = [];

  times.forEach((time, index) => {
    const distancesCovered = [];

    for (let holdTime = 0; holdTime < time; holdTime++) {
      const raceTime = time - holdTime; //ms
      const speed = holdTime; // mm/ms

      const distance = speed * raceTime;

      if (distance > distances[index]) {
        distancesCovered.push(distance);
      }
    }

    waysToBeatRecord.push(distancesCovered.length);
  });

  return waysToBeatRecord.reduce((a, b) => a * b, 1);
};

export const RunDay6 = () => {
  console.log("Day 5");

  console.log("Part 1");
  console.log(Day6(inputDay6Example));
  console.log(Day6(inputDay6));
  console.log("Part 2");
  console.log(Day6(inputDay6Part2));
};
