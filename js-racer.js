function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function diceRoll() {
    return Math.ceil(Math.random() * 4)
}

function printBoard(playerActive, pos) {
  let board = [];
  for (let i = 0; i < totalPlayer; i++) {
    let array = [];
    for (let j = 0; j < line; j++) {
      array.push('| ');
    }
    board.push(array);
  }
  for (let i = 0; i < totalPlayer; i++) {
    board[i][player[i].position[1]] = `|${player[i].name}`;
  }
  board[pos[0]][pos[1]] = `|${playerActive}`;
  for (let i = 0; i < board.length; i++) {
    console.log(board[i].join(''));
  }
}

function winner() {
  for (let i = 0; i < totalPlayer; i++) {
    if (player[i].position[1] >= line) {
      return `Player ${player[i].name} is the winner`;
    }
  }
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

let totalPlayer = Number(process.argv[2]);
let line = Number(process.argv[3]);
let player = [];
let theWinner = '';
let check = true;
if (!totalPlayer || !line) {
  check = false;
}
if (totalPlayer < 2 || line < 15) {
  check = false;
}
for (let i = 0; i < totalPlayer; i++) {
  let objPlayer = {
    name: String.fromCharCode((i+97)),
    position: [i, 0]
  };
  player.push(objPlayer);
}

while (!theWinner && check) {
  for (let i = 0; i < player.length; i++) {
    clearScreen();
    printBoard(player[i].name, player[i].position);
    sleep(500);
    player[i].position[1] += diceRoll();
    theWinner = winner();
    if (theWinner) {
      if (player[i].position[1] >= line) {
        player[i].position[1] = line-1;
      }
      clearScreen();
      printBoard(player[i].name, player[i].position);
      sleep(500);
      console.log(theWinner);
      i = player.length;
      break;
    }
  }
}

if (!check) {
  console.log('Invalid input');
}