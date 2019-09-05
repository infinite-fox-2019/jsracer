"use strict"

const player = process.argv[2]
const panjangLintasan = process.argv[3]


function diceRoll () {
  return Math.floor(Math.random()*3)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

let position = []
for(let i = 0; i < player; i++){
  position.push(0)
}

function printBoard (posisi) {
  if(player < 2){
    return 'MIN PLAYER 2'
  }
  if(panjangLintasan < 15){
    return 'MIN PANJANG LINTASAN 15'
  }
  sleep(500);
  clearScreen()
  console.log(obstacle)
  console.log('----------------JS RACER------------')
  console.log('now position = ' , posisi)
  for(let i = 0; i < player; i++){
    if(posisi[i] === obstacle[i]){
      posisi[i] -= 2
    }
    if(posisi[i] >= panjangLintasan-1){
      clearScreen()
      console.log('END')
      console.log('final position = ' , posisi)
      for(let j = 0; j < posisi.length; j++){
        if(j === i)console.log(printLine(i,panjangLintasan-1,obstacle[j]))
        else console.log(printLine(j,posisi[j],obstacle[j]))
      }
      return `PLAYER ${i} WIN`
    }else console.log(printLine(i,posisi[i],obstacle[i]))
  }
  let newPosition = []
  for(let i = 0; i < posisi.length; i++){
    newPosition.push(posisi[i] + diceRoll())
  }
  return printBoard(newPosition)
}



let obstacle = []
for(let i = 0; i < player; i++){
  obstacle.push(Math.ceil(Math.random()*panjangLintasan-2))
}
function printLine (player, pos,obs) {
  let circuit = []
  for(let i = 0; i < panjangLintasan; i++){
    if(i === pos)circuit.push(player)
    else if(i === obs)circuit.push('#')
    else circuit.push('_')
  }
  return circuit.join('_')
}


console.log(printBoard(position))
// console.log(obstacle)
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


