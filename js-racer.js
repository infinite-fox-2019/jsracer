function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  return process.stdout.write('\033c');
  console.clear();
}
"use strict"

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

const lib = [['🚴'], ['🚀'], ['🚁'], ['🚖'], ['🚎'], ['🚢'], ['🚒']]
const numberOfPlayers = process.argv[2]
const trackLenght = process.argv[3]

if (numberOfPlayers < 2) {
  console.log('Jumlah player harus lebih dari 2');
} else if (trackLenght < 15) {
  console.log('Panjang lintasan harus lebih dari 15');
} else if (isNaN(numberOfPlayers + trackLenght)) {
  let help = `------------------___HELP___--------------------\n`
  help += '\n'
  help += `node jsRacer <Jumlah Pemain> <Panjang Lintasan>\n`
  help += `Example node jsRacer 3 15`
  console.log(help);
}

else {
  advance()
}




function diceRoll() {
  return Math.ceil(Math.random() * 6)
}

function generatedBoard() {
  let output = []
  for (let i = 0; i < numberOfPlayers; i++) {
    let temp = []
    for (let j = 0; j < trackLenght; j++) {
      temp.push(' ')
    }
    output.push(temp)
  }
  return output
}

function start() {
  let board = generatedBoard()
  let ramdom = 0
  let randomObstacle = 0
  let randomBonus = 0
  for (let i = 0; i < numberOfPlayers; i++) {
    randomObstacle = Math.floor(Math.random() * (trackLenght * 0.20) + 1)
    randomBonus = Math.floor(Math.random() * (trackLenght * 0.20) + 1)
    while (randomObstacle) {
      ramdom = Math.floor(Math.random() * (trackLenght - 2) + 1)
      board[i][ramdom] = '▓'
      randomObstacle--
    }
    while (randomBonus) {
      ramdom = Math.floor(Math.random() * (trackLenght - 2) + 1)
      board[i][ramdom] = '≫'
      randomBonus--
    }
    board[i][0] = lib[i]
  }
  return board
}


function advance() {
  let board = start()
  let win = false
  let winner = ''
  let move = 0
  let obstacleAndBonus = ''
  clearScreen()
  printLine(board)
  sleep(1000)
  while (!win) {
    //Check Winner
    for (let i = 0; i < numberOfPlayers; i++) {
      move = board[i].indexOf(lib[i])
      board[i][move] = ' '
      move += diceRoll()

      //simpan obstacle and bonus

      obstacleAndBonus = board[i][move]

      // balikin ke akhir kalau kelewatan
      if (move > (trackLenght - 1)) {
        board[i][trackLenght - 1] = lib[i]
      } else {
        board[i][move] = lib[i]
      }
      // tampilan
      clearScreen()
      printLine(board)
      sleep(1000)

      // BONUS and obstacle
      if (obstacleAndBonus === '≫') {
        board[i][move] = ' '

        move += 3
        if (move > (trackLenght - 1)) {
          board[i][trackLenght - 1] = lib[i]
        } else {
          board[i][move] = lib[i]
        }
        console.log(` Player ${lib[i]}   get BONUS (Move 3 step ahead)`);
        sleep(1000)
        clearScreen()
        printLine(board)
        sleep(1000)
      }

      else if (obstacleAndBonus === '▓') {
        board[i][move] = ' '

        move -= 3
        if (move > (trackLenght - 1)) {
          board[i][trackLenght - 1] = lib[i]
        } else if (move < 0) {
          board[i][0] = lib[i]
        }
        else {
          board[i][move] = lib[i]
        }
        console.log(`Oh.. NO...!! Player ${lib[i]}   (Move 3 step back)`);
        sleep(1000)
        clearScreen()
        printLine(board)
        sleep(1000)
      }

      // check pemenang
      if (board[i][trackLenght - 1] === lib[i]) {
        winner = lib[i]
        win = true
        break;
      }
    }
  }
  console.log(`Player ${winner}  is the winner`);
  return ''
}



function printLine(array) {
  console.log(`   ≫ Move 3 step ahead`);
  console.log(`   ▓ Move 3 step back\n`);
  let output = ''
  for (let i = 0; i < array.length; i++) {
    output += array[i].join(' |')
    output += '\n'
  }
  console.log(output);
}






