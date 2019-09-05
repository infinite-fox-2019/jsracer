"use strict"
/* 

  Rizkyich JS RACER
  Input : node js-racer.js <total_player> <track_length> >> 20 track length is more exciting
  Obstacle : hit 'X' then player go back to start
  Power UP : hit '>' got boosted 2 / 3 / 4 / 5 steps
*/

function diceRoll() {
  return Math.floor((Math.random() * 6) + 1)
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function diceRoll() {
  return Math.floor((Math.random() * 6) + 1)
}

function printBoard(arr) {
  console.log(`All racer is competing for the first place, Hit '>' to speed up but be aware with the 'X !!\n`)
  for (let i = 0; i < arr.length; i++) {
    console.log('|' + arr[i].join('|'))
  }
}

function printLine(info) {
  const player = info.player
  const trackLength = info.trackLength
  if (player < 2) {
    console.log('Need more players')
  } else if(trackLength < 10) {
    console.log(`track length must be greater than 10`)
  } else {
    const charLib = 'abcdefghijklmnopqrstuvwxyz'
    const players = []
    const lineBoard = []
  
  
    for (let i = 0; i < player; i++) {
      players[i] = charLib[i]
      lineBoard[i] = [players[i]]
      for (let j = 1; j < trackLength + 1; j++) {
        lineBoard[i].push(' ')
      }
    }
  
    const boardComplete = addObstaclePowerUp(lineBoard, player, trackLength)
    advance(boardComplete, players)
  }


}

function addObstaclePowerUp(board, player, col) {
  for (let i = 0; i < player; i++) {
    let count = Math.floor(Math.random() * 4)
    while (count > 0) {
      let xRandom = Math.floor(Math.random() * col)
      let upRandom = Math.floor(Math.random() * col)
      if (xRandom !== 0 && upRandom !== 0 && xRandom !== upRandom) {
        board[i][xRandom] = 'X'
        board[i][upRandom] = '>'
      }
      count--
    }
  }
  return board
}

function advance(arr, player) {
  let isFinished = false
  let winnerIndex = 0
  clearScreen()
  printBoard(arr)

  while (!isFinished) {
    let count = 0;
    while (count < player.length && !isFinished) {
      let currentPos = arr[count].indexOf(player[count])
      let newPos = diceRoll() + currentPos;

      if (newPos >= arr[count].length - 1) {
        newPos = arr[count].length - 1
        isFinished = true
        winnerIndex = count
      }

      if (arr[count][newPos] === 'X') {
        arr[count][currentPos] = ' '
        arr[count][newPos] = player[count]
        sleep(500)
        clearScreen()
        printBoard(arr)
        arr[count][newPos] = ' '
        newPos = 0
        arr[count][newPos] = player[count]
      }

      if (arr[count][newPos] === '>') {
        arr[count][currentPos] = ' '
        arr[count][newPos] = player[count]
        sleep(500)
        clearScreen()
        printBoard(arr)
        arr[count][newPos] = ' '
        const availbableMove = [2, 3, 4, 5]
        let forward = Math.floor(Math.random() * availbableMove.length)
        newPos += availbableMove[forward]
        if (newPos >= arr[count].length - 1) {
          newPos = arr[count].length - 1
          isFinished = true
          winnerIndex = count
        } else {
          arr[count][newPos] = player[count]
        }
      }

      arr[count][currentPos] = ' '
      arr[count][newPos] = player[count]
      sleep(500)
      clearScreen()
      printBoard(arr)

      count++
    }

  }

  if (isFinished) {
    return winner(player[winnerIndex])
  }

}



function winner(player) {
  console.log('The winner is ' + player)
}



function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

const input = process.argv.slice(2)
printLine({
  player:Number(input[0]), 
  trackLength: Number(input[1])
})