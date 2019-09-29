// -------------------------------Rotation Sound------------------------------------
let music = new Audio();
music.src = 'rotation.mp3';

// ------------------------------Background Music-----------------------------------
let tetrisMusic = new Audio();
tetrisMusic.src = 'music.mp3';

// -----------------------------Sound on/Sound Off----------------------------------
function playSound() {
  if (tetrisMusic.paused !== true) {
    tetrisMusic.pause();
  } else {
    tetrisMusic.play();
  }
};
