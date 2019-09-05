"use strict"

// console.log(process.argv);
/*
if we input "node js-racer.js 3 15" on terminal
we gonna get an array of :
[0] 1. the node's location
[1] 2. the js-racer.js file location
[2] 3. amount of player (this case 3)
[3] 4. the length of the race lines (this case 15) 

that's is how we start our game
*/

const playerAmount = process.argv[2]
const trackLength = process.argv[3]

/*
this is the function to show how many lines each player has to move
we use random number for this
every player's start position is on the first line
*/


function diceRoll () {
  //min dice is 1, max dice is 6 (we build the random number from 1 to 6)
  for (let i=0; i<playerAmount; i++) {
    player[i][1] += Math.floor(Math.random() * 6) + 1
    if (player[i][1] > trackLength-1) {
      player[i][1] = trackLength-1
      clearScreen()
      printLine()
      console.log(winner(i));
      return 'selesai'
    }
  }
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

let player = whoSPlaying(playerAmount)

function printBoard (player) {   
}

//fungsi ini hanya utk print tiap track dg nama player yang udah ready ada di start line
//jadi "siapakah player nya" diurusin di fungsi lain
//bikin dulu si nama player ada di array ke 0, length array nya sejumlah pos, diisi dg spasi, dipisah dg '|'
function printLine () {
  if (trackLength < 15) {
    return 'We need at least 15 tracks to start racing!'
  } 
  for (let j=0; j<player.length; j++) {
      let arr = []
      for (let i=0; i<trackLength; i++) {
        arr.push(' ')
      } 
      arr[player[j][1]] = player[j][0]
      console.log(`|${arr.join('|')}|`)
  }
      // console.log(arr);
}
// console.log(printLine());

//the programmer set this game for the player amount at min 2 players and max 5 players
function whoSPlaying (playerAmount) {
  const player = []
  const lib = 'ABCDE'

  if (playerAmount < 2) {
    return 'This game needs at least 2 players to start!'
  } else if (playerAmount > 5) {
    return `Maximum players is 5`
  } else {
    for (let i=0; i<playerAmount; i++) {
      player.push([])
      player[i].push(lib[i], 0)
    }
    return player
  }
}
console.log(whoSPlaying(playerAmount));

function startGame () {
  
  while (true) {
    clearScreen()
    printLine()
    sleep()
    diceRoll()
    if(diceRoll() === 'selesai') {
      return ''
    } 
  }
}
startGame();

function advance (player) {
  //for NOS & obstacle
}

function finished () {
}

function winner (i) {
  if (player[i][1] = trackLength-1) {
    return `${player[i][0]} WIN`
  } 
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
