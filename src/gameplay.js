const getAliens = () => (
  window.innerWidth > window.innerHeight
  ? [...document.getElementsByClassName("moon__alien")]
  : [...document.getElementsByClassName("moon__alien--small")]
);

let aliens = getAliens();
const startButton = document.getElementById("start");

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
      updateTimer();
    } else {
      isGameOver = true;
      timeRemaining = 30;
    }
  }, 1000);
}

const startGame = () => {
  isGameOver = false;
  activateAlien();
  updateTimer();
}

aliens.forEach((alien) => {
  alien.addEventListener("click", () => {
    if (alien == currentActive && !isGameOver) {
      alien.classList.remove(activeClass);
      score += 20;
    }
  })
});

startButton.addEventListener("click", startGame);
window.addEventListener("resize", () => {
  aliens = getAliens();
});
