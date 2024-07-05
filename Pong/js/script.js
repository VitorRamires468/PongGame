let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let scorePlayer1 = document.querySelector(".score-player1 > span");
let scorePlayer2 = document.querySelector(".score-player2 > span");

let gameOver = document.querySelector(".game-over");
let winner = document.querySelector("h3");

const Player1 = { x: 40, y: 110 };
const Player2 = { x: 440, y: 110 };
const ball = { x: 250, y: 140 };

let directionPlayer1, directionPlayer2;
let sizeMovement = 2;
let sizeBallMovement = 2;
const drawPlayers = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(Player1.x, Player1.y, 10, 70);
  ctx.fillRect(Player2.x, Player2.y, 10, 70);
};

const drawBall = () => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(ball.x, ball.y, 10, 10);
};

const ballMovement = (x = 5, y = 0) => {
  ball.x += x;
  ball.y -= y;
};

let x,
  y,
  score1 = 0,
  score2 = 0;
const ballColision = () => {
  const player1ColisonX = Player1.x === ball.x - 10;
  const player2ColisonX = Player2.x === ball.x + 10;
  if (player1ColisonX) {
    if (ball.y >= Player1.y && ball.y <= Player1.y + 70) {
      typeColision = 1;
      x = sizeBallMovement;
      if (ball.y <= Player1.y + 20) {
        y = sizeBallMovement;
      } else if (ball.y >= Player1.y + 40) {
        y = -sizeBallMovement;
      } else {
        y = 0;
      }
    }
  } else if (player2ColisonX) {
    if (ball.y >= Player2.y && ball.y <= Player2.y + 70) {
      typeColision = 2;
      x = -sizeBallMovement;
      if (ball.y <= Player2.y + 20) {
        y = sizeBallMovement;
      } else if (ball.y >= Player2.y + 40) {
        y = -sizeBallMovement;
      } else {
        y = 0;
      }
    }
  } else if (ball.y === 0) {
    y = -sizeBallMovement;
  } else if (ball.y === 290) {
    y = sizeBallMovement;
  } else if (ball.x === -10) {
    score1 += 10;
    scorePlayer2.innerHTML = `${score1}`;
    resetGame();
  } else if (ball.x === 510) {
    score2 += 10;
    scorePlayer1.innerHTML = `${score2}`;
    resetGame(-5);
  }

  if (score2 === 50 || score1 === 50) {
    resetGame(0);
    restartGame();
  }
};

const movePlayer1 = () => {
  if (!directionPlayer1) return;
  if (directionPlayer1 === "up" && Player1.y > 0) {
    Player1.y -= sizeMovement;
  } else if (directionPlayer1 === "down" && Player1.y < 230) {
    Player1.y += sizeMovement;
  }
};

const movePlayer2 = () => {
  if (!directionPlayer2) return;
  console.log(Player2.y);
  if (directionPlayer2 === "up" && Player2.y > 0) {
    Player2.y -= sizeMovement;
  } else if (directionPlayer2 === "down" && Player2.y < 230) {
    Player2.y += sizeMovement;
  }
};

const resetGame = (ballwinner) => {
  ball.x = 250;
  ball.y = 140;
  Player1.x = 40;
  Player1.y = 110;
  Player2.x = 440;
  Player2.y = 110;
  x = ballwinner;
  y = 0;
};

const restartGame = () => {
  if (score1 === 50) {
    winner.innerText = "Jogador 1 Ganhou";
  } else if (score2 === 50) {
    winner.innerText = "Jogador 2 Ganhou";
  }
  gameOver.style.display = "flex";
};

function playAgain() {
  score1 = 0;
  score2 = 0;
  scorePlayer1.innerHTML = "00";
  scorePlayer2.innerHTML = "00";
  gameOver.style.display = "none";
  resetGame(5);
}

let interval;
const gameLoop = () => {
  clearTimeout(interval);
  ctx.clearRect(0, 0, 500, 300);
  movePlayer1();
  movePlayer2();
  ballColision();
  ballMovement(x, y);
  drawPlayers();
  drawBall();
  interval = setTimeout(() => {
    gameLoop();
  }, 5);
};

gameLoop();

document.addEventListener("keydown", ({ key }) => {
  if (key === "ArrowUp") {
    directionPlayer1 = "up";
  } else if (key === "ArrowDown") {
    directionPlayer1 = "down";
  } else if (key === "w") {
    directionPlayer2 = "up";
  } else if (key === "s") {
    directionPlayer2 = "down";
  }
});

document.addEventListener("keyup", ({ key }) => {
  if (key === "ArrowUp" || key === "ArrowDown") {
    directionPlayer1 = null;
  } else if (key === "w" || key === "s") {
    directionPlayer2 = null;
  }
});
