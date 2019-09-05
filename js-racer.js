"use strict"
const players = process.argv[2];
const lintasan = process.argv[3];

if (players < 2) {
    console.log('jumlah player minimal 2');
}

if (lintasan < 15) {
    console.log('jumlah Lintasan minimal 15');
}
if (players >= 2 && lintasan >= 15) {
    console.log(printBoard(lintasan));

}
function diceRoll() {
    let dice = Math.ceil(Math.random() * 3);
    return dice;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function printBoard(lintasan) {
    const player = ['🐸','🦊','🦍','🐴','🐵','🐰','🐷','🦁','🐥','🦝','🐨','🐻'];
    let lastStep = {}
    for (let i = 0; i < players; i++) {
        lastStep[player[i]] = 0;
    }
    let lintasanBoard = [];
    for (let i = 0; i < players; i++) {
        lintasanBoard.push([]);
        for (let j = 0; j < lintasan; j++) {
            lintasanBoard[i].push(' ');
        }
    }
    for (let i = 0; i < players; i++) {
        lintasanBoard[i][lastStep[player[i]]] = player[i];
    }
    arrayToString(lintasanBoard);
    while (true) {
        for (let i = 0; i < players; i++) {
            var step = diceRoll();
            arrayToString(lintasanBoard);
            lintasanBoard[i][lastStep[player[i]]] = ' ';
            lastStep[player[i]] += step;
            if (lastStep[player[i]] > lintasanBoard[i].length - 2) {
                lintasanBoard[i][lintasanBoard[i].length - 1] = player[i];
                arrayToString(lintasanBoard);
                return `${player[i]} WIN!`
            }
            lintasanBoard[i][lastStep[player[i]]] = player[i];
            if (lintasanBoard[i][lintasanBoard[i].length - 2] != ' ') {
                arrayToString(lintasanBoard);
                return `${player[i]} WIN!`
            }
        }
    }
}
function arrayToString(lintasanBoard) {
    clearScreen();
    let lintasanString = lintasanBoard.slice(0)
    for (let i = 0; i < lintasanString.length; i++) {
        lintasanString[i] = lintasanString[i].join('|')
    }
    console.log(lintasanString.join('\n'));
    sleep(100);
}

function clearScreen() {
    // Un-comment this line if you have trouble with console.clear(); return
    // process.stdout.write('\033c');
    console.clear();
}
