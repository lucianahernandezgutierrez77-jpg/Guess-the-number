const guessinput = document.getElementById("guess-input");
const gamePage = document.getElementById("game-page");
const victoryPage = document.getElementById("victory-page");
const guessButton = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const finalAttempts = document.getElementById("final-attempts");
const restartButton = document.getElementById("restart-btn");
const secretNumberDisplay = document.getElementById("attempts");
const attemptsDisplay = document.getElementById("attempts");


let attempts = 0;
let secretNumber;
selectTheNumber();

function selectTheNumber() {
    secretNumber = Math.floor(Math.random()*100) + 1;
    console.log(secretNumber);
}


function checkGuess() {
    const guess = Number(guessinput.value);
    if (
        guessinput.value.trim()  === "" || 
        guess < 1 ||
        guess > 100 ||
        !Number.isInteger(guess)
    ) {
        alert("Enter a number between 1 and 100!!")
        return;
    }

    attempts++;

    attemptsDisplay.textContent = "Attempts: " + attempts;

    if (guess < secretNumber) {
        feedback.textContent = "Too low! Try a higher number.";
    } else if (guess > secretNumber) {
        feedback.textContent = "Too high! Try a lower number";
    } else {
        showVictory();
    }
}

guessButton.addEventListener("click", checkGuess);

function showVictory() {

    console.log("executed");

    secretNumberDisplay.textContent = secretNumber;

    finalAttempts.textContent = "You found it in " + attempts + "attempts!";

    gamePage.classList.add("hidden");
    victoryPage.classList.remove("hidden");
}

restartButton.addEventListener("click", playAgain);

function playAgain() {
    selectTheNumber();
    attempts = 0;

    guessinput.value = "";
    attemptsDisplay.textContent = "Attemps = 0 ";
    feedback.textContent = "Let's see if you can guess it!";

    gamePage.classList.remove("hidden");
    victoryPage.classList.add("hidden");
}