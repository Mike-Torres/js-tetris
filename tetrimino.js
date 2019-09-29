function Tetromino(x, y, color, matrices) {
  this.position = {
    x: x || 0,
    y: y || 0
  }
  this.color = color;
  this.currentMatrix = 0;
  this.matrices = matrices;

  this.moveLeft = function () {
    if (this.getFarthestLeftXIndex() > 0) {
      this.position.x -= 20;
    }
  }

  this.moveRight = function () {
    if (this.getFarthestRightXIndex() < 180) {
      this.position.x += 20;
    }
  }

  this.moveDown = function () {
    var highestXIndex = 0;
    currentTetrimino.matrices[0].forEach((row, rowIndex) => {
      row.forEach((column) => {
        if (column === 1 && rowIndex > highestXIndex) {
          highestXIndex = rowIndex;
        }
      })
    })

    var realTimeY = currentTetrimino.position.y + (highestXIndex * 20);

    if (realTimeY < 380) {
      currentTetrimino.position.y += 20;
      drawGameBoard();
    };
  }

  this.getFarthestLeftXIndex = function () {
    var farthestLeftIndex = 3;

    this.matrices[0].forEach((row) => {
      row.forEach((column, columnIndex) => {
        if (column === 1 && columnIndex < farthestLeftIndex) {
          farthestLeftIndex = columnIndex;
        }
      })
    });

    return this.position.x + (farthestLeftIndex * 20);
  }

  this.getFarthestRightXIndex = function () {
    var farthestRightIndex = 0;

    this.matrices[0].forEach((row) => {
      row.forEach((column, columnIndex) => {
        if (column === 1 && columnIndex > farthestRightIndex) {
          farthestRightIndex = columnIndex;
        }
      })
    });

    return this.position.x + (farthestRightIndex * 20);
  }

  this.rotate = function () {
    const newArray = [];

    for (var i = 0; i < this.matrices.length; i++) {
      newArray.push(this.matrices[i]);
    }

    var shifted = newArray.shift();
    newArray.push(shifted);
    this.matrices = newArray;
  }

  this.getTopHitCoordinates = function () {
    var hitCoordinates = [];

    this.matrices[0].forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === 1) {
          hitCoordinates.push({
            x: this.position.x + (columnIndex * 20),
            y: this.position.y + (rowIndex * 20)
          });
        }
      });
    });

    return hitCoordinates;
  }

  this.getCellObjectArray = function () {
    return this.getTopHitCoordinates().map(hitCoordinate => {
      return new TetrominoCell(hitCoordinate.x, hitCoordinate.y, this.color);
    });
  }


  this.getBottomHitCoordinates = function () {
    var hitCoordinates = [];

    this.matrices[0].forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === 1) {
          hitCoordinates.push({
            x: this.position.x + (columnIndex * 20),
            y: this.position.y + (rowIndex * 20) + 20
          });
        }
      });
    });
    return hitCoordinates;
  }
}
// -----------------------Long Piece------------------------
function createLongPiece(x, y) {
  var matrices = [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ],

    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],

    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]
  ]
  return new Tetromino(x, y, 'orange', matrices);
}
// ----------------------T Piece------------------------
function createTPiece(x, y) {
  var matrices = [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0], // rotate from original -90
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 1], // rotate from original -180
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1], // rotate from original -270
      [0, 1, 0]
    ]
  ]

  return new Tetromino(x, y, 'blue', matrices);
}
// -----------------------Square Piece------------------------
function createSqPiece(x, y) {
  var matrices = [
    [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1]
    ]
  ]
  return new Tetromino(x, y, 'green', matrices);
}
// -----------------------Z Piece------------------------
function createZPiece(x, y) {
  var matrices = [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ]
  ]
  return new Tetromino(x, y, 'Cyan', matrices);
}
// -----------------------S Piece------------------------
function createSPiece(x, y) {
  var matrices = [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  ]
  return new Tetromino(x, y, 'red', matrices);
}
// -----------------------L Piece------------------------
function createLPiece(x, y) {
  var matrices = [
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
  ]
  return new Tetromino(x, y, 'yellow', matrices);
}
// -----------------------Reverse L Piece------------------------
function createRevPiece(x, y) {
  var matrices = [
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ]
  ]
  return new Tetromino(x, y, 'pink', matrices);
}