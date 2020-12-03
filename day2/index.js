const fs = require("fs");
const readline = require("readline");

// Solution for Part 1
function isPasswordValid1(input) {
  const [rule, letter, password] = input.split(" ");
  const [min, max] = rule.split("-");

  let countLetter = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === letter[0]) {
      countLetter++;
    }
  }

  if (countLetter <= max && countLetter >= min) {
    return true;
  } else {
    return false;
  }
}

// Solution for Part 2
function isPasswordValid2(input) {
  const [rule, letter, password] = input.split(" ");
  const [pos1, pos2] = rule.split("-");
  const sanitizedLetter = letter[0];

  let valid1 = false;
  let valid2 = false;

  if (password[pos1 - 1] === sanitizedLetter) {
    valid1 = true;
  }

  if (password[pos2 - 1] === sanitizedLetter) {
    valid2 = true;
  }

  if (valid1 && valid2) {
    return false;
  }

  return valid1 || valid2;
}

async function countValidPasswords() {
  const fileStream = fs.createReadStream("./day2/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let count1 = 0;
  let count2 = 0;

  for await (const line of rl) {
    const validPassword1 = isPasswordValid1(line);
    if (validPassword1) {
      count1++;
    }

    const validPassword2 = isPasswordValid2(line);
    if (validPassword2) {
      count2++;
    }
  }
  console.log("isPasswordValid1", count1);
  console.log("isPasswordValid2", count2);
}

countValidPasswords();
