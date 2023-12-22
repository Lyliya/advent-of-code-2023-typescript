import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

enum GEM_TYPES {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

type GameCubes = Record<GEM_TYPES, number>;

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

  const totalGems = analyzeGames(games!);
  result += totalGems.red * totalGems.blue * totalGems.green;
}

console.log(result);
