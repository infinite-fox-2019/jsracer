"use strict"

var playerr = process.argv[2];
var poss = process.argv[3];
let daftarPemain = 'abcdefghijklmn';
let namaPemain = []
for( let i=0; i<playerr; i++){
  let player = {}
  player.nama = daftarPemain[i];
  player.pos = 0;
  namaPemain.push(player);
}
console.log(namaPemain)
function diceRoll () {
  let dice = Math.floor(Math.random() * 6)+1;
  return dice;
}

// diceRoll()

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
console.log(namaPemain)
function printBoard (namaPemaindalam) {
  let resBoard = [];
  let board = [];
  let i = 0;
  if(poss<15){
    return "Minimal papan 15 panjangnya"
  }
  // else{
  while (i < playerr) {
    for(let j=0; j<poss; j++){
      board.push('|');
      if(namaPemaindalam[i].pos === j){
        board.push(namaPemaindalam[i].nama)
      }else{
        board.push(' ');
      }
    }
    resBoard.push(board.join(' '));
    board = [];
    i+=1
  }
  // }
  return resBoard.join('\n');
}
printBoard(namaPemain);
function printLine (player, pos) {
}
// printLine()
function advance (players) {
  if(players < 2){
    return "Pemain kurang"
  }else{
    let finishdone = false;
    while(!finishdone){
      for(let i=0; i<players.length; i++){
        players[i].pos += diceRoll();
        finishdone = finished(players[i])
        clearScreen();
        console.log(printBoard(players));
        sleep(1000);
        if(finishdone===true){
          winner(players[i].nama);
          break;
        }
      }
    }
  }
}

function finished (player) {
  if(player.pos >= poss-1 ){
    player.pos = poss-1;
    return true;
  }
  return false
}

function winner (nama) {
  console.log(`pemenang adalah ${nama}`)
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}


advance(namaPemain);


