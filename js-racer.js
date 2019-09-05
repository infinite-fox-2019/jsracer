"use strict"

// Data for playing game
let player = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase() // data untuk player bermain (maksimal 26 player)
let panjangLintasan = Number(process.argv[2]); // Untuk merubah panjang lintasan

function dadu () {
  return Math.ceil(Math.random()*4)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// function untuk printLine
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

let lintasan = jumlahLintasan(Number(process.argv[3]))

function printLine () {
  for(let i = 0; i < lintasan.length; i++){
    console.log(lintasan[i].join(' |'))
  }
}

function winner (player) {
  console.log(` `)
  console.log(`  ヾ(＠^∇^＠)ノ PLAYER "${player}" WIN`)
  console.log(` `)
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function play () {
  printLine()
  sleep(1500)

  let posisiAwal = []; // Posisi awal juga harus sama dengan jumlah lintasan yang dibuat
  for(let i = 0; i < lintasan.length; i++){
    posisiAwal.push(1);
  }
  
  let selesai = false;
  while(!selesai){
    for(let i = 0; i < lintasan.length; i++){

      lintasan[i][posisiAwal[i]] = ' ';
      posisiAwal[i] += dadu();
      
      if(posisiAwal[i] >= lintasan[i].length-1){
        lintasan[i][panjangLintasan-1] = player[i]
        selesai = true;
        clearScreen()
        printLine()
        sleep(1000)
        winner(player[i])
        break;
      }
      else{
        lintasan[i][posisiAwal[i]] = player[i]
      }

      clearScreen()
      printLine()
      sleep(1000)

    }
  }
}

if(process.argv[2] < 15){
  console.log('Jumlah lintasan minimal 15')
}
else if(process.argv[3] < 2){
  console.log('Jumlah player minimal 2')
}
else if(process.argv[3] > 26){
  console.log('Maaf,untuk saat ini maksimal jumlah player adalah 26')
}
else{
  play();
}