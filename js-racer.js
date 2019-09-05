"use strict"

function diceRoll () {
  const dadu = Math.floor(Math.random() * 6 + 1);
  return dadu;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (player, jalur) {
  let board = [];
  let listPlayer = 'abcdefghijklmnopqrstuvwxyz'

  for (var i = 0; i < player; i++) {
    let tempPlayer = [];
    tempPlayer[0] = listPlayer[i];
    for (let j = 1; j < jalur; j++) {
      tempPlayer.push(" ");
    }
    board.push(tempPlayer);
  }
  return board;
}

function positionPlayer(player) {
  let output = []
  for (var i = 0; i < player; i++) {
    output.push(0)
  }
  return output
}

function printLine (player, pos) {
  let position = positionPlayer(player)
  let alphabet = advance(player)
  let array = printBoard(player, pos)
  if (player < 2 || pos < 15) {
    console.log('Inputan jumlah player minimal 2 dan panjang lintasan minimal 15');
  } else {
    clearScreen()
    finished(array)
    sleep(500)
    clearScreen()
  
    let cond = true;

    while (cond) {
      for (let i = 0; i < player; i++) {
        position[i] += diceRoll()
        if (position[i] >= pos - 1) {
          position[i] = pos - 1
        }
        for (let j = 0; j < array[i].length; j++) {

          if (j === position[i]) {
            array[i][j] = alphabet[i]
          }
          else {
            array[i][j] = " "
          }
        }

        finished(array)
        if (array[i][pos - 1] !== " ") {
          console.log(winner(alphabet[i]));
          cond = false;
          break;
        }
        sleep(1000)
        clearScreen()
      }
    }
  } 
};
//function advance untuk player
function advance (player) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let result = [];
  for (let i = 0; i < player; i++) {
    result.push(alphabet[i])
  }
  return result;
}
//function finished untuk display default
function finished (array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i].join("|"))
  }
}

function winner (player) {
  return `Pemenangnya adalah ${player}`;
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

let parameter = process.argv.slice(2);
printLine(parameter[0], parameter[1]);
//console.log(parameter);