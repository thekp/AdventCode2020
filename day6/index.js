const fs = require("fs");

const answers = fs.readFileSync("./day6/input.txt", "utf-8").split("\n");

const part1 = () => {
  let line = 0;
  let questions = [];
  let questionCount = 0;

  while (line <= answers.length - 1) {
    const currLine = answers[line];
    if (currLine !== "") {
      for (let i = 0; i < currLine.length; i++) {
        if (!questions.includes(currLine[i])) {
          questions.push(currLine[i]);
        }
      }
    } else {
      questionCount += questions.length;
      questions = [];
    }
    line++;
  }

  console.log(questionCount);
};

part1(); // part1 answer

const part2 = () => {
  let line = 0;
  let allQuestions = [];
  let uniqueQuestions = [];

  let questionCount = 0;
  let peopleInGroup = 0;

  while (line <= answers.length - 1) {
    const currLine = answers[line];
    if (currLine !== "") {
      for (let i = 0; i < currLine.length; i++) {
        if (!uniqueQuestions.includes(currLine[i])) {
          uniqueQuestions.push(currLine[i]);
        }
        allQuestions.push(currLine[i]);
      }
      peopleInGroup++;
    } else {
      for (let b = 0; b < uniqueQuestions.length; b++) {
        const uniqueQuestion = uniqueQuestions[b];
        let counter = 0;
        for (let p = 0; p < allQuestions.length; p++) {
          const allQuestion = allQuestions[p];
          if (allQuestion === uniqueQuestion) {
            counter++;
          }
        }
        if (counter === peopleInGroup) {
          questionCount++;
        }
      }

      allQuestions = [];
      peopleInGroup = 0;
      uniqueQuestions = [];
    }
    line++;
  }
  console.log(questionCount);
};

part2(); // answer to part2
