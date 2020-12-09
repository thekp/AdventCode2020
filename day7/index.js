const fs = require("fs");

const lines = fs
  .readFileSync("./day7/input.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);

let bagObj = {};

for (const line of lines) {
  const [bag, bags] = line.split(" bags contain ");
  const content = bags
    .replace(".", "")
    .split(", ")
    .map((value) => {
      const newVal = value.replace(" bags", "").replace(" bag", "").split(" ");

      const number = newVal[0];
      const colour = newVal.slice(1, newVal.length).join(" ");
      return { colour, number };
    });

  bagObj = { ...bagObj, [bag]: content };
}

const findShinyGold = (colour) => {
  const bagKeys = Object.keys(bagObj);
  if (!bagKeys.includes(colour)) {
    return false;
  }
  if (colour === "shiny gold") {
    return true;
  }
  if (colour === "others") {
    return false;
  }

  const currentBag = bagObj[colour];
  for (const bag of currentBag) {
    if (findShinyGold(bag.colour)) {
      return true;
    }
  }
  return false;
};

let shinyGoldCounter = 0;

const bagKeys = Object.keys(bagObj);
for (const key of bagKeys) {
  if (findShinyGold(key) && key !== "shiny gold") {
    shinyGoldCounter++;
  }
}

console.log(shinyGoldCounter); // part1 answer

const sumBags = (currentBag) => {
  if (currentBag.number == 0) return 0;

  const insideBag = bagObj[currentBag.colour];
  console.log(insideBag);
  let sum = 1;
  for (const bag of insideBag) {
    sum += bag.number * sumBags(bag);
  }
  return sum;
};
console.log(bagObj["shiny gold"]);
console.log(sumBags({ number: 1, colour: "shiny gold" }));
