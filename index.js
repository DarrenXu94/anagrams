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

class Game {
  constructor(board) {
    this.board = board; // 4x4 array
    this.originalBoard = board;
  }

  validateWordsInBoard(board) {
    // loop through the board and validate that the words are in the dictionary
    // return true if all words are valid

    // check all rows valid
    for (let i = 0; i < board.length; i++) {
      let word = "";
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null) {
          word += board[i][j];
        }
      }
      if (!words.includes(word)) {
        return false;
      }
    }

    // check all cols valid
    for (let i = 0; i < board.length; i++) {
      let word = "";
      for (let j = 0; j < board[i].length; j++) {
        if (board[j][i] !== null) {
          word += board[j][i];
        }
      }

      if (!words.includes(word)) {
        return false;
      }
    }

    return true;
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

  run() {
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
    // loop through the board
    // for every null, try and find a 4 letter word that fits the existing letters
    // should return true if valid board

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

      // need to stop the for loop?
      // re-calculate the board with new word in row
    }
    // this.printBoard(newBoard);
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

const game = new Game(boards.testBoard);
game.run();
// game.printBoard();
// const res = game.validateWordsInBoard(game.board);
// console.log(res);
