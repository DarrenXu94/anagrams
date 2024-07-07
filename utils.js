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

module.exports = {
  createRegex,
  isLetter,
};
