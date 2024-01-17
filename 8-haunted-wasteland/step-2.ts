import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const splits = input
  .trim()
  .split("\n")
  .filter((e) => e);

const instructions = splits.shift()?.split("");

interface Node {
  name: string;
  left?: Node;
  right?: Node;
}

let nodesTree: Node[] = [];

for (const node of splits) {
  const [name, info] = node.split(" = ");
  const [left, right] = info!.replace("(", "").replace(")", "").split(", ");

  nodesTree.push({
    name: name!,
    left: {
      name: left!,
    },
    right: {
      name: right!,
    },
  });
}

if (nodesTree.length === 0) process.exit(1);

const starts = nodesTree.filter((e) => e.name[2] === "A");
console.log(starts);

const solve = (position: Node) => {
  let result = 0;
  while (position.name[2] !== "Z") {
    switch (instructions![result++ % instructions!.length]) {
      case "R":
        const nodeRight = nodesTree.find(
          (e) => e.name === position.right?.name
        );
        if (!nodeRight) process.exit(1);
        position = nodeRight;
        break;
      case "L":
        const nodeLeft = nodesTree.find((e) => e.name === position.left?.name);
        if (!nodeLeft) process.exit(1);
        position = nodeLeft;
        break;
    }
  }
  return result;
};

const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const results = starts.map(solve).reduce(lcm);

console.log(results);
