// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

/* variables */
let passwordList = ['python', 'java', 'swift', 'javascript'];
let password;
let guessedWord;
let guessedLetters;
let lives;
let gamesWon = 0;
let gamesLost = 0;

/* functions */

// generate random integers inclusive of the two given maximum and minimum values
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
}

function introduction() {
    console.log('H A N G M A N');
}

function getWord() {
    let word = '';
    let size = guessedWord.length;
    for (let i = 0; i < size; i++) {
        word += guessedWord[i];
    }
    return word;
}

function updateWord(letter) {
    for (let i = 0; i < password.length; i++) {
        if (password[i] === letter) {
            guessedWord[i] = letter;
        }
    }
}

function checkLetter(letter) {
    // check if player entered more than one letter
    if (letter.length !== 1) {
        console.log("Please, input a single letter");
        return;
    }

    // check if letter is from the english alphabet & is lowercase
    if (!/[a-z]/.test(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        return;
    }

    // check if letter was guessed before (in general)
    if (guessedLetters.includes(letter)) {
        console.log("You've already guessed this letter.");
        return;
    }

    // check if letter is not in password
    if (!password.includes(letter)) {
        console.log("That letter doesn't appear in the word.");
        guessedLetters.push(letter);
        lives--;
        return;
    }

    guessedLetters.push(letter);
    updateWord(letter);
}

function hasWon() {
    if (getWord() === password) {
        console.log(`You guessed the word ${getWord()}!
You survived!`);
        return true;
    }
    return false;
}

function initializeVariables() {
    password = passwordList[getRandomInteger(0, passwordList.length - 1)];
    guessedWord = Array(password.length).fill("-");
    guessedLetters = [];
    lives = 8;
}

function playGame() {
    initializeVariables();
    let won = false;

    while (lives > 0) {
        console.log(getWord());
        let letter = input("Input a letter: ");
        checkLetter(letter);
        console.log(); // printing a space
        if (hasWon()) {
            won = true;
            gamesWon++;
            break;
        }
    }

    if (!won) {
        gamesLost++;
        console.log("You lost!");
    }
}

function showResults() {
    console.log(`You won: ${gamesWon} times.
You lost: ${gamesLost} times.`);
}

function startGame() {

    let choice = input("Type \"play\" to play the game, " +
        "\"results\" to show the scoreboard, and \"exit\" to quit: ").trim();

    while (choice !== 'exit') {
        switch (choice) {
            case 'play':
                console.log(); // printing a space
                playGame();
                break;
            case 'results':
                showResults();
                break;
            case 'exit':
                break;
        }
        choice = input("Type \"play\" to play the game, " +
            "\"results\" to show the scoreboard, and \"exit\" to quit: ").trim();
    }
}


function main() {
    introduction();
    startGame();
}

main();