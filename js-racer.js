"use strict"
const arr_player = []
const name_player = 'abcdefghi'

let number_of_players = process.argv[2]
let track_distance = Number(process.argv[3])

for (let i = 0; i < number_of_players ; i++) {
  let info_player = {
    name: name_player[i],
    position: 0
  }

  arr_player.push(info_player)
}

function generateTrack() {
  let board = []
  let distance = Number(process.argv[3]*2)
  for (let i = 0; i < distance; i++) {
    board.push([])
    if (i % 2 === 0) {
      board[i].push(' ')
    } else {
      board[i].push('|')
    }
  
  }

  // for (let i = 0; i < player; i++) {
  //   board[i][0] = arr_player[i]
  // }

  return board

}

function diceRoll () {
  var random = Math.floor((Math.random()*6)+1)

  return random

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
  for (let i = 0; i < arr_player.length; i++) {
    console.log(printLine(arr_player[i]));
  }
}

function printLine (player) {

  let player_position = 0;

  if (player.position % 2 === 1) {
    player_position = ((player.position+1)*2)-2
  } else if (player.position % 2 === 0 && player.position !==0) {
    player_position = player.position*2
  }

  let arr_track = generateTrack();
  arr_track.splice(player_position, 1, player.name)

  let track = ''
  for (let i = 0; i < arr_track.length; i++) {
    track = track + arr_track[i]
  }
  
  return track
}

function advance (player) {
  let start_position = player.position;
  let gas = diceRoll();

  player.position = start_position + gas

  return player.position
}


function finished () {
  let response = false;

  for (let i = 0; i < arr_player.length; i++) {
    if (arr_player[i].position >= track_distance) {
      response = true;
      break;
    }
  }

  return response;
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function runGame() {
  clearScreen();
  printBoard();
  sleep(500);

  while(finished() === false) {
    debugger
    for (var i = 0; i < arr_player.length; i++) {
      arr_player[i].position = advance(arr_player[i])

      if (arr_player[i].position >= track_distance) {
        var winner = arr_player[i];
        clearScreen();
        printBoard();
        sleep(500);
        break;

      } else {
        clearScreen();
        printBoard();
        sleep(500);
      }
    }
  }

  console.log('The winner is ', winner.name);
  
}

runGame();



// console.log(printBoard());
// console.log(generateTrack().join(''));
// console.log(diceRoll());
// console.log(printLine({name: 'a', position: 0}));




