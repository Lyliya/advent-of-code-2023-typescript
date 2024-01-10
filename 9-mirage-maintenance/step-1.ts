import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const splits = input
  .trim()
  .split("\n")
  .filter((e) => e)
  .map((e) => e.split(" ").map((value) => Number(value)));

let result = 0;

for (const line of splits) {
  const values = [line];

  while (!values.at(-1)?.every((e) => e === 0)) {
    const step = [];
    const lastStep = values.at(-1);

    if (!lastStep) process.exit(1);

    for (let i = 1; i < lastStep.length; i++) {
      step.push(lastStep[i]! - lastStep[i - 1]!);
    }
    values.push(step);
  }

  for (let i = values.length - 1; i > 0; i--) {
    values[i - 1]!.push(values[i]!.at(-1)! + values[i - 1]!.at(-1)!);
  }

  result += values[0]?.at(-1) || 0;
}

console.log(result);
