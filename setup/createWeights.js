// Load dicionary

const fs = require("fs");
const path = require("path");

// import dictionary txt
const dictionary = fs
  .readFileSync(path.join(__dirname, "dictionary.txt"))
  .toString()
  .split("\n");

// load scores
const scores = require("./scores.js");

const weights = {};

// loop through every line in the dictionary
for (let i = 0; i < dictionary.length; i++) {
  // for each letter in the word create a score
  let word = dictionary[i];
  let score = 0;
  for (let j = 0; j < word.length; j++) {
    score += scores[word[j]];
  }
  // store the score in the weights object
  weights[word] = score;
}

// order the weights object by score
const orderedWeights = Object.keys(weights).sort(function (a, b) {
  return weights[a] - weights[b];
});

// write the weights object to a file
fs.writeFileSync(
  path.join(__dirname, "weights.json"),
  JSON.stringify(orderedWeights, null, 2)
);
