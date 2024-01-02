import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const split = input.split("\n").map((e) => e.replace(/\s+/g, " "));
const time: number[] = split[0]!
  .split(":")[1]!
  .trim()
  .split(" ")
  .map((e) => parseInt(e));
const distance: number[] = split[1]!
  .split(":")[1]!
  .trim()
  .split(" ")
  .map((e) => parseInt(e));

let result = 1;

for (const index in time) {
  let wayOfWinning = 0;
  for (let i = 0; i < time[index]!; i++) {
    const runDistance = (time[index]! - i) * i;
    if (runDistance > distance[index]!) {
      wayOfWinning++;
    }
  }
  result *= wayOfWinning;
}

console.log(result);
