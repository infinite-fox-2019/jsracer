"use strict"

let jumlahPlayer = parseInt(process.argv[2]);
let besarBoard = parseInt(process.argv[3]);
let objBoard = {}
let objBoardWithPlayer = printLine()
let lokasiPlayer = playerLocator(jumlahPlayer);
let player = generatePlayer(jumlahPlayer);

function diceRoll () {
  let dice = Math.ceil(Math.random() * 6);
  return dice;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function generatePlayer(num){
  let daftarPlayers = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  let players = []
  for(let i = 0; i<num; i++){
    players.push(daftarPlayers[i])
  }
  return players;
}

function playerLocator(num) {
  let lokasi = [];
  for(let i = 0; i<num; i++){
    lokasi.push(1)
  }
  return lokasi;
}

function printBoard (player) {
  let board = ['|', player];
  let countBintang = 0;
  let limitBintang = 3;
  let space = 0;
  if(besarBoard >30){
    limitBintang = 5
  }
  for(let i = 0; i<besarBoard; i++){
    let random = Math.floor(Math.random() * 6);
    if(random == 1 && countBintang<limitBintang && space <= 0){
      board.push('|','*')
      countBintang++
      space = 2;
    }
    else{
      board.push('|',' ');
      space--
    }
  }
  return board;
}

function printLine () {
  for(let i = 0; i<jumlahPlayer; i++){
    objBoard[generatePlayer(jumlahPlayer)[i]] = printBoard(generatePlayer(jumlahPlayer)[i]);
  }
  return objBoard;
}
function awalRace(obj) {
  for(let i = 0; i<jumlahPlayer; i++){
    console.log(obj[generatePlayer(jumlahPlayer)[i]].join(''));
  }
}

function mover(obj, i) {
    let randomize = diceRoll() * 2;
    
    obj[generatePlayer(jumlahPlayer)[i]][lokasiPlayer[i]] = ' ';
    lokasiPlayer[i] += randomize;
    if(obj[generatePlayer(jumlahPlayer)[i]][lokasiPlayer[i]] == '*'){
      obj[generatePlayer(jumlahPlayer)[i]][lokasiPlayer[i]] = ' ';
      lokasiPlayer[i] += 12;
    }
    if(lokasiPlayer[i] > obj[player[i]].length -1){
      obj[generatePlayer(jumlahPlayer)[i]][obj[player[i]].length -1] = player[i]  
    }
    else{
      obj[generatePlayer(jumlahPlayer)[i]][lokasiPlayer[i]] = player[i]
    }
    
  objBoardWithPlayer = obj;
  return objBoardWithPlayer;
}

function finished () {
  for(let i = 0; i<jumlahPlayer; i++){
    if(lokasiPlayer[i] >= besarBoard * 2){
      return true;
    }
  }
  return false;
}



function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function start() {
  
  awalRace(objBoardWithPlayer)
  let selesai = finished();
  
  while(!selesai){
    for(let i = 0; i<jumlahPlayer; i++){
      sleep(500)
      clearScreen();
      mover(objBoardWithPlayer, i);
      console.log(player[i], (lokasiPlayer[i]+1)/2);
      for(let key in objBoardWithPlayer){
        selesai = finished()
        if(selesai){
          for(let i = 0; i<jumlahPlayer; i++){
            console.log(objBoardWithPlayer[generatePlayer(jumlahPlayer)[i]].join(''));
          }
          console.log(`Player ${player[i].toUpperCase()} adalah pemenangnya`);
          
          return;
        }
        console.log(objBoardWithPlayer[key].join(''));
      }
    }
  }
}

if(jumlahPlayer<2){
  console.log('Jumlah player kurang');
}
else if(jumlahPlayer>26){
  console.log('Jumlah player terlalu banyak');
}
else if(besarBoard<15){
  console.log('Lintasan terlalu pendek');
}
else if(besarBoard>50){
  console.log('Lintasan terlalu panjang');
}
else{
  start()
}