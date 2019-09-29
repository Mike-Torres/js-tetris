function gameSpeedUp() {
    if (level === 1) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 980);
    } else if (level === 2) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 960);
    } else if (level === 3) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 940);
    } else if (level === 4) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 920);
    } else if (level === 5) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 900);
    } else if (level === 6) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 880);
    } else if (level === 7) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 860);
    } else if (level === 8) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 840);
    } else if (level === 9) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 820);
    } else if (level === 10) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 800);
    } else if (level > 10) {
        gameInterval = setInterval(moveCurrentTetriminoDown, 700);
    }
}