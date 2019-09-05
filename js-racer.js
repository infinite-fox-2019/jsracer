"use strict"
var player = process.argv[2];
var track = process.argv[3];
if(player<2){
  return "Tidak cukup pemain, silahkan ajak teman anda";
}
if (track<15){
  return "Ini bukan jalanan tamiya, silahkan dipanjangin lagi";
}
function diceRoll () {
  let dice = Math.round(Math.random()*5+1);
  return dice;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (player,track) {
  let arr = [];
  for (let i = 0; i<player;i++){
      arr.push([]);
      for(let j = 0; j < track*2; j++){
          if(j%2 == 0){
              arr[i].push("|");
          } else if (j == 1){
              for(let k = 0; k<1;k++){
                  arr[i].push(String.fromCharCode(97+i));
              }
          } else {
              arr[i].push(" ");
          }
      }
  }
  return arr;
}

function printLine (player) {
  let arr = printBoard(player,track);
  let arrLen = arr.length;
  let arrNumber = [];
  let temp = [];
  let nama = [];
  let pemenang = "";
  for(let i = 0;i<arrLen;i++){
    console.log(arr[i].join(""));
    arrNumber.push(1);
    temp.push(" ");
    nama.push(String.fromCharCode(97+i));
  }
  sleep(1000)
  while (arr[0][arr[0].length-1]==" "){
    for(let i = 0;i<arrLen;i++){
      clearScreen()
      for(let j = 0;j<arr[i].length;j++){
        debugger
        temp[i] = arr[i][arrNumber[i]];
        // console.log(temp);
        arr[i][arrNumber[i]] = " ";
        let test = diceRoll();
        arrNumber[i] += test;
        // console.log(k)
        debugger
        if ((arrNumber[i])%2 == 0 ){
          arrNumber[i]+=1;
        } else if (arrNumber[i]>=arr[i].length-2){
          arrNumber[i]-=test;
          arrNumber+=1;
        }
        arr[i][arrNumber[i]] = temp[i];
        clearScreen();
        console.log(arrNumber);
        for(let k = 0;k<arr.length;k++){
          console.log(arr[k].join(""));
        }
        sleep(1000);
        if (arrNumber[i]==arr[i].length-1){
          debugger
          return `Selamat ${arr[i][arrNumber[i]]} adalah pemenangnya !!!`
        }
        break;     
      }  
    }
  }
}

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

// console.log(printBoard(2,15));
console.log(printLine(player));