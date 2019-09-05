"use strict"
let player = process.argv[2]
let pos = process.argv[3]*2

function diceRoll () {

  let dice = Math.floor(Math.random()*process.argv[2])
  if(dice === 0){
    dice = 1
  }
  return dice
}

// console.log(diceRoll())

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
  let output = []
  let playerName = 'ABCDEFG'

  for(let i = 0; i<player; i++){
    let temp = []
    for(let j = 0; j<=pos; j++){
      if(j === 0){
        temp.push(playerName[i] + ' ')
      }
      if(j % 2 === 0){
        // temp.push('|')
      }else{
        temp.push('  ')
      }
    }
    output.push(temp)
  }
  return output
}
// console.log(printBoard ())

////////////////////////////////////////////////////////////////////////

function printLine(player, pos) {
  let board = printBoard ()
  
  let position = 0
  let players = [] //a,b,c

  for(let i = 0; i < board.length; i++) {
    players.push(board[i][0])
  }

  while(position < board[0].length-1){
    for(let i = 0 ; i<players.length; i++){
      let playerPosition = board[i].indexOf(players[i]) 

      board[i][playerPosition] = '  '
      playerPosition += diceRoll()
        
      if(playerPosition > position) {
        position = playerPosition
      }
      
      board[i][position] = players[i]
      clearScreen()

      for(let i = 0; i<board.length;i++){
        console.log(board[i].join("|"))
      }

      if(position >= board[0].length-1){
        playerPosition = board[0].length-1
        console.log(`winner ${players[i]}`)
        break
      }
      console.log(position, board[0].length - 1)
      sleep(500)

      }
  }
    

  return board

}
printLine()

////////////////////////////////////////////////////////////////////////

function advance(player) {
  
}

////////////////////////////////////////////////////////////////////////

function finished () {

  // let update = printLine() 
  // let awal = printBoard()
  // let angka = 1
  // return angka
  // }
  
}
// finished()

function winner () {

}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}