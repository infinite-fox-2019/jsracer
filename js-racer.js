"use strict"

function diceRoll () {
  const dice = Math.ceil(Math.random()*6+1)
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

let player = 'abcdefghijklmnopqrstuvwxyz'
let panjangLintasan = Number(process.argv[3]); // Untuk merubah panjang lintasan
let jumlahPlayer = Number(process.argv[2])
function jumlahLintasan(num){
    let lintasan = [];
    for(let i = 0; i < num; i++){
        lintasan.push([]);
        for(let j = 0; j < panjangLintasan; j++){
            lintasan[i].push(' ');
        }
    lintasan[i][1] = player[i] // Untuk menentukan player siapa yang akan bermain
    }
    return lintasan;
}

let lintasan = jumlahLintasan(Number(process.argv[2])) // Jumlah lintasan yang dibuat akan menentukan banyak player yang akan bermain

let posisiAwal = []; // Posisi awal juga harus sama dengan jumlah lintasan yang dibuat
for(let i = 0; i < lintasan.length; i++){
    posisiAwal.push(1);
}

// Player siap siap di start
if (panjangLintasan < 15 || jumlahPlayer < 2) {
  console.log('input salah');

} else {
  clearScreen()
  for(let i = 0; i < lintasan.length; i++){
    console.log(lintasan[i].join(' |'))
  }
  sleep(1000)

  let selesai = false;
  while(!selesai){
    for(let i = 0; i < lintasan.length; i++){
        lintasan[i][posisiAwal[i]] = ' ';
        posisiAwal[i] += diceRoll();
        
    if(posisiAwal[i] >= lintasan[i].length-1){
        lintasan[i][panjangLintasan-1] = player[i]
        selesai = true;
        clearScreen()
        for(let i = 0; i < lintasan.length; i++){
          console.log(lintasan[i].join(' |'))
        }
        console.log(`pemenangnya adalah ${player[i]}`)
        sleep(1000)
        break;
    }
    else{
        lintasan[i][posisiAwal[i]] = player[i]
    }
    clearScreen()
    for(let i = 0; i < lintasan.length; i++){
        console.log(lintasan[i].join(' |'))
    }
    sleep(1000)
    console.log(' ')
    }
  }
}
// function printBoard1(player,jalur) {
// }
// function printLine (player, pos) {
// }
// function advance(player) {
// }
// function finished (array) {
// }
// function positionPlayer1(player) {
// }

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}