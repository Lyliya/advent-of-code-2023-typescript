import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

enum GEM_TYPES {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

type GameCubes = Record<GEM_TYPES, number>;

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const analyzeGames = (games: string) => {
  const maxGems: GameCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  games!.split(";").forEach((game) => {
    const gems = game.split(",");

    gems.forEach((gem) => {
      const [nb, gemType] = gem.trim().split(" ");

      maxGems[gemType! as GEM_TYPES] = Math.max(
        maxGems[gemType! as GEM_TYPES],
        parseInt(nb!)
      );
    });
  });
  return maxGems;
};

let result = 0;

for (const line of input.split("\n")) {
  if (!line) continue;
  const [gameInfo, games] = line.split(":");
  const gameId = parseInt(gameInfo!.split(" ")[1]!);

  const totalGems = analyzeGames(games!);
  if (
    totalGems.red <= RED_CUBES &&
    totalGems.green <= GREEN_CUBES &&
    totalGems.blue <= BLUE_CUBES
  ) {
    result += gameId;
  }
}

console.log(result);
