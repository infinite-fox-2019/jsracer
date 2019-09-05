/*
    type "node jsRacer.js <Number player> <lengthTrack>"
    x = obstacle ("mundur 3 langkah jika berhenti di kotak tersebut")
    $ = obstacle ("maju 3 langkah jika berhenti di kotak tersebut")
    🔥 = kerusuhan penonton ketika pembalapnya kalah
*/

const input = process.argv.slice(2);

function sleep(milliseconds) { //.............SleepFunction
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

function clearScreen() { //........................clearScreen
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

function makingBoard(ver,hor) {
    let board = [];
    for (let i = 0;i<ver;i++) {
        let subBoard = [];
        for (let j = 0;j<hor;j++) {
            
            subBoard.push(' ')

        }//end loop j
        board.push(subBoard);
    }//end loop i
    return board
}//end function makingBoard


function diceRoll() {
    let numRandom = (Math.floor(Math.random()*6)) + 1;
    return numRandom;
}//end function

function printBoard(board) {
    let circuit = '';
    for (let i = 0;i<board.length;i++) {
        let line = ''
        for (let j = 0;j<board[i].length;j++) {
            line += '----';
            if (j == board[i].length-1) {
                circuit += `|| ${board[i][j]} `
            }else if (j == 0) {
                circuit += ` ${board[i][j]} |`
            }else {
                circuit += `  ${board[i][j]} `
            }
        }
        circuit += '\n'
        if (i != board.length-1) {
            circuit += line;
            circuit += '\n'
        }
    }
    return circuit;
}//end function printboard

function obtacesAndSuperPower (board) {

    let symbol = ['X','Y'];
    let sumSymbol = [];
    
    let sumWide = (Math.floor((board[0].length)/10))
    sumSymbol.push(sumWide);
    sumSymbol.push(sumWide);

    for (let i = 0;i<board.length;i++){
        for (let j = 0;j<symbol.length;j++) {
            let limit = (Math.floor((board[0].length)/10)) + 1
            while (limit>0) {
                let positionRandom = Math.floor(Math.random()*board[0].length)
                if (positionRandom != 0 && positionRandom != board[0].length-1) {
                    if (board[i][positionRandom] != symbol[j]) {
                        board[i][positionRandom] = symbol[j];
                        limit--
                    }
                }
            } 
        }
    }

    return board;


}//end obtaclesAndSuperPower

function raceBegin (board) {

    
    let alpha = ['🚔','🚒','🚚','🚂','🚜','🏄','🚗'];
    if (board.length > alpha.length) {
        return `There's no enough circuit for all players`
    }else {
        let playerSymbol = []
        //Put car on circuit;
        for (let i = 0;i<board.length;i++) {
            board[i][0] = alpha[i];
            playerSymbol.push(alpha[i]);
        }
        let supporter;
        let randomSupporter = Math.floor(Math.random()*playerSymbol.length);
        supporter = playerSymbol[randomSupporter];
       
        //Let's start the Race!!
        clearScreen()
        console.log(printBoard(board))
        sleep(1000);
        clearScreen()
        let endGame = false;
        let winner = '';

        while (endGame === false) {

            for (let i = 0;i<playerSymbol.length;i++) {
                let turnRandom = diceRoll();
                let start;
                for (let j = 0;j<board[i].length;j++) {
                    if (playerSymbol[i] == board[i][j]) {
                       
                        start = j
                    }
                }
                let stop = start + turnRandom;
                if (stop >= board[i].length-1) {
                    stop = board[i].length-1;

                    let limit = stop - start;


                    while (limit > 0) {
                        
                        board[i][start+1] = playerSymbol[i];
                        board[i][start] = ' '
                        start++
                        console.log(printBoard(board))
                        console.log(supporter)
                        sleep(100);
                        clearScreen()
                        limit--
                    }//end while
                    winner = `＼(o￣∇￣o)/ YEEAA!! THE WINNER IS PLAYER ${playerSymbol[i]} !!!!`

                    if (playerSymbol[i] != supporter) {

                        let limitFire = board[0].length;
                        while (limitFire > 0) {
                            
                            let xRandom = Math.floor(Math.random()*board.length);
                            let yRandom = Math.floor(Math.random()*board[0].length);
                            if (board[xRandom][yRandom] != '🔥') {
                                board[xRandom][yRandom] = '🔥';

                                console.log(printBoard(board))
                                console.log(`SUPPORTER PEMBALAP ${supporter}  MENGGILA!!!! KERUSUHAN!!!!!!`)
                                sleep(500);
                                clearScreen();
                                limitFire--
                            }
                        }
                    }

                    console.log(printBoard(board))                    
                    return winner
                }else {

                    let limit = stop - start;
                    let obtacles = false;
                    let superPower = false;
                    if (board[i][stop] == 'X') {
                        obtacles = true;
                    }
                    if (board[i][stop] == 'Y') {
                        superPower = true;
                    }
                    let saveSymbol = ''
                    while (limit > 0) { //////////////////////

                        board[i][start+1] = playerSymbol[i];
                        board[i][start] = ' '
                        start++
                        console.log(printBoard(board))
                        sleep(100);
                        clearScreen()
                        limit--
                    }//end while

                    if (obtacles == true) {
                        for (let j = 0;j<board[i].length;j++) {
                            if (board[i][j] == playerSymbol[i]) {
                                let obtaclesPoss = j - 3;

                                if (obtaclesPoss <= 0) {
                                    obtaclesPoss = 0;
                                }

                                board[i][obtaclesPoss] = playerSymbol[i];
                                board[i][j] = ' '
                                
                            }
                        }
                    }
                    if (superPower == true) {
                        let superPowerPoss;
                        for (let j = 0;j<board[i].length;j++) {
                            if (board[i][j] == playerSymbol[i]) {
                                superPowerPoss = j + 3;
                            }
                        }
                        if (superPowerPoss >= board[i].length-1) {
                            superPowerPoss = board[i].length-1
                            board[i][superPowerPoss] = playerSymbol[i];
                            board[i][j] = ' ';

                            if (playerSymbol[i] != supporter) {

                                let limitFire = 10;
                                while (limitFire > 0) {
                                    
                                    let xRandom = Math.floor(Math.random()*board.length);
                                    let yRandom = Math.floor(Math.random()*board[0].length);
                                    if (board[xRandom][yRandom] != '🔥') {
                                        board[xRandom][yRandom] = '🔥';
        
                                        console.log(printBoard(board))
                                        console.log(`SUPPORTER PEMBALAP ${supporter}  MENGGILA!!!! KERUSUHAN!!!!!!`)
                                        sleep(500);
                                        clearScreen();
                                        limitFire--
                                    }
                                }
                            }

                            winner = `＼(o￣∇￣o)/ YEEAA!! THE WINNER IS PLAYER ${playerSymbol[i]}  !!!!`
                            console.log(printBoard(board))                    
                            return winner
                        }
                    }
                }
            }//end loop i
        }//end while
    }//end else 
}//end function raceBegin


let board = makingBoard(input[0],input[1]);
let boardObtacles = obtacesAndSuperPower(board);
let raceBoard = raceBegin(boardObtacles)
console.log(raceBoard);

