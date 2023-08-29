// DEPENDENCIES
// start button, reset button, countdown text, win and loss text, word to guess
var startButton = document.querySelector("#start-button");
var resetButton = document.querySelector("#reset-button");
var countdownText = document.querySelector("#count-text");
var winText = document.querySelector("#win-text");
var loseText = document.querySelector("#lose-text");
var wordText = document.querySelector("#word-text");
var endGame = document.querySelector("#end-game");

// DATA
// wins and losses, word bank, time left
var numWins = localStorage.getItem("numWins") || 0;
var numLoses = localStorage.getItem("numLoses") || 0;
var timeLeft = 10;
var userWord = "";
var dashedWord = "";
var isGame = false;

// FUNCTIONS

//Outline Functionality

//get a random word
function getRandomWord() {
  var words =
    "Abjure,Future,Picnic,Agonistic,Garland,Protect,Airline,Gigantic,Publish,Bandit,Goofy,Quadrangle,Banquet,Government".split(
      ","
    );
  var randNum = Math.floor(Math.random() * (words.length - 1));
  return words[randNum];
}

//Function to set the dashed word to go on the screen and return the text word
function createDashWord(word) {
  var wordLength = word.length;
  var dashWord = "";
  // Create the dashed word to be displayed
  for (var i = 0; i < wordLength; i++) {
    dashWord += "_";
  }

  wordText.setAttribute("style", "letter-spacing:8px");
  wordText.textContent = dashWord;
  return dashWord;
}

function endTimer() {
  //the game is over after timer so must check score and update
  timeLeft = 10;
  countdownText.textContent = "Time Left: ";
  isGame = false;
}

//start the timer
function startTimer() {
  var timerInterval = setInterval(function () {
    countdownText.textContent = timeLeft + " second(s) remain";
    isGame = true;
    if (updateScore)
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerInterval);
        endTimer();
      }
  }, 1000);
}

//update the score
function updateScore() {
  if (userWord.includes("_")) {
    numLoses++;
    loseText.textContent = "Loses: " + numLoses;
    localStorage.setItem("numLoses", numLoses);
    endGame.textContent = "YOU LOSE!";
    return false;
  } else {
    numWins++;
    winText.textContent = "Wins: " + numWins;
    localStorage.setItem("numWins", numWins);
    endGame.textContent = "CONGRATS YOU WIN!";
    return true;
  }
}

function replaceDash(index, key) {
  if (index === 0) {
    key = key.toUpperCase();
  }
  if (index > dashedWord.length - 1) return str;
  return dashedWord.substring(0, index) + key + dashedWord.substring(index + 1);
}

function checkKey(key) {
  var userWordLower = userWord.toLowerCase();
  if (userWordLower.includes(key)) {
    for (var i = 0; i < userWordLower.length; i++) {
      if (userWordLower[i] === key) {
        dashedWord = replaceDash(i, key);
        wordText.textContent = dashedWord;
      }
    }
  } else {
    console.log("INCORRECT");
  }
}

//function to reset the score
function resetScore() {
  numWins = 0;
  numLoses = 0;
  loseText.textContent = "Loses: " + numLoses;
  winText.textContent = "Wins: " + numWins;
  localStorage.setItem("numLoses", numLoses);
  localStorage.setItem("numWins", numWins);
  endGame.textContent = "";
}

// loading the game before the user clicks start game
function init() {
  //output the screen with the current loaded scores
  winText.textContent = "Wins: " + numWins;
  loseText.textContent = "Loses: " + numLoses;
}

// USER INTERACTIONS
// a user types a key ...,clicking buttons

//to start the game
startButton.addEventListener("click", function () {
  endGame.textContent = "";
  userWord = getRandomWord();
  dashedWord = createDashWord(userWord);
  startTimer();
});

resetButton.addEventListener("click", function () {
  resetScore();
});

document.addEventListener("keydown", function (event) {
  if (!isGame) {
    return;
  }
  if (event.keyCode < 58 || event.keyCode > 90) {
    return;
  }

  var keyPress = event.key.toLowerCase();
  console.log(keyPress);

  checkKey(keyPress);
});

// INITALIZATIONS
// load wins and losses
init();
