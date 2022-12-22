// Set up variables for the game
let score = 0;
let gameOver = false;
let gameBoard = document.getElementById("game-board");
let tiles = gameBoard.getElementsByClassName("tile");
let scoreCounter = document.getElementById("score-counter");

// Set up event listeners for the tiles
for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("touchstart", function() {
    handleTileSelection(this);
  });

  tiles[i].addEventListener("mousedown", function() {
    handleTileSelection(this);
  });
}

function handleTileSelection(tile) {
  // Check if the game is over
  if (gameOver) {
    return;
  }

  // Check if the clicked tile is the highlighted tile
  if (tile.classList.contains("highlighted")) {
    // Update the score and play a sound
    score++;
    scoreCounter.innerHTML = score;
    let audio = new Audio("sound.mp3");
    audio.play();

    // Remove the highlight from the tile
    tile.classList.remove("highlighted");

    // Choose a new tile to highlight
    let availableTiles = [];
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i].classList.contains("highlighted")) {
        availableTiles.push(tiles[i]);
      }
    }

    if (availableTiles.length > 0) {
      let randomTile = Math.floor(Math.random() * availableTiles.length);
      availableTiles[randomTile].classList.add("highlighted");
    }
  } else {
    // Game over!
    gameOver = true;
    alert("Game over! Your score was: " + score);
  }
}

// Set up a timer to periodically update the highlighted tile
let speed = 400; // Start with a 1 second delay
setInterval(function() {
  // Check if the game is over
  if (gameOver) {
    return;
  }

  // Check if all tiles are highlighted
  let allTilesHighlighted = true;
  for (let i = 0; i < tiles.length; i++) {
    if (!tiles[i].classList.contains("highlighted")) {
      allTilesHighlighted = false;
      break;
    }
  }

  if (allTilesHighlighted) {
    // Game over!
    gameOver = true;
    alert("Game over! Your score was: " + score);
  } else {
    // Choose a new tile to highlight
    let availableTiles = [];
    for (let i = 0; i < tiles.length; i++) {
      if (!tiles[i].classList.contains("highlighted")) {
        availableTiles.push(tiles[i]);
      }
    }

    if (availableTiles.length > 0) {
      let randomTile = Math.floor(Math.random() * availableTiles.length);
      availableTiles[randomTile].classList.add("highlighted");
    }

    // Increase the speed every 5 points
    if (score % 5 == 0 && speed > 50) {
      speed -= 50;
    }
  }
}, speed);