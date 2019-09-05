"use strict"

const player = process.argv[2]
const lintasan = process.argv[3]

let position = []
for(let i = 0; i<player;i++){
  position.push(0)
}

function diceRoll () {
  return Math.ceil(Math.random()*3)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (player, pos) {
    let output1 = []
    for (let j = 0; j<=lintasan;j++){
      if (j == pos) {
        output1.push(player)
      }else
      output1.push(' ')
    }
    console.log('|' + output1.join('|'))
}


function printLine (player,posBaru) {
  if (player<2) console.log('Maaf Pemain Kurang') 
  else if (player>10) console.log('Maaf Pemain Melebihi Kapasitas Track')
  else if (lintasan<15) console.log('Maaf Minimal Lintasan Kurang dari 15')
  else{ 
      sleep(1000)
      clearScreen()
      for (let i = 0; i<player;i++){
        if (posBaru[i] >= lintasan-1 ) {
          clearScreen()
          for(let j = 0; j<player;j++){
            if (i == j){
              printBoard(i,lintasan-1)
            }
            else {
              printBoard(j,posBaru[j]-1)
            }
          }
          return `${i} WIN`
        } else{
            printBoard(i,posBaru[i])
          } 
      }
      var test = []
      for(let k = 0; k < posBaru.length;k++){
        test.push(posBaru[k]+diceRoll())
      }
  }
    return printLine(player,test)  
}
console.log(printLine(player,position))





function advance (player) {

}

function finished () {

}

function winner () {

}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
