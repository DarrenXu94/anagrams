const readline = require("readline");

const boards = require("./boards.js");

const words = require("./weights.json");

function createRegex(patternArray) {
  // Replace null with dot (.)
  const regexPattern = patternArray
    .map((char) => (char === null ? "." : char))
    .join("");
  // Create regex with the pattern
  const regex = new RegExp(`^${regexPattern}$`);
  return regex;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

class Game {
  constructor(board, dupesAllowed = true) {
    this.board = board; // 4x4 array
    this.dupesAllowed = dupesAllowed;
  }

  // chars is an array of len 4
  findWords(chars) {
    // loop through the dictionary and find words that start with the letters
    // return the words
    const word = words.filter((word) => {
      const regex = createRegex(chars);
      return regex.test(word);
    });
    // console.log(word);
    return word;
  }

  hasDupes(board) {
    // loop through board
    // if there are any duplicates return false
    // else return true
    const horizontalWords = board.map((row) => row.join(""));
    const verticalWords = board[0].map((_, i) =>
      board.map((row) => row[i]).join("")
    );

    const allWords = [...horizontalWords, ...verticalWords].filter(
      (word) => word.length === 4
    );
    const allWordsSet = new Set(allWords);
    return allWords.length !== allWordsSet.size;
  }

  run() {
    if (!this.dupesAllowed) {
      if (this.hasDupes(this.board)) {
        console.log("Board has duplicates");
        return;
      }
    }
    const res = this.calculate(this.board);
    if (res) {
      this.printBoard(res);
      console.log("Board is valid");
    } else {
      console.log("Board is invalid");
    }
  }

  checkIfBoardValidVertical(board) {
    for (let i = 0; i < board.length; i++) {
      let word = "";
      for (let j = 0; j < board[i].length; j++) {
        if (board[j][i] !== null) {
          word += board[j][i];
        }
      }
      if (word.length === 4 && !words.includes(word)) {
        return false;
      }
    }

    return true;
  }

  calculate(board) {
    // first check all vertical cols if filled in are valid
    // loop through the board
    // for every null, try and find a 4 letter word that fits the existing letters
    // should return the valid board if valid else return false

    const isBoardValidVertical = this.checkIfBoardValidVertical(board);
    if (!isBoardValidVertical) return false;

    let newBoard = JSON.parse(JSON.stringify(board));

    for (let i = 0; i < board.length; i++) {
      let word = [];

      // each char
      for (let j = 0; j < board[i].length; j++) {
        word.push(board[i][j]);
      }
      const hasNull = word.includes(null);
      if (hasNull) {
        const newWords = this.findWords(word);
        for (let k = 0; k < newWords.length; k++) {
          const newWord = newWords[k];
          const splitNewWord = newWord.split("");
          newBoard[i] = splitNewWord;
          const hasValidResult = this.calculate(newBoard);

          // if has valid result return
          if (hasValidResult) {
            newBoard = hasValidResult;
            return newBoard;
          }
        }
        return false;
      }
    }
    return newBoard;
  }

  printBoard(board) {
    console.log("\n");
    // loop through the 4x4 board and print
    for (let i = 0; i < board.length; i++) {
      let row = "";
      for (let j = 0; j < board[i].length; j++) {
        row += (board[i][j] || "*") + " ";
      }
      console.log(row);
    }
    console.log("\n");
  }
}

// const game = new Game(boards.testBoard, false);
// const game = new Game(boards.unknownBoard);
// game.run();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "Please enter the first input: ",
  "Please enter the second input: ",
  "Please enter the third input: ",
  "Please enter the fourth input: ",
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
    // answers.push(answer.toUpperCase());
    const capsAnswer = answer.toUpperCase();
    const splitAnswers = capsAnswer
      .split("")
      .map((char) => (isLetter(char) ? char : null));
    answers.push(splitAnswers);
    askQuestion(index + 1);
  });
};

askQuestion(0);
