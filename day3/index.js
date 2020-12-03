const { count } = require("console");
const fs = require("fs");

const map = fs.readFileSync("./day3/input.txt", "utf-8").split("\n");

function countTrees(right, down) {
  let level = 0;
  let position = 0;
  let treeCount = 0;

  while (level < map.length - 1) {
    level += down;
    position += right;

    const lineLength = map[level].length;
    if (position >= lineLength) {
      const remainder = position - lineLength;
      position = remainder;
    }

    if (map[level][position] === "#") {
      treeCount++;
    }
  }

  console.log(treeCount);
  return treeCount;
}

console.log(
  [
    countTrees(1, 1),
    countTrees(3, 1), // part 1 answer
    countTrees(5, 1),
    countTrees(7, 1),
    countTrees(1, 2),
  ].reduce((a, b) => a * b)
); // log out answer to part 2
