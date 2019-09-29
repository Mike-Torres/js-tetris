window.addEventListener("keydown", checkKeyPress, false);

var left = document.getElementById("left").value;

function checkKeyPress(e) {
    switch (e.keyCode) {
        case 65:
            currentTetrimino.moveLeft();
            drawGameBoard();
            break;
        case 87:
            rotateCurrentTetrimino()
            break;
        case 68:
            currentTetrimino.moveRight();
            drawGameBoard();
            break;
        case 83:
            moveDownAndCheck();
            break;
        case 96:
            rotateCurrentTetrimino()
            break;
        case 32:
            moveDownAndCheck();
            break;
        case 103:
            location.reload();
            7
            break;
        case 104:
            playSound();
            break;
        case 105:
            clearInterval(gameInterval);
            tetrisMusic.pause();
            break;
        case 101:
            gameStart();
            playSound();
            break;
    }
}