function generateBoard(pemain, lintasan) {
  let board = []
  for (let i=0; i<pemain; i++) {
    board.push([])
    for (let j=0; j<lintasan; j++) {
      board[i].push(' ')
    }
  }
  return board
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
  return Math.ceil(Math.random()*3)
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