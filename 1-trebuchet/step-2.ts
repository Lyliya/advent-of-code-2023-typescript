import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

let response = 0;

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const regex = RegExp(`(?=([0-9]|${digits.join("|")}))`, "g");

for (const line of input.split("\n")) {
  const match = [...line.matchAll(regex)];
  if (match.length > 0) {
    const first = isNaN(parseInt(match[0]![1]!))
      ? String(digits.findIndex((value) => value === match[0]![1]) + 1)
      : match[0]![1]!;
    const second = isNaN(parseInt(match.at(-1)![1]!))
      ? String(digits.findIndex((value) => value === match.at(-1)![1]) + 1)
      : match.at(-1)![1]!;
    response += parseInt(first + second);
  }
}

console.log(response);
