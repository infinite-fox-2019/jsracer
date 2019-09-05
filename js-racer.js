const input = process.argv.slice(2)
const players = input[0]
const track = input[1]

const name = ['🤩', '😎', '🛴', '🚗', '🚀', '🚁', '🛵', 'A', 'B', 'C', 'D', 'E']


if (players < 2 || track < 15 || !players || !track) {
  return console.log('Sorry, the players must be minimum of 2 and the track must be minimum of 15 long');
}

function rollDice() {
  return Math.ceil(Math.random() * 6)
}

function arena(players, track) {
  let board = []

  let obstacle = [' ', 'X', ' ', ' ']
  for (let i = 0; i < players; i++) {
    let row = []
    for (let j = 0; j < track; j++) {
      if (j === 0) row.push(name[i])
      if (j === track - 1) {
        row.push(' ||')
      } else {
        row.push(obstacle[Math.floor(Math.random() * obstacle.length)])
      }
    }
    board.push(row)
  }
  return board
}

function printBoard(board) {
  let result = ''
  board.forEach(row => {
    let rowText = ''
    row.forEach(el => {
      rowText += `| ${el} `
    })
    result += `${rowText}\n`
  });

  console.log(result);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function play(arena, players, track) {

  let winner;
  let furthest = 0
  let position = []
  for (let j = 0; j < players; j++) {
    position[j] = 0
  }

  while (!winner || furthest < track - 1) {
    for (let i = 0; i < players; i++) {
      printBoard(arena)
      sleep(1000)
      console.clear()
      let symbol = arena[i][position[i]]
      arena[i][position[i]] = ' '
      let nextPos = position[i] + rollDice()

      if (arena[i][nextPos] === ' ') {
        arena[i][nextPos] = symbol
        position[i] = nextPos
      } else if (arena[i][nextPos] === 'X') { //obstacle mengembalikan player ke titik 0
        arena[i][nextPos] = symbol
        arena[i][nextPos] = ' '
        nextPos = 0
        position[i] = nextPos
        arena[i][nextPos] = symbol
      }
      console.log('current pos: ', position);
      if (furthest < nextPos) furthest = nextPos
      if (furthest >= track - 1) {
        winner = players[i]
        arena[i][position[i]] = ' '
        arena[i][track] = `${symbol} | FINISHED`
        console.clear()
        printBoard(arena)
        position[i] = track
        console.log(`The final standings are: ${position}`);
        return console.log(`The race has ended. The winner is ${symbol}`)
      }
    }
  }

}

play(arena(players, track), players, track)