const players = process.argv[2];
const boardLength = process.argv[3];
const cand = 'abcdefghijklmno'

let pos = []
for (let i=0; i<players; i++){
    pos.push(0);
}

function printBoard(pos) {
    if (players < 2 || players > 15){
        return 'Minimum players 2 & Maximum players 15'
    }
    else if (boardLength < 15){
        return 'Minimum track 15'
    }
    let newPos = [];
    for (let j=0; j<players; j++){
        clearScreen()
        for (let i=0; i<players; i++){
            printLine(cand[i],pos[i])
        }
        for (let i=0; i<players; i++){
            if (pos[i] >= boardLength-1){
                return `PLAYER ${cand[i]} WIN`
            }
        }
        newPos.push(pos[j] += diceRoll())
        if(pos[j] > boardLength-1){
            pos[j] = boardLength-1
        }
        sleep(500)
    }
    return printBoard(newPos)
}

function printLine(player, pos) {
    let arr = []
    for (let i=0; i<boardLength; i++){
        if(i == pos){
            arr.push(player)
        } else {
            arr.push(' ')
        }
    }
    console.log(`|${arr.join('|')}`);
}

function diceRoll (){
    return Math.ceil(Math.random()*3);;
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}


console.log(printBoard(pos));