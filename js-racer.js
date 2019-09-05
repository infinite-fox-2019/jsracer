"use strict"

function objPosition(playerCount){
  let arrObj = []
  let playerName = "ABCDEFGHIJKLMNOPQRSUVWXYZ"
  for(let i=0; i<playerCount; i++){
      let obj = {}
      obj.name = playerName[i]
      obj.position = 0
      arrObj.push(obj)
  }
  return arrObj
}

//function diceRoll () {
//
//}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//function printBoard () {
//
//}

function printLine (players, jalur) {
  let track = []
  for(let i=0; i<players.length; i++){
      let jalan=[]
      for(let j=0; j<jalur; j++){
          let line="| |"
           if(j===players[i].position){
               line="|"+players[i].name+"|"
           }
          jalan.push(line)
      }
      track.push(jalan.join(""))
  }
  return track
}


function advance (player, jalur) {
  if(process.argv[2]<2 || process.argv[3]<15){
    return "invalid input"
  }
  let players = objPosition(player)
  let isWin = false
  while(!isWin){
      for(let i in players){
          let result = ""
          let dadu = Math.floor(Math.random()*5)+1 
          players[i].position+=dadu
          let track = printLine(players, jalur)
          clearScreen()
          console.log(track)
          sleep(500)
          if(players[i].position>=jalur){
              isWin=true
              return `${players[i].name} WIN!`
          }

      }
  }
  
}

console.log(advance(process.argv[2], process.argv[3]))

//function finished () {
//
//}
//
//function winner () {
//
//}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}