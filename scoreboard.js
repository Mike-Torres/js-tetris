function drawScoreBoard() {
    drawScore();
    drawLines();
    drawLevel();
    drawNextPiece();
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "20px fantasy";
    context.fillText(gameScore, 230, 65);
};

function drawLevel() {
    context.fillStyle = "white";
    context.font = " 20px fantasy";
    context.fillText(level, 230, 165);
};

function drawLines() {
    context.fillStyle = "white";
    context.font = "20px fantasy";
    context.fillText(lines, 230, 265);
};

function drawNextPiece() {
    context.fillStyle = "white";
    context.font = "20px fantasy";
    drawPiece(nextTetrimino, nextTetrimino.color, 'white');
};