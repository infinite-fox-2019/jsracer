function generateBoard(pemain, lintasan) {
  let board = []
  for (let i=0; i<pemain; i++) {
    board.push([])
    for (let j=0; j<lintasan; j++) {
      board[i].push(' ')
    }
  }
  for (let k=0; k<pemain; k++) {
    rand = posisiRandom()
    board[k][rand.j] = '*'
  }
  return board
}

function posisiRandom() {
  j = Math.ceil(Math.random()*7)
  return {j:j}
}

function start(board, jumlahPemain, calonPemain) {
  for (let j=0; j<jumlahPemain; j++) {
    board[j][0] = calonPemain[j]
  }
  return board
}
  
function main(board, calonPemain, jumlahPemain) {
  let posisiAwal
  let posisiAkhir

  for (let i=0; i<jumlahPemain; i++) {
    posisiAwal = board[i].indexOf(calonPemain[i])
    board[i][posisiAwal] = ' '
    let hasilDadu = dadu()
    posisiAkhir = posisiAwal + hasilDadu
    if (posisiAkhir > board[i].length-1) posisiAkhir = board[i].length-1
    //cek apakah dapat superpower
    if (board[i][posisiAkhir] == '*') {
      sleep(1000)
      board[i][posisiAkhir] = calonPemain[i]
      for (j=0; j<jumlahPemain; j++) {
        console.log(board[j].join('|'))
      }
      sleep(1000)
      board[i][posisiAkhir] = '*'
      board[i][board[i].length-1] = calonPemain[i]
      for (j=0; j<jumlahPemain; j++) {
        console.log(board[j].join('|'))
      }
      return `Pemenangnya adalah ${calonPemain[i]}`
    }
    board[i][posisiAkhir] = calonPemain[i]
    sleep(1000)
    for (j=0; j<jumlahPemain; j++) {
      console.log(board[j].join('|'))
    }
    //cek apakah sudah ada pemenang
    if (board[i][board[i].length-1] == calonPemain[i]) {
      return `Pemenangnya adalah ${calonPemain[i]}`
    } 
    
  }
  
  return main(board, calonPemain, jumlahPemain)
}
  
function dadu() {
  return Math.ceil(Math.random()*4)
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  return process.stdout.write('\033c');
  console.clear();
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          clearScreen();
          break;
        }
    }
}
  
function utama() {
  let pemain = process.argv[2]
  let lintasan = process.argv[3]
  if (pemain < 2 || pemain > 26 || lintasan < 15) return 'Invalid input'
  let board = generateBoard(pemain, lintasan)
  let calonPemain = 'abcdefghijklmnopqrstuvwxyz'
  let jumlahPemain = board.length
  board = start(board, jumlahPemain, calonPemain)
  for (let i=0; i<jumlahPemain; i++) {
    console.log(board[i].join('|'))
  }
  return main(board, calonPemain,jumlahPemain )
}

console.log(utama())