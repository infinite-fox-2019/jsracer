"use strict"

// const playersArg = Number(process.argv[2])
const rute = Number(process.argv[3])
const players = [
  {
    name: 'a',
    pos: 0
  },
  {
    name: 'b',
    pos: 0
  },
  // {
  //   name: 'c',
  //   pos: 0
  // },
]

function diceRoll() {
  return Math.ceil(Math.random() * 3)
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard() {
  const board = []

  for (let i = 0; i < players.length; i++) {
    let distance = []
    for (let j = 0; j < rute; j++) {
      // if (j === 0) distance.push(`${players[i].name}`)
      distance.push(' ')
    }
    board.push(distance)
  }

  return board
}

function printLine(player, pos) {
  let isFinish = false
  let win = ''
  const board = printBoard()

  while (!isFinish) {
    for (let i = 0; i < players.length; i++) {
      const dice = diceRoll()
      board[i][players[i].pos] = players[i].name

      if ((players[i].pos + dice) > board[i].length - 1) {
        players[i].pos = rute - 1
      } else {
        players[i].pos += dice
      }

      board[i][players[i].pos] = players[i].name
      board[i][players[i].pos - dice] = ' '
      
      if (winner(board[i], players[i].name) || finished(board[i], players[i].name)) {
        win = `${players[i].name} win`
        isFinish = true
      }
      clearScreen()
      console.log(board, players)
      sleep(500)
    }
  }
  console.log(win)
}
console.log(printLine())


function advance(player) {

}

function finished(board, player) {
  if (board[board.length - 1] == player) return true
  return false
}

function winner(board, player) {
  if (board[board.length - 1] == player) return true
  return false
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
