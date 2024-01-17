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

let currentNode: Node = nodesTree.find((e) => e.name === "AAA")!;
let currentInstructionIndex = 0;

let result = 0;

while (currentNode.name !== "ZZZ") {
  switch (instructions![currentInstructionIndex]) {
    case "R":
      const nodeRight = nodesTree.find(
        (e) => e.name === currentNode.right?.name
      );
      if (!nodeRight) process.exit(1);
      currentNode = nodeRight;
      break;
    case "L":
      const nodeLeft = nodesTree.find((e) => e.name === currentNode.left?.name);
      if (!nodeLeft) process.exit(1);
      currentNode = nodeLeft;
      break;
  }
  currentInstructionIndex =
    (currentInstructionIndex + 1) % instructions!.length;
  result += 1;
}

console.log(result);
