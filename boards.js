module.exports = {
  emptyBoard: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  testBoard: [
    ["T", "E", "S", "T"],
    ["E", null, null, null],
    ["S", null, null, null],
    ["T", null, null, null],
  ],
  finishedBoard: [
    ["L", "A", "N", "E"],
    ["A", "R", "E", "A"],
    ["N", "E", "A", "R"],
    ["E", "A", "R", "L"],
  ],
  halfBoard: [
    [null, "A", "N", null],
    [null, "R", "E", null],
    ["N", "E", null, "R"],
    ["E", "A", "R", null],
  ],
  easyBoard: [
    [null, "A", "N", null],
    [null, "R", "E", null],
    ["N", "E", "A", "R"],
    ["E", "A", "R", "L"],
  ],
  unknownBoard: [
    ["A", "L", "A", "N"],
    ["R", null, null, null],
    ["E", null, null, null],
    ["A", null, null, null],
  ],
};
