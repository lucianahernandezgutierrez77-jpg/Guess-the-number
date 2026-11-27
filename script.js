// grabbing everything I need from the page
const guessinput = document.getElementById("guess-input");
const gamePage = document.getElementById("game-page");
const victoryPage = document.getElementById("victory-page");
const guessButton = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const finalAttempts = document.getElementById("final-attempts");
const restartButton = document.getElementById("restart-btn");
const secretNumberDisplay = document.getElementById("secret-number");
const attemptsDisplay = document.getElementById("attempts");
const maxAttempts = 8;


let attempts = 0;
let secretNumber;
selectTheNumber();

// 
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
        alert("Enter a number between 1 and 100!!");
        return;
    }

    attempts++;
    attemptsDisplay.textContent = "Attempts: " + attempts + " / " + maxAttempts;

    if (guess === secretNumber) {
        showVictory();
        return;
    }

    if (attempts >= maxAttempts) {
        showDefeat();
        return;
    }

    const difference = Math.abs(guess - secretNumber);
    const direction = guess < secretNumber ? "higher" : "lower";

    if (difference <= 3) {
        showFeedback("Burning hot! Just a tiny bit " + direction, "hot");
    } else if (difference <= 10) {

        showFeedback("Very close! Go " + direction, "close");
    } else if (difference <= 25){

        showFeedback("Getting warm. Try " + direction,"warm");
    } else {

        showFeedback("Far away! Try much " + direction,"cold");
    }
}

guessButton.addEventListener("click", checkGuess);

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = "";
    void feedback.offsetWidth;
    feedback.className = type;
}

function showVictory() {

    console.log("executed");

    secretNumberDisplay.textContent = secretNumber;

    finalAttempts.textContent = "You found it in " + attempts + " attempts!";

    gamePage.classList.add("hidden");
    victoryPage.classList.remove("hidden");
}

restartButton.addEventListener("click", playAgain);

function showDefeat() {
    feedback.textContent = "Game over! The number was " + secretNumber;
    guessButton.disabled = true;
    guessinput.disabled = true;
    restartButton.classList.remove("hidden");
}

function playAgain() {
    selectTheNumber();
    attempts = 0;

    guessinput.value = "";
    attemptsDisplay.textContent = "Attemps = 0 /  " + maxAttempts;
    feedback.className = "";
    feedback.textContent = "Let's see if you can guess it!";

    gamePage.classList.remove("hidden");
    victoryPage.classList.add("hidden");
}
