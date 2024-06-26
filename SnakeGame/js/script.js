let snake = document.querySelector(".snake");
let snakePosition = window.getComputedStyle(snake);
let snakeLeft = +snakePosition.left.replace("px", "");
let snakeUp = +snakePosition.top.replace("px", "");

let apple = document.querySelector(".apple");
let applePostion = window.getComputedStyle(apple);

let timeSnakeMovement = 60;
let snakeMoving;
let snakeTail = 1;
let started = 0;

/*Snake Movement*/
document.addEventListener("keydown", (event) => {
  if (started == 0) {
    started = 1;
    applePostioning();
  }

  setTimeout(clearInterval(snakeMoving), 2);
  const key = event.key;
  switch (key) {
    case "ArrowUp":
      snakeMoving = setInterval(() => {
        if (snakeUp === -420) {
          snakeUp = 420;
        } else {
          snakeUp += -20;
          snake.style.top = `${snakeUp}px`;
        }
      }, timeSnakeMovement);

      break;
    case "ArrowDown":
      snakeMoving = setInterval(() => {
        if (snakeUp === 420) {
          snakeUp = -420;
        } else {
          snakeUp += 20;
          snake.style.top = `${snakeUp}px`;
        }
      }, timeSnakeMovement);
      break;
    case "ArrowLeft":
      snakeMoving = setInterval(() => {
        if (snakeLeft === -620) {
          snakeLeft = 620;
        } else {
          snakeLeft += -20;
          snake.style.left = `${snakeLeft}px`;
        }
      }, timeSnakeMovement);

      break;
    case "ArrowRight":
      snakeMoving = setInterval(() => {
        if (snakeLeft === 620) {
          snakeLeft = -620;
        } else {
          snakeLeft += 20;
          snake.style.left = `${snakeLeft}px`;
        }
      }, timeSnakeMovement);

      break;
  }
});

/*END - Snake Movement*/
/*Apple*/

function applePostioning() {
  if (started === 1) {
    apple.style.display = "block";
  }
  let minX = -480,
    maxX = 480,
    minY = -380,
    maxY = 380;

  let x = Math.floor(Math.random() * ((maxX - minX) / 20 + 1)) * 20 + minX;
  x -= x % 20;

  let y = Math.floor(Math.random() * ((maxY - minY) / 20 + 1)) * 20 + minY;
  y -= y % 20;

  apple.style.left = `${x}px`;
  apple.style.top = `${y}px`;
}

/*END - Apple*/

/*Snake-Game Logic*/

let gameInterval = setInterval(() => {
  // console.log(`Top: ${snakeUp} | Left: ${snakeLeft}`);
  if (
    Number(applePostion.left.replace("px", "")) === snakeLeft &&
    Number(applePostion.top.replace("px", "")) === snakeUp
  ) {
    snakeTail++;
    apple.style.display = "none";
    applePostioning();
  }
}, timeSnakeMovement);
