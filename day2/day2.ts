/**
 * For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
*/

import { inputDay2Example } from "./inputs/day2_example";
import { inputDay2 } from "./inputs/day2";

const extractGamesInformation = (input: string) => {
  const inputLines = input.split("\n");

  return inputLines.map((game) => {
    const gameNumber = game.split(":")[0];
    const gameData = game.split(":")[1];
    const gameBags = gameData.split(";");
    const gameBagInfos = gameBags.map((bag) => {
      const bagCubes = bag.trim().split(",");
      return bagCubes.reduce((acc, bagCube) => {
        return {
          ...acc,
          [bagCube.trim().split(" ")[1]]: parseInt(
            bagCube.trim().split(" ")[0]
          ),
        };
      }, {});
    });
    return gameBagInfos;
  });
};

const Day2 = (input: string) => {
  const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const findValidGameIds = (gameInfos: {}[][]) => {
    const gameValidities = gameInfos
      .map((gameInfo) => {
        return gameInfo
          .map((bagInfo) => {
            const bagBlues = bagInfo["blue"];
            const bagReds = bagInfo["red"];
            const bagGreens = bagInfo["green"];

            if (
              bagBlues > maxCubes.blue ||
              bagReds > maxCubes.red ||
              bagGreens > maxCubes.green
            ) {
              return false;
            }

            return true;
          })
          .includes(false)
          ? false
          : true;
      })
      .map((bagValidity, idx) => ({
        index: idx + 1,
        isValid: bagValidity,
      }));

    return gameValidities.filter((gameValidity) => gameValidity.isValid);
  };

  const sumValidGameIds = (validGameIds: number[]) => {
    return validGameIds.reduce((acc, validGameId) => {
      return acc + validGameId;
    }, 0);
  };

  const gameInfo = extractGamesInformation(input);
  const validGameIds = findValidGameIds(gameInfo);
  const sum = sumValidGameIds(
    validGameIds.map((validGameId) => validGameId.index)
  );

  return sum;
};

const Day2Part2 = (input: string) => {
  const findMinNeededCubesPerGame = (gameInfos: {}[][]) => {
    return gameInfos.map((gameInfo) => {
      let minBlues = 0;
      let minReds = 0;
      let minGreens = 0;

      gameInfo.forEach((bagInfo) => {
        const bagBlues = bagInfo["blue"];
        const bagReds = bagInfo["red"];
        const bagGreens = bagInfo["green"];

        if (bagBlues > minBlues) {
          minBlues = bagBlues;
        }

        if (bagReds > minReds) {
          minReds = bagReds;
        }

        if (bagGreens > minGreens) {
          minGreens = bagGreens;
        }
      });

      return {
        minBlues,
        minReds,
        minGreens,
      };
    });
  };

  const findPowerOfSets = (minNeededs: {}[]) => {
    return minNeededs.map((minNeeded) => {
      const minBlues = minNeeded["minBlues"];
      const minReds = minNeeded["minReds"];
      const minGreens = minNeeded["minGreens"];

      return minBlues * minReds * minGreens;
    });
  };

  const sum = (powerOfSets: number[]) => {
    return powerOfSets.reduce((acc, powerOfSet) => {
      return acc + powerOfSet;
    }, 0);
  };

  const gameInfo = extractGamesInformation(input);
  const minNeeded = findMinNeededCubesPerGame(gameInfo);
  const powerOfSets = findPowerOfSets(minNeeded);
  return sum(powerOfSets);
};

export const RunDay2 = () => {
  console.log("Day 2");

  console.log("Part 1");
  console.log(Day2(inputDay2Example));
  console.log(Day2(inputDay2));

  console.log("Part 2");
  console.log(Day2Part2(inputDay2));
};
