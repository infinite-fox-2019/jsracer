"use strict"
let pemain = process.argv[2]
let board = process.argv[3]
let kamus = 'abcdefghijklmnopqrstuvwxyz'
let pemainArr = []
for(let i=0; i<pemain; i++){
  let obj = {}
  obj.name = kamus[i]
  obj.position = 1
  pemainArr.push(obj)
}

function diceRoll () {
  let dice = Math.floor(Math.random()*6)+1
  return dice
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (arrObj) {
  let l = 0
  let tampung = []
  let result = []
  if(board < 15){
    return 'Minimal lintasan adalah 15'
  }
  while(l < pemain){
    for(let i=0; i<board; i++){
      tampung.push('|')
      if(arrObj[l].position === i){
        tampung.push(arrObj[l].name) 
      }else{
        tampung.push(' ')
      }
    }
    result.push(tampung.join(''))
    tampung = []
    l+=1
  }
  return result.join('\n')
}

function printLine (player, pos) {
}

function advance (players) {
  if(players.length<2){
    return 'jumlah minimal adalah 2'
  }
  let isFinished = false
  while(!isFinished){
    for(let i=0; i<players.length; i++){
      players[i].position += diceRoll()
      isFinished = finished(players[i])
      clearScreen()
      console.log(printBoard(players))
      sleep(1000)
      if(isFinished===true){
        winner(players[i].name)
        break
      }
    }
  }
}

function finished (player) {
  if(player.position >= board-1){
    player.position = board-1
    return true
  }
  return false
}

function winner (win) {
  console.log(`And The Winner is....${win}`)
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

console.log(advance(pemainArr))