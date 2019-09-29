const DEBUG = true;
const GRID_CELL_HEIGHT = 20;
const GRID_CELL_WIDTH = 20;

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
var fallenTetriminos = [];

var currentTetrimino = createSqPiece(140, 260);
var nextTetrimino = createSqPiece(205, 335);
var pieces = [
  createSPiece,
  createSqPiece,
  createLongPiece,
  createZPiece, ///fdsfdsfsdsafsfd
  createTPiece,
  createLPiece,
  createRevPiece
];
var gameScore = 0; //fsdfdsf
var level = 0;
var lines = 0;

if (DEBUG) {
  fallenTetriminos = fallenTetriminos.concat(
      createLongPiece(100, 360).getCellObjectArray()),
    currentTetrimino = createSqPiece(0, -80);
  gameStart();
}

function TetrominoCell(x, y, color) {
  this.x = x,
    this.y = y,
    this.color = color;
}

function getRandomTetrimino(x, y) {
  return pieces[Math.floor(Math.random() * (pieces.length - 1))](x, y);
}

function gameStart() {
  gameInterval = setInterval(moveCurrentTetriminoDown, 1000);
}

function gameOver() {
  var touchingTopofGameBoard = false;

  fallenTetriminos.forEach((fallenTetromino) => {
    if (fallenTetromino.y === 0) {
      touchingTopofGameBoard = true;
    }
  });
  if (touchingTopofGameBoard === true) {
    if (gameScore < 500) {
      window.alert("Try Again, your score was " + gameScore)
    } else if (gameScore >= 500) {
      window.alert("Great Job, Your score is " + gameScore)
    }
  }
}

// ----------------------Logic for Tetromino Pieces-------------
function drawPiece(piece, fillStyle, strokeStyle) {
  piece.matrices[piece.currentMatrix].forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = fillStyle;
        context.fillRect(piece.position.x + (x * 20), piece.position.y + (y * 20), 20, 20);
        context.strokeStyle = strokeStyle;
        context.stroke();
      }
    });
  });
}

function drawCell(tetrominoCell) {
  context.fillStyle = tetrominoCell.color;
  context.fillRect(tetrominoCell.x, tetrominoCell.y, GRID_CELL_WIDTH, GRID_CELL_HEIGHT);
  context.strokeStyle = 'white';
  context.stroke();
}
// -----------------------Logic for GameBoard-----------------
function drawGameBoard() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPiece(currentTetrimino, currentTetrimino.color, 'white');
  drawScoreBoard();
  fallenTetriminos.forEach(function (fallenPiece) {
    drawCell(fallenPiece);
  });
};

// ----------------------------Down Arrow---------------------------
function moveCurrentTetriminoDown() {
  currentTetrimino.moveDown();
}

  function moveDownAndCheck(){
    moveCurrentTetriminoDown();

    if(checkForTetriminoCollision()){
      restartGameInterval();
    }
  }

// ------------------------ COLLISION ----------------------------
function checkForTetriminoCollision() {
  var isColliding = false;

  var bottomHitCoordinates = currentTetrimino.getBottomHitCoordinates();
  fallenTetriminos.forEach((fallenTetromino) => {

    bottomHitCoordinates.forEach((bottomHitCoordinate) => {
      if (fallenTetromino.x === bottomHitCoordinate.x && fallenTetromino.y === bottomHitCoordinate.y || bottomHitCoordinate.y === 400) {
        isColliding = true;
      }
    });
  });
  return isColliding
}

function restartGameInterval() {
    fallenTetriminos = fallenTetriminos.concat(currentTetrimino.getCellObjectArray());
    currentTetrimino = nextTetrimino;
    currentTetrimino.position.x = 0;
    currentTetrimino.position.y = -80;
    nextTetrimino = getRandomTetrimino(205, 335);
    processCompletedRows();
    gameOver();
  }

// -------------------Clear Row/Process Row/Shift Row----------------
function clearRows(rowY) {
  fallenTetriminos.forEach((rowCell, rowIndex) => {
    if (rowCell.y == rowY) {
      fallenTetriminos.splice(rowIndex, 1);
    }
  })
}

function processCompletedRows() {
  var shiftRowsThisManyTimes = 0;
  var lowestYPosition = canvas.height - 20;

  for (var i = 0; i < canvas.height; i += GRID_CELL_HEIGHT) {
    let rowIsCompleted = isRowCompleted(i);
    if (rowIsCompleted) {
      if (lowestYPosition > i) {
        lowestYPosition = i;
      }
      shiftRowsThisManyTimes += 1;
      fallenTetriminos.forEach(() => {
        clearRows(i);
      });
    }
  }
  lines += 1 * shiftRowsThisManyTimes;
  level = lines / 10;
  gameScore += 100 * shiftRowsThisManyTimes;
  shiftFallenTetriminosDown(shiftRowsThisManyTimes, lowestYPosition)
  gameSpeedUp();
}

function shiftFallenTetriminosDown(numberOfRowsToShift, yPosition) {
  fallenTetriminos = fallenTetriminos.map((tetromino) => {
    if (tetromino.y <= yPosition) {
      tetromino.y += GRID_CELL_HEIGHT * numberOfRowsToShift;
    }
    return tetromino;
  })
};



function isRowCompleted(rowY) {
  var filledColumns = 0;

  fallenTetriminos.forEach(tetromino => {
    if (tetromino.y === rowY) {
      filledColumns += 1;
    }
  });
  return filledColumns >= 10;
}

function rotateCurrentTetrimino() {
  const currentTetriminoCopy = Object.assign({}, currentTetrimino)
  currentTetriminoCopy.rotate();

  const copyCells = currentTetriminoCopy.getCellObjectArray();

  let isOverLappingFallenPiece = false;

  fallenTetriminos.forEach(fallenPiece => {
    copyCells.forEach(copyCell => {
      if (fallenPiece.x === copyCell.x && fallenPiece.y === copyCell.y)
        isOverLappingFallenPiece = true
    })
  });

  if (currentTetriminoCopy.getFarthestLeftXIndex() >= 0 &&
    currentTetriminoCopy.getFarthestRightXIndex() < 200 &&
    isOverLappingFallenPiece === false) {
    currentTetrimino.rotate();
    drawGameBoard();
  }
}
// ----------------------------Drop Button---------------------------
function dropButton() {
  clearInterval(gameInterval);
  tetriminoIsColliding = false;

  while (tetriminoIsColliding === false) {
    moveCurrentTetriminoDown();
    tetriminoIsColliding = checkForTetriminoCollision();
  }
  restartGameInterval();

  gameInterval = setInterval(100);  
}

// ---------------------------Board Creation-------------------------
function drawGrid() {
  for (var x = 0; x < 220; x += 20) {
    for (var y = 0; y < 400; y += 20) {
      context.moveTo(x, 0);
      context.lineTo(x, 400);
      context.moveTo(0, y);
      context.lineTo(200, y);
      context.strokeStyle = 'white';
      context.stroke();
    }
  }
};
drawGrid();