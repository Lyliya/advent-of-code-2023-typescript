import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

let response = 0;

const regex = /[0-9]/g;

for (const line of input.split("\n")) {
  const match = [...line.matchAll(regex)];
  if (match.length > 0) {
    response += parseInt(match[0]![0] + match.at(-1)![0]);
  }
}

console.log(response);
