"use strict"

function diceRoll () {
  return Math.floor(Math.random() * 6)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

let player = process.argv[2] // 2
let pos = process.argv[3] // 15

// GENERATE NAMES AND POSITION
let names = []

for (let i = 0; i < player; i++) {
  const lib = 'abcde'
  names.push([lib[i], 0])
}

// console.log(names); // [ [ 'a', 0 ], [ 'b', 0 ] ]

function printBoard () {
  if (player < 2) {
    return "Maaf, pemain minimal 2"
  }
  else if (pos < 15) {
    return "Maaf, panjang lintasan minimal 15"
  }
  else {
    printLine (player, pos)
  }
}

console.log(printBoard());

function printLine (player, pos) {
  let board = []
  for (let i = 0; i < player; i++) {
    board.push([])
    for (let j = 0; j < pos; j++) {
      board[i].push('')
    }
  }
  // console.log(board);
  // [ [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ],
  //   [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ] ]

  for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][names[i][1]] = names[i][0]
      if (j === 0) {
          clearScreen()
          console.log(board[i].join(' |'));
          sleep(500)
      }
      else {
        while (names[i][1] < pos) {
          names[i][1] += diceRoll()
          board[i][names[i][1]] = names[i][0]
          clearScreen()
          console.log(board[i].join(' |'));
          sleep(500)
        }
      }
    }
  }
}

function advance (player) {

}

function finished () {

}

function winner () {

}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
