const names = 'abcdefghij'
const players = parseInt(process.argv[2]);
const tracks = parseInt(process.argv[3]);

function diceRoll () {
  let numberOfMoves = Math.floor((Math.random()*6)+1);
//   console.log(numberOfMoves);
  return numberOfMoves;
}
diceRoll();

function printBoard () {
    let currentPlayers = players;
    let trackLength = tracks;
    
    if(currentPlayers < 2) {
      console.log("Insufficient players, go find some friends lol");
      return '';
    }
    if(trackLength < 15) {
      console.log("Track length is too short, are you sure you wanna end this game that soon? Input longer track length");
      return '';
    }
  
    let printTrack = [];
    for(let i = 0; i < currentPlayers; i++) {
      printTrack.push(printLine(names[i],tracks));
    }
    // console.log(printTrack);
    return printTrack;
}
printBoard();
  
function printLine (player, tracks) {
    let line = `${player}|`;
    
    for(let i = 0; i < tracks-1; i++) {
      line += ' |';
    }
    // console.log(line);
    return line;
}
printLine();