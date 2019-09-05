"use strict"
const names = 'abcdefghij';
const numOfplayers = parseInt(process.argv[2]);
const trackLength = parseInt(process.argv[3]);
const players = [];

function diceRoll () {
  let numberOfMoves = Math.floor((Math.random()*6)+1);
  return numberOfMoves;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printLine (player, pos) {
  const track = [];
  for(let i =0;i<trackLength;i++){
    track.push(' ');
  }
  track[pos] = player;
  console.log(track.join('|'))
}

function printBoard () {
  for(let i = 0; i < players.length; i++) {
    printLine(players[i].name, players[i].pos);
  }
}

function advance (player) {
  let moves = diceRoll();
  if(player.pos + moves >= trackLength){
    player.pos = trackLength-1;
  }
  else{
    player.pos += moves;
  }
}

function finished () {
  for(let i = 0; i < players.length; i++){
    if(players[i].pos === (trackLength-1)){
      return true;
    }
  }
  return false;
}

function winner () {
  for(let i = 0; i < players.length; i++){
    if(players[i].pos === (trackLength-1)){
      return players[i].name;
    }
  }
  return false;
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function start(){
  if(numOfplayers < 2) {
    console.log("Insufficient players, go find some friends lol");
    return '';
  } else if(numOfplayers > 10) {
    console.log("Hol'dup ain't no race with this many people :/");
    return '';
  }
  if(trackLength < 15) {
    console.log("Track length is too short, are you sure you wanna end this game that soon? Input longer track length");
    return '';
  } else {
    for(let i = 0; i < numOfplayers; i++){
      players.push({
        name: names[i],
        pos: 0
      });
    }
    let finish = false;
    clearScreen();
    while(!finish){
      for(let i = 0; i < players.length; i++){
        advance(players[i]);
        printBoard();
        sleep(500);
        clearScreen();
        finish = finished();
        if(finish){
          break;
        }
      }
    }
    console.log(`pemenangnya adalah ${winner()}`);
  }
  printBoard();
}

start();