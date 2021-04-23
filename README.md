
![Screenshot](/screenshot.png)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c9f16bed-7ac0-4df1-9490-b46f4a931d46/deploy-status)](https://app.netlify.com/sites/whac/deploys)

# Whac-an-alien

A single-player [whac-a-mole](https://en.wikipedia.org/wiki/Whac-A-Mole) game for the browser.

## Stack

Built in vanilla javascript, html and scss. Sass was compiled using the [sass executable](https://sass-lang.com/install)
```
sass --watch src/styles/styles.scss dist/css/output.css
```

## Running locally

1. Clone this repository
2. Open [index.html](/index.html) in your browser of choice
## Structure

All javascript and pre-compiled sass lives in the [src](/src/) directory.

- [background.js](/src/background.js) sets up the starry night background
- [gameplay.js](/src/gameplay.js) sets up the game logic including score and click tracking
