const fs = require("fs");
const readline = require("readline");

const getSeatId = (row, column) => row * 8 + column;

const calcUpper = (range) => {
  const diff = Math.ceil((range[1] - range[0]) / 2);
  return [range[0] + diff, range[1]];
};

const calcLower = (range) => {
  const diff = Math.ceil((range[1] - range[0]) / 2);
  return [range[0], range[1] - diff];
};

const getRow = (value) => {
  let range = [0, 127];
  for (let i = 0; i < 7; i++) {
    if (value[i] === "F") {
      range = calcLower(range);
    }
    if (value[i] === "B") {
      range = calcUpper(range);
    }
  }
  return range[0];
};

const getColumn = (value) => {
  let range = [0, 7];
  for (let a = 0; a < 3; a++) {
    if (value[a] === "L") {
      range = calcLower(range);
    }
    if (value[a] === "R") {
      range = calcUpper(range);
    }
  }
  return range[0];
};

const missingSeat = (seatIds) => {
  for (let k = 1; k < seatIds.length - 1; k++) {
    if (seatIds[k + 1] !== seatIds[k] + 1) {
      return seatIds[k] + 1;
    }
  }
};

const readBoarding = async () => {
  const fileStream = fs.createReadStream("./day5/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let highestId = 0;
  let allIds = [];
  for await (const line of rl) {
    const row = getRow(line.substring(0, 7));
    const column = getColumn(line.substring(7, line.length));

    const seatId = getSeatId(row, column);
    if (seatId > highestId) {
      highestId = seatId;
    }
    allIds.push(seatId);
  }

  console.log(highestId); // part1 answer

  const sortedIds = allIds.sort((a, b) => a - b);
  console.log(missingSeat(sortedIds)); // part 2 answer
};

readBoarding();
