"use strict"

// Data for playing game
const player = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase() // data untuk player bermain (maksimal 26 player)
const panjangLintasan = Number(process.argv[3]); // Untuk merubah panjang lintasan

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

let lintasan = jumlahLintasan(Number(process.argv[2]))

// let NO2 = [4,3]
// lintasan[0][NO2[0]] = '>'
// lintasan[0][NO2[1]] = '>'

function gotNitro(indeks){
  let NO2 = [Math.ceil(Math.random() * (Math.abs(panjangLintasan/2) - 3) + 3), Math.ceil(Math.random() * ((panjangLintasan-5) - Math.abs(panjangLintasan/2)+1) + Math.abs(panjangLintasan/2)+1)]
  for(let i = 0; i < NO2.length; i++){
    lintasan[indeks][NO2[i]] = '>'
  }
}

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
  let posisiAwal = []; // Posisi awal juga harus sama dengan jumlah lintasan yang dibuat
  for(let i = 0; i < lintasan.length; i++){
    posisiAwal.push(1);
    gotNitro(i);
  }
  
  clearScreen();
  printLine()
  sleep(2000)
  
  let selesai = false;
  while(!selesai){
    for(let i = 0; i < lintasan.length; i++){

      lintasan[i][posisiAwal[i]] = ' ';
      posisiAwal[i] += dadu();

      if(lintasan[i][posisiAwal[i]] === '>'){
        lintasan[i][posisiAwal[i]] = player[i];
        let sebelumNitro = posisiAwal[i]
        clearScreen()
        printLine()
        posisiAwal[i] += 3
        console.log(' ')
        console.log(`  ─=≡Σ((( つ•̀ω•́)つLET’S GO! ${player[i]} GOT NITRO`)
        sleep(3000)
        lintasan[i][sebelumNitro] = ' ';
      }
      
      if(posisiAwal[i] >= lintasan[i].length-1){
        lintasan[i][panjangLintasan-1] = player[i]
        selesai = true;
        clearScreen()
        printLine()
        sleep(500)
        winner(player[i])
        break;
      }
      else{
        lintasan[i][posisiAwal[i]] = player[i]
      }

      clearScreen()
      printLine()
      sleep(500)

    }
  }
}

if(process.argv[3] < 15){
  console.log('Jumlah lintasan minimal 15')
}
else if(process.argv[2] < 2){
  console.log('Jumlah player minimal 2')
}
else if(process.argv[2] > 26){
  console.log('Maaf,untuk saat ini maksimal jumlah player adalah 26')
}
else{
  play();
}