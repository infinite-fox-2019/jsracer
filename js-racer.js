"use strict"
const listOfPlayers = 'abcdefghijklmnopqrstuvwxyz'
const numOfPlayers = Number(process.argv[2])
const roadLength = Number(process.argv[3])
const players = []

function diceRoll () {
  let randomDicer = Math.floor((Math.random() * 6) + 1)
  return randomDicer
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printLine (player, position) {
  const lane = []
  for(let i = 0; i < roadLength; i++){
    lane.push(' ')
  }
  lane[position] = player
  console.log(lane.join('|'))
}

function printBoard () {
  for(let i = 0; i < players.length; i++) {
    printLine(players[i].name, players[i].position)
  }
}

function advance (player) {
  let advancement = diceRoll()
  if(player.position + advancement >= roadLength){
    player.position = roadLength - 1
  }
  else{
    player.position += advancement
  }
}

function finished () {
  for(let i = 0; i < players.length; i++){
    if(players[i].position === (roadLength - 1)){
      return true
    }
  }
  return false
}

function winner () {
  for(let i = 0; i < players.length; i++){
    if(players[i].position === (roadLength - 1)){
      return players[i].name
    }
  }
  return false
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function startRacer(){
  if(numOfPlayers < 2) {
    return "Why so lonely, get some more players!"
  }
  if(roadLength < 15) {
    return "Are you sure you wanna race this quick?!"
  }
    for(let i = 0; i < numOfPlayers; i++){
      players.push({
        name: listOfPlayers[i],
        position: 0
      })
    }
    let isFinished = false
    clearScreen()
    while(!isFinished){
      for(let i = 0; i < players.length; i++){
        advance(players[i])
        printBoard()
        sleep(500)
        clearScreen()
        isFinished = finished()
        if(isFinished){
          break
        }
      }
    }
    printBoard()
    return `Congratulations! ${winner()} won the game!!`
}

console.log(startRacer())