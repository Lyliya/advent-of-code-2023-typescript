import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const gearRegex = /[\*]/g;
const numberRegex = /[0-9]+/g;

const lines = input.split("\n");
const lineSize = lines[0]?.length! + 1;
if (!lineSize) process.exit(1);

const gears = [...input.matchAll(gearRegex)];
const numbers = [...input.matchAll(numberRegex)];

interface Point {
  x: number;
  y: number;
}

const pointToIndex = (point: Point): number => {
  return point.x + point.y * lineSize;
};

const indexToPoint = (index: number): Point => {
  return {
    x: index % lineSize,
    y: Math.floor(index / lineSize),
  };
};
const isNumeric = (value: string) => {
  return !isNaN(parseInt(value));
};

interface ParsedNumber {
  id: number;
  value: number;
  startIndex: number;
  endIndex: number;
}

const parsedNumber: ParsedNumber[] = [];

for (const [index, number] of Object.entries(numbers)) {
  parsedNumber.push({
    id: parseInt(index),
    value: parseInt(number[0]),
    startIndex: number.index!,
    endIndex: number.index! + number[0].length - 1,
  });
}

const checkLine = (point: Point): number[] => {
  const surroundingNumbers: ParsedNumber[] = [];
  const tmp = point;
  const index = pointToIndex(tmp);
  for (let i = 0; i < 3 && input[index + i] !== "\n"; i++) {
    if (isNumeric(input[index + i]!)) {
      const match = parsedNumber.find(
        (number: ParsedNumber) =>
          index + i >= number.startIndex && index + i <= number.endIndex
      );
      if (match && !surroundingNumbers.find((e) => e.id === match.id)) {
        surroundingNumbers.push(match);
      }
    }
  }
  return surroundingNumbers.map((e) => e.value);
};

const checkSurrounding = (point: Point) => {
  let total: number[] = [];
  if (point.y > 0)
    total = total.concat(
      checkLine({
        x: point.x > 0 ? point.x - 1 : point.x,
        y: point.y - 1,
      })
    );
  total = total.concat(
    checkLine({ x: point.x > 0 ? point.x - 1 : point.x, y: point.y })
  );
  if (point.y < lines.length - 1)
    total = total.concat(
      checkLine({
        x: point.x > 0 ? point.x - 1 : point.x,
        y: point.y + 1,
      })
    );
  if (total.length === 2) {
    return total.reduce((acc, val) => (acc *= val), 1);
  }
  return 0;
};

let results = 0;

for (const gear of gears) {
  const gearPoint = indexToPoint(gear.index!);
  results += checkSurrounding(gearPoint);
}

console.log(results);
