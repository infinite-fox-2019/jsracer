"use strict"

let args = process.argv.splice(2);
let playerTotal = Number(args[0]);
let roadLength = Number(args[1]);
let errorMessages = [];
let positions = [];

if(!playerTotal) {
  errorMessages.push('Jumlah pemain harus diisi!');
} else if(playerTotal < 2) {
  errorMessages.push('Jumlah pemain minimal 2!');
}

if(!roadLength) {
  errorMessages.push('Jumlah panjang lintasan harus diisi!');
} else if(roadLength < 10) {
  errorMessages.push('Jumlah panjang lintasan minimal 15!');
}

if(errorMessages.length > 0) {
  for(let i = 0; i < errorMessages.length; i++) {
    console.log(errorMessages[i]);
  }
} else {
  for(let i = 0; i < playerTotal; i++) {
    positions.push(0);
  }
  let finish = false;
  while(!finish) {
    for(let i = 0; i < playerTotal; i++) {
      printBoard();
      advance(i);
      sleep(300);
      clearScreen();
      if(finished(i)){
        finish = true;
        printBoard();
        console.log(winner(i));
        break;
      }
    }
  }
}
function diceRoll () {
  return Math.floor(Math.random() * Math.floor(5) + 1);
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  for(let i = 0; i < playerTotal; i++) {
    let player = String.fromCharCode(i + 97)
    printLine(player, positions[i]);
  }
}

function printLine (player, pos) {
  let lane = '';
  for(let i = 0; i <= roadLength; i++) {
    lane += `|${i !== pos ? ' ' : player}`;
  }
  console.log(lane);
  debugger;
}

function advance (player) {
  let diceNumber = diceRoll();
  positions[player] += diceNumber;
  if(positions[player] > roadLength) {
    positions[player] = roadLength;
  }
}

function finished(player) {
  if(positions[player] >= roadLength) {
    return true;
  }
  return false;
}

function winner (i) {
  return `Player ${String.fromCharCode(i + 97)} is the winner`;
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
