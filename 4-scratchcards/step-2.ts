import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const games = input.trim().split("\n");

const cardNumbers: Record<number, number> = {};

for (const [index, game] of games.entries()) {
  const [gameInfo, gameNumbers] = game.split(":");
  const gameIndex = parseInt(gameInfo!.replace(/\s+/g, " ").split(" ")[1]!);
  const [winningNumbers, numbers] = gameNumbers!
    .replace(/\s+/g, " ")
    .trim()
    .split(" | ")!
    .map((text) => {
      return text.split(" ").map((value) => parseInt(value));
    });

  let matchingNumber = 0;

  for (const number of numbers!) {
    if (winningNumbers?.includes(number)) {
      matchingNumber += 1;
      const multiplier = cardNumbers[gameIndex]
        ? cardNumbers[gameIndex]! + 1
        : 1;
      if (index + matchingNumber > games.length) {
        continue;
      }
      if (cardNumbers[gameIndex + matchingNumber]) {
        cardNumbers[gameIndex + matchingNumber] += 1 * multiplier;
      } else {
        cardNumbers[gameIndex + matchingNumber] = 1 * multiplier;
      }
    }
  }
  if (cardNumbers[gameIndex]) {
    cardNumbers[gameIndex] += 1;
  } else {
    cardNumbers[gameIndex] = 1;
  }
}

console.log(Object.values(cardNumbers).reduce((acc, val) => (acc += val), 0));
