const { Game } = require("./game.js");

const words = require("./weights.json");

function seededRandom(seed) {
  var m = 0x80000000; // 2**31;
  var a = 1103515245;
  var c = 12345;

  var state = seed ? seed : Math.floor(Math.random() * (m - 1));

  return function () {
    state = (a * state + c) % m;
    return state / (m - 1);
  };
}

function getSeededWord(seed, words) {
  if (words.length < 2) {
    throw new Error("The list must contain at least two words.");
  }

  const random = seededRandom(seed);

  const firstIndex = Math.floor(random() * (words.length / 5));

  const startingChar = words[firstIndex][0];

  const filteredWord = words.find((word) => word[0] === startingChar);

  return [words[firstIndex], filteredWord];
}

function generate(seed) {
  const twoWords = getSeededWord(seed, words);

  const verticalWord = twoWords[1].split("");

  const input = [
    twoWords[0].split(""),
    [verticalWord[1], null, null, null],
    [verticalWord[2], null, null, null],
    [verticalWord[3], null, null, null],
  ];

  const game = new Game(input);
  const finishedBoard = game.run();

  // console.log(finishedBoard);
  return finishedBoard;
}

function removeRandomLetters(array, x, seed) {
  const random = seededRandom(seed);
  const flattenedArray = array.flat();
  const length = flattenedArray.length;

  if (x > length) {
    throw new Error(
      "x cannot be greater than the number of elements in the array."
    );
  }

  let nullCount = 0;

  while (nullCount < x) {
    const index = Math.floor(random() * length);

    if (flattenedArray[index] !== null) {
      flattenedArray[index] = null;
      nullCount++;
    }
  }

  // Refill the 4x4 array
  let newArray = [];
  for (let i = 0; i < 4; i++) {
    newArray.push(flattenedArray.slice(i * 4, i * 4 + 4));
  }

  return newArray;
}

const res = removeRandomLetters(generate(50), 3, 1);
console.log(res);
