const fs = require("fs");

const pp = fs.readFileSync("./day4/input.txt", "utf-8").split("\n");

const validKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const isKeyValid = (currentKey) => {
  return validKeys.includes(currentKey);
};

const validate = (key) => {
  switch (key) {
    case "byr":
      return (value) =>
        value.length === 4 && Number(value) >= 1920 && Number(value) <= 2002;

    case "iyr":
      return (value) =>
        value.length === 4 && Number(value) >= 2010 && Number(value) <= 2020;

    case "eyr":
      return (value) =>
        value.length === 4 && Number(value) >= 2010 && Number(value) <= 2030;

    case "hgt":
      return (value) => {
        const measurement = value.substring(value.length - 2, value.length);
        const number = Number(value.substring(0, value.length - 2));
        if (measurement === "cm") {
          return number >= 150 && number <= 193;
        } else if (measurement === "in") {
          return number >= 59 && number <= 76;
        }
        return false;
      };

    case "hcl":
      return (value) => {
        const hex = value.substring(1, value.length);
        return value[0] === "#" && !!hex.match(/[0-9a-f]{6}/g);
      };

    case "ecl":
      return (value) => {
        const eyeColour = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        return eyeColour.includes(value);
      };

    case "pid":
      return (value) => value.length === 9;

    default:
      return () => false;
  }
};

let line = 0;
let validCount = 0;
let currentKeys = [];

while (line <= pp.length - 1) {
  if (pp[line] !== "") {
    const ppValues = pp[line].split(" ");
    for (let i = 0; i < ppValues.length; i++) {
      const key = ppValues[i].split(":")[0];
      const value = ppValues[i].split(":")[1];
      const isValueValid = validate(key)(value);

      if (key !== "cid" && isValueValid) {
        currentKeys.push(key);
      }
    }
  } else {
    const ppValid = currentKeys.every(isKeyValid) && currentKeys.length === 7;
    if (ppValid) {
      validCount++;
    }

    currentKeys = [];
  }

  line++;
}

console.log(validCount);
