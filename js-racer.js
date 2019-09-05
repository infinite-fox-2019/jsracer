"use strict"

function diceRoll () {
  return Math.floor(Math.random() * 6) + 1
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
  let numPlayer = Number(process.argv[2])
  let numDistance = Number(process.argv[3])
  let playerChar = 'abcdefghijklmnopqrstuvwxyz'
  let track = []
  for(let i=0 ; i<numPlayer ; i++){
    let penampung = []
    for(let j=0 ; j<numDistance ; j++){
      if(j==0){
        penampung.push(playerChar[i])
      } else {
        penampung.push(' ')
      }
    }
    track.push(penampung)
  }

  var checkWin = false
  var count = 0
  var playerWin = ''

  while(checkWin ==false ){
    for(let i=0 ; i<track.length ; i++){
      for(let j=0 ; j<track[i].length ; j++){
        if(track[i][j] == playerChar[i] && j+diceRoll() < 9 ){
          track[i][j+diceRoll()] = playerChar[i]
          track[i][j] = ' '
          break
        } else if(track[i][j] == playerChar[i] && j+diceRoll() >=9){
          track[i][numDistance-1] = playerChar[i]
          track[i][j] = ' '
          checkWin = true
          playerWin += playerChar[i]
          break
        }
      }
    }
  }

  return playerWin
  // while(checkWin == false){
  // }
    // Looping semua player
      // Gerakan si player tersebut sesuai denga dice yang didapatkan ranom
        // Setiap kali kita gerak kita ngecek apakah ada player yang sudah mencapai goalnya
}

console.log(printBoard())

function advance () {

}

function printLine (player, pos) {

}


function finished () {
  // let advanceArr = advance(player).split(' ')
  // if(advanceArr[advanceArr.length-1] !== ''){
  //   return true
  // }
}

function winner () {
  // if(finished() == true){
  //   return
  // }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


























