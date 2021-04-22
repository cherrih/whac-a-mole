
// create night sky background

const sky = document.getElementById("sky--background");

const getRandomNum = (min, max, round = true) => {
  const randomNum = Math.random() * (max - min + 1) + min;
  return round ? Math.floor(randomNum) : randomNum;
};

const getStar = () => {
  const star = document.createElement("div");
  const dimension = `${getRandomNum(1, 8)}px`;
  const posX = getRandomNum(0, 100);
  const posY = getRandomNum(0, 100);
  star.style.height = dimension;
  star.style.width = dimension;
  star.style.left = `${posX}vw`;
  star.style.top = `${posY}vh`;
  star.style.animationDuration = `${getRandomNum(1, 3, false)}s`;
  star.style.animationDelay = `${getRandomNum(0, 1, false)}s`;
  star.className = "sky__star";
  return star;
};

const generateStars = () => {
  for (let i = 0; i < 64; i++) {
    sky.appendChild(getStar());
  }
};

generateStars();

// move night sky on mouse move

let followX = 0,
  followY = 0,
  x = 0,
  y = 0;

const moveSky = () => {
  const friction = 1 / 30;
  x += (followX - x) * friction;
  y += (followY - y) * friction;

  const translate = `translate(${x}px, ${y}px) scale(1.1)`;
  sky.style.transform = translate;
  window.requestAnimationFrame(moveSky);
};

window.addEventListener("mousemove", (e) => {
  const mouseX = Math.max(
    -100,
    Math.min(100, window.innerWidth / 2 - e.clientX)
  );
  const mouseY = Math.max(
    -100,
    Math.min(100, window.innerHeight / 2 - e.clientY)
  );

  followX = (20 * mouseX) / 100;
  followY = (20 * mouseY) / 100;
});

moveSky();
