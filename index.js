const readline = require("readline");

const { isLetter } = require("./utils.js");

const { Game } = require("./game.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "Please enter the first row, enter a space for blank: ",
  "Please enter the second row, enter a space for blank: ",
  "Please enter the third row, enter a space for blank: ",
  "Please enter the fourth row, enter a space for blank: ",
];

let answers = [];

const askQuestion = (index) => {
  if (index === questions.length) {
    rl.close();
    const game = new Game(answers);
    game.run();
    return;
  }

  rl.question(questions[index], (answer) => {
    if (answer.length !== 4) {
      console.log("Please enter a 4 letter word");
      askQuestion(index);
      return;
    }
    const capsAnswer = answer.toUpperCase();
    const splitAnswers = capsAnswer
      .split("")
      .map((char) => (isLetter(char) ? char : null));
    answers.push(splitAnswers);
    askQuestion(index + 1);
  });
};

askQuestion(0);
