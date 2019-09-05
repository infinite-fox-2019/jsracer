"use strict"

let args = process.argv.splice(2);
let playerTotal = Number(args[0]);
let roadLength = Number(args[1]);
let errorMessages = [];

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

let playerPositions = [];
let obstaclePositions = [];
let superPowerPositions = [];

if(errorMessages.length > 0) {
  for(let i = 0; i < errorMessages.length; i++) {
    console.log(errorMessages[i]);
  }
} else {
  generatePlayerPositions();
  generateAdditionPositions();
  
  let finish = false;
  while(!finish) {
    for(let i = 0; i < playerTotal; i++) {
      printBoard();
      sleep(600);
      clearScreen();
      advance(i);
      if(superPowerPositions.includes(playerPositions[i])) {
        printBoard();
        sleep(600);
        clearScreen();
        advance(i);
      }
      if(obstaclePositions.includes(playerPositions[i])) {
        printBoard();
        sleep(600);
        clearScreen();
        backtrack(i);
      }
      if(finished(i)){
        finish = true;
        winner(i);
        break;
      }
    }
  }
  console.log(obstaclePositions);
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
    printLine(player, playerPositions[i]);
  }
}

function printLine (player, pos) {
  let lane = '';
  for(let i = 0; i <= roadLength; i++) {
    if(i === pos) {
      lane += `|${player}`;
    } else if(obstaclePositions.includes(i)) {
      lane += '|<';
    } else if(superPowerPositions.includes(i)) {
      lane += '|>';
    } else {
      lane += '| '
    }
  }
  console.log(lane);
  debugger;
}

function advance (player) {
  let diceNumber = diceRoll();
  playerPositions[player] += diceNumber;
  if(playerPositions[player] > roadLength) {
    playerPositions[player] = roadLength;
  }
}

function backtrack (player) {
  let diceNumber = diceRoll();
  playerPositions[player] -= diceNumber;
  if(playerPositions[player] <= 0) {
    playerPositions[player] = 0;
  }
}

function finished(player) {
  if(playerPositions[player] >= roadLength) {
    return true;
  }
  return false;
}

function winner (i) {
  printBoard();
  console.log(`Player ${String.fromCharCode(i + 97)} is the winner`);
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function generatePlayerPositions() {
  for(let i = 0; i < playerTotal; i++) {
    playerPositions.push(0);
  }
}

function generateAdditionPositions() {
  let positions = [];
  for(let i = 0; i < roadLength; i++) {
    positions[i] = i;
  }

  let additionTotal = Math.ceil(roadLength/10);
  for(let i = 0; i < additionTotal; i++) {
    let randomObstaclePosition = getRandomNumber(positions.length);
    obstaclePositions.push(positions[randomObstaclePosition]);
    positions.splice(randomObstaclePosition, 1);
  
    let randomSuperPowerPosition = getRandomNumber(positions.length);
    superPowerPositions.push(positions[randomSuperPowerPosition]);
    positions.splice(randomSuperPowerPosition, 1);
  }
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
