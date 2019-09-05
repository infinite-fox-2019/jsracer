"use strict"

const player = Number(process.argv[2])
const board = Number(process.argv[3])
let pemain = buatPemain()


function buatPemain(){
  let nama = 'abcdefghij'
  let result = []
  for(let i = 0; i < player; i++){
    result.push([])
    result[result.length-1].push(nama[i])
    result[result.length-1].push(0)
  }
  return result
}

function main(){
  if(player < 2){
    return 'Player Kurang'
  } else if( board < 15){
    return 'Lintasan Kurang'
  } else {
    let pemainke = 0
    while (true){
      clearScreen()
      printLine()
      diceRoll(pemainke)
      sleep()
      clearScreen()
      if( winner() != undefined){
        clearScreen()
        return winner()
      }

      if(pemainke == player-1){
        pemainke = 0
      } else {
        pemainke++
      }
    }
  }
}

function diceRoll(a){
  pemain[a][1] += Math.ceil(Math.random()*6)
  if(pemain[a][1] > board-1){
    pemain[a][1] = board-1
  }
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
  let hasil = []
  for(let i = 0; i < player; i++){
    hasil.push([])
    for(let j = 0; j < board; j++){
      if(pemain[i][1] == j){
        hasil[hasil.length-1].push(pemain[i][0])
      } else {
        hasil[hasil.length-1].push(' ')
      }
    }
  }
  return hasil
}

function printLine () {
  let hasil = printBoard()
  for(let i = 0; i < player; i++){
    console.log(`| ${hasil[i].join('|')}`);
  }
}

function advance (player) {
  
}

function finished () {
  for(let i = 0; i < player; i++){
    if(pemain[i][1] == board-1){
      return 'pemain ' + pemain[i][0] + ' menang'
    }
  }
}

function winner () {
  if(finished() != undefined){
    printLine()
    return finished()
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


console.log(main());

