// -------------------------------Reset-----------------------------------
document.getElementById("button1").addEventListener("click", function () {
  location.reload();
}, false);
// -------------------------------Sound-----------------------------------
document.getElementById("button2").addEventListener("click", function() {
  playSound();
});
// -------------------------------Pause-----------------------------------
document.getElementById("button3").addEventListener("click", function() {
  document.getElementById("pause").innerHTML = "PAUSE";
  clearInterval(gameInterval);
  tetrisMusic.pause();
});
// -------------------------------Start-----------------------------------
document.getElementById("buttonstart").addEventListener("click", function() {
  gameStart();
  playSound();
  document.getElementById("pause").innerHTML = "";
});
// -----------------------------Rotation-----------------------------------
document.getElementById("button4").addEventListener("click", function() {
  rotateCurrentTetrimino();
});
// -------------------------------Drop------------------------------------
document.getElementById("button5").addEventListener("click", function() {
  dropButton(); 
});
// --------------------------------Up-------------------------------------
document.getElementById("up").addEventListener("click", function() {
  rotateCurrentTetrimino()
});
// -------------------------------Right------------------------------------
document.getElementById("left-right").addEventListener("click", function() {
  currentTetrimino.moveRight();
  drawGameBoard();
});
// -------------------------------Left-------------------------------------
document.getElementById("left").addEventListener("click", function() {
  currentTetrimino.moveLeft();
  drawGameBoard();
});
// ------------------------------Down--------------------------------------
document.getElementById("down").addEventListener("click", function() {
  moveDownAndCheck();
});