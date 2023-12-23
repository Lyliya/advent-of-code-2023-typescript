import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const games = input.split("\n");

let result = 0;

for (const game of games) {
  if (!game) continue;
  const [winningNumbers, numbers] = game
    .split(":")[1]!
    .replace(/\s+/g, " ")
    .trim()
    .split(" | ")!
    .map((text) => {
      return text.split(" ").map((value) => parseInt(value));
    });

  let gamePoint = 0;
  for (const number of numbers!) {
    if (winningNumbers?.includes(number)) {
      if (gamePoint === 0) {
        gamePoint += 1;
      } else {
        gamePoint *= 2;
      }
    }
  }

  result += gamePoint;
}

console.log(result);
