"use strict";
printBoard();

function diceRoll() {
  let nextVal = Math.floor(Math.random() * 2) + 1;
  return nextVal;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function printBoard() {
  let player = Number(process.argv[2]);
  let pos = Number(process.argv[3]);
  if (player < 3) {
    return console.log('Player minimal 2')
  } else if (player > 10){
    return console.log('Player maksimal 10')
  }else if (pos < 8){
    return console.log('Panjang lintasan minimal 15')
  } else {
    printLine(player, pos);
  }
}

function printLine(player, pos) {
  let pemain = "abcdefghij";
  let track = [];
  for (let i = 0; i < player; i++) {
    let temp = [];
    for (let j = 0; j < pos; j++) {
      if (j === 0) {
        temp.push(pemain[i]);
      } else {
        temp.push(" ");
      }
    }
    track.push(temp);
    temp = [];
  }

  let max = 0;
  while (max < pos - 1) {
    let koor = [];
    for (let i = 0; i < track.length; i++) {
      for (let j = 0; j < track[i].length; j++) {
        if (track[i][j] !== " ") {
          koor.push(j);
        }
      }
    }

    for (let i = 0; i < koor.length; i++) {
      koor[i] = koor[i] + diceRoll();
      if (koor[i] >= pos) {
        koor[i] = pos -1
      } 
    }

    for (let i = 0; i < track.length; i++) {
      for (let j = 0; j < track[i].length; j++) {
        if (track[i][koor[i]] === " ") {
          track[i][koor[i]] = pemain[i];
        }
        if (koor[i] == pos-1){
          console.log(track);
          console.log(winner(pemain[i]));
          return track;
        }
        track[i][j] = " ";
      }
      console.log(track)
      sleep(500)
    clearScreen()
    }
    
    for (let i = 0; i < koor.length; i++) {
      if (koor[i] > max) {
        max = koor[i];
      }
    }
  }
}

function advance(player) {}

function finished(pemain) {}

function winner(pemain) {
  return `Player ${pemain} is the winner!!!`;
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
