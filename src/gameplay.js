const countdownCont = document.getElementById("countdown");
const countdownText = countdownCont.querySelector("h2");
const highScoreCont = document.getElementById("high-score");
const highScoreText = highScoreCont.querySelector("h2");
const moon = document.getElementById("moon--background");
const scoreCont = document.getElementById("score");
const scoreText = scoreCont.querySelector("h2");
const splashTextCont = document.getElementById("splash--text");
const startButton = document.getElementById("start");
const sun = document.getElementById("sun--background");

const getAliens = () => (
  window.innerWidth > window.innerHeight
  ? [...document.getElementsByClassName("moon__alien")]
  : [...document.getElementsByClassName("moon__alien--small")]
);

let aliens = getAliens();

const activeTimes = [
  {
    activeMax: 400,
    activeMin: 200
  },
  {
    activeMax: 500,
    activeMin: 300
  },
  {
    activeMax: 900,
    activeMin: 600
  },
  {
    activeMax: 1500,
    activeMin: 1100
  },
  {
    activeMax: 2000,
    activeMin: 1500
  },
  {
    activeMax: 2500,
    activeMin: 2000
  },
];
const activeClass = "moon__alien--active";
const visibleClass = "header__block--visible";
const gameOverClass = "--game-over";
const gameLength = 30;

let isGameOver = true;
let currentActive;
let timeRemaining = gameLength;
let score = 0;
let highScore = 0;


const handleGameOver = () => {
  if (score > highScore) {
    highScore = score;
  }
  if (highScore != 0) {
    highScoreText.innerText = highScore;
    highScoreCont.classList.add(visibleClass);
  }
  scoreCont.classList.remove(visibleClass);
  countdownCont.classList.remove(visibleClass);
  launchGameOverScreen();
}

const getRandomAlien = () => {
  const alien = aliens[getRandomNum(0, aliens.length - 1)];
  if (alien === currentActive) {
    return getRandomAlien();
  }
  return alien;
}

const activateAlien = () => {
    currentActive = getRandomAlien();
    currentActive.classList.add(activeClass);
    const { activeMax, activeMin } = activeTimes[Math.round(timeRemaining / activeTimes.length)];
    const timeout = getRandomNum(activeMax, activeMin);
    setTimeout(() => {
      currentActive.classList.remove(activeClass);
      if (!isGameOver) {
        activateAlien();
      }
    }, timeout);
}

const updateTimer = () => {
  setTimeout(() => {
    if (timeRemaining != 0) {
      timeRemaining -= 1;
      countdownText.innerText = timeRemaining;
      updateTimer();
    } else {
      isGameOver = true;
      handleGameOver();
    }
  }, 1000);
}

const startGame = () => {
  score = 0;
  scoreText.innerText = score;
  timeRemaining = gameLength;
  countdownText.innerText = timeRemaining;
  isGameOver = false;

  scoreCont.classList.add(visibleClass);
  countdownCont.classList.add(visibleClass);

  sun.classList.remove(gameOverClass);
  moon.classList.remove(gameOverClass);
  splashTextCont.classList.remove(gameOverClass);

  setTimeout(() => {
    activateAlien();
    updateTimer();
  }, 1200);
}

aliens.forEach((alien) => {
  alien.addEventListener("click", () => {
    if (alien.classList.contains(activeClass) && !isGameOver) {
      alien.classList.remove(activeClass);
      score += 9;
      scoreText.innerText = score;
    }
  })
});

startButton.addEventListener("click", startGame);
window.addEventListener("resize", () => {
  aliens = getAliens();
});

const launchGameOverScreen = () => {
  sun.classList.add(gameOverClass);
  moon.classList.add(gameOverClass);
  splashTextCont.classList.add(gameOverClass);
}

launchGameOverScreen();
