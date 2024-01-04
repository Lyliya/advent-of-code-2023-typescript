import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const splits = input
  .trim()
  .split("\n")
  .filter((e) => e);

enum HAND_TYPE {
  "HIGH",
  "ONE",
  "TWO",
  "THREE",
  "FULL",
  "FOUR",
  "FIVE",
}

const POWER = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const hands: {
  type: HAND_TYPE;
  bid: number;
  hand: string;
}[] = [];

for (const line of splits) {
  const labels: Record<string, number> = {};
  const [hand, bid] = line.split(" ");
  if (!hand || !bid) continue;
  for (const card of hand!) {
    labels[card] = labels[card] ? labels[card]! + 1 : 1;
  }

  const numberOfLabels = Object.keys(labels).length;
  let type: HAND_TYPE | undefined = undefined;

  switch (numberOfLabels) {
    case 5:
      type = HAND_TYPE.HIGH;
      break;
    case 4:
      type = HAND_TYPE.ONE;
      break;
    case 3:
      type =
        Object.values(labels).filter((e) => e === 3).length > 0
          ? HAND_TYPE.THREE
          : HAND_TYPE.TWO;
      break;
    case 2:
      const firstValue = Object.values(labels)[0];
      type =
        firstValue === 1 || firstValue === 4 ? HAND_TYPE.FOUR : HAND_TYPE.FULL;
      break;
    case 1:
      type = HAND_TYPE.FIVE;
      break;
  }

  if (type === undefined) {
    console.log(`Unknown type for ${hand}`);
    process.exit(1);
  }

  hands.push({
    type,
    hand,
    bid: parseInt(bid),
  });
}

const compareString = (a: string, b: string) => {
  for (let i = 0; i < a.length; i++) {
    if (b[i] === undefined) {
      return -1;
    }

    if (a.charAt(i) !== b.charAt(i)) {
      return (
        POWER.findIndex((e) => e === b.charAt(i)) -
        POWER.findIndex((e) => e === a.charAt(i))
      );
    }
  }
  return 1;
};

const sortedHands = hands.sort((a, b) => {
  if (b.type !== a.type) return a.type - b.type;
  return compareString(a.hand, b.hand);
});

const result = sortedHands.reduce((acc, val, idx) => {
  return (acc += val.bid * (idx + 1));
}, 0);

console.log(result);
