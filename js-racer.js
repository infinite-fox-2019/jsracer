"use strict"

const player = process.argv[2]

const board = process.argv[3]

let pemain = buatpemain()

let hasil = []

let adv = advance ()

function buatpemain (){
    let kamus = 'abcdefghijklmnopqrstuvwxyz'
    let arr = []
    for(let i = 0 ; i<player ; i++){
        arr.push([])
        arr[arr.length-1].push(kamus[i])
        arr[arr.length-1].push(0)
    }
    return arr
}

function main (){
    if (player < 2){
        console.log("Player Kurang");
        return ''
    }
    else if (board < 15){
      console.log("Panjang Lintasan Kurang");
      return ''
    }
    let pemainke = 0
    while(true){
        printBoard()
        printLine()
        if (finished() != undefined){
            return ''
        }
        sleep()
        clearScreen()
        diceRoll(pemainke)
        if (pemainke == player-1){
            pemainke = 0
        }
        else{
            pemainke++
        }
    }
}

function diceRoll (i) {
    if(pemain[i][1] == adv[1]){
        pemain[i][1] += Math.ceil(Math.random() * 3) * 2
    }
    else if(pemain[i][1] == adv[0]){
        pemain[i][1] -= 2
    }
    else{
        pemain[i][1] += Math.ceil(Math.random() * 3)
    }
    if(pemain[i][1] > board-1){
        pemain[i][1] = board-1
    }
    else if(pemain[i][1] < 0){
        pemain[i][1] = 0
    }
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e6; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard () {
    hasil = []
    for(let i = 0 ; i<player ; i++){
        hasil.push([])
        for(let j = 0 ; j<board ; j++){
            if (pemain[i][1] == j){
                hasil[hasil.length-1].push(pemain[i][0])
            }
            else if(adv[0] == j){
                hasil[hasil.length-1].push("#")
            }
            else if(adv[1] == j){
                hasil[hasil.length-1].push("*")
            }
            else{
                hasil[hasil.length-1].push(" ")
            }
        }
    }
}

function printLine () {
    for(let i = 0 ; i<player ; i++){
        console.log("|" + hasil[i].join("|"))
    }
}

function advance () {
    let arr = []
    let trap = Math.ceil(Math.random() * Math.floor(board-3))
    while(true){
        let nos = Math.ceil(Math.random() * Math.floor(board-3))
        if(trap != nos){
            arr.push(trap)
            arr.push(nos)
            break
        }
    }
    return arr
}

function finished () {
    for(let k = 0 ; k<player ; k++){
        if (pemain[k][1] == board-1){
            winner(k)
            return ''
        }
    }
}

function winner (k) {
    console.log(pemain[k][[0]] + " WIN");
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

main(); // masukkan: jumlah pemain, panjang jalur // * adalah nos (dikali 2) // # adalah pisang (mundur 2)