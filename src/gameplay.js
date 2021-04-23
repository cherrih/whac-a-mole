const startButton = document.getElementById("start");
const highScoreCont = document.getElementById("high-score");
const highScoreText = highScoreCont.querySelector("h2");
const scoreCont = document.getElementById("score");
const scoreText = scoreCont.querySelector("h2");
const countdownCont = document.getElementById("countdown");
const countdownText = countdownCont.querySelector("h2");

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

let isGameOver = true;
let currentActive;
let timeRemaining = 30;
let score = 0;
let highScore = 0;

const activeClass = "moon__alien--active";
const visibleClass = "header__block--visible";

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
  timeRemaining = 30;
  countdownText.innerText = timeRemaining;
  isGameOver = false;
  scoreCont.classList.add(visibleClass);
  countdownCont.classList.add(visibleClass);
  activateAlien();
  updateTimer();
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
