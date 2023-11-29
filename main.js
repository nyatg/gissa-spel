// skapa koppling till alla element i html
//start knapp
const playBtn = document.getElementById('play-btn');

// spelarens gissning
let userGuessInput = document.getElementById('user-guess');

// knapp som skickar in värdet på det gissade numret
const guessBtn = document.getElementById('guess-btn');

// Meddelande ruta
const messageDiv = document.getElementById('message-div');

//div för lista av gissningar
const listDiv = document.getElementById('list-div');

//div för lista av antal gissningar kvar
const guessesLeft = document.getElementById('guesses-left');

//max gissning
const maxGuess = 5;

//nedräkning antal gissningar kvar
let chancesLeft = 4;

// användarens antal gissningar
let userGuesses = 0;


// random siffra mellan 0-100 genereras med math.random
let gameNumber = Math.floor(Math.random() * 100) + 1;

// lista som fylls med de gissade numren
const guessList = document.getElementById('guess-list');
listDiv.appendChild(guessList);

function showMessage(message) {
    messageDiv.textContent = message;
}

function chances() {
    if (chancesLeft >= 0) {
        document.getElementById("guesses-left").innerText = ` ${chancesLeft} chances left`;
        chancesLeft--;
    }
};

//skapa eventlistener till knappen
playBtn.addEventListener('click', function () {
    // random siffra mellan 0-100 genereras med math.random
    gameNumber = Math.floor(Math.random() * 100) + 1;
    userGuesses = 0;
    guessBtn.disabled = false;
    showMessage("Game On!");
    listHeader.style.display = 'none'
    // updateGuessesLeft();
    guessList.innerHTML = '';

    chancesLeft = 5;
    chances();
    console.log("VAdD")
});



const listHeader = document.createElement('h4');
listHeader.textContent = "Your guesses:"
listDiv.appendChild(listHeader);
listHeader.id = 'list-header';
listHeader.style.display = 'none';



guessBtn.addEventListener('click', function () {    


    if (guessList.childElementCount === 0) {
        listHeader.style.display = 'block';
    }

    // användarens gissade nummer, hämtat från input
    const userGuessValue = userGuessInput.value;
    //skapar en lista över spelarens gissningar:

    // kontrollera att input är numeriskt värde:
    if (!isNaN(userGuessValue) && userGuessValue >= 1 && userGuessValue <= 100) {
        if (guessListContains(userGuessValue)) {
            showMessage(`You've already guessed ${userGuessValue}?? Guessing that again won't make it correct. Try again Silly Goose!`)
        } else {
            //först skapas itemet
            let listItem = document.createElement('li');
            //skapar en item med värdet av spelarens gissning
            listItem.textContent = `${userGuessValue}`;
           // appenda till listDiv ist, men skapa en funktion först!
            guessList.appendChild(listItem);
            listItem.id = 'list-item';
            // vid fler än 5 gissningar
            userGuesses++;

            chances();

            showMessage("Din gissning:", userGuessValue);
            // siffran jämförs med datorns siffra, med en if sats
            if (userGuessValue > gameNumber) {
                //om gissning för högt visas: 
                showMessage(`Your guess of number ${userGuessValue} is too high..`);
            } else if (userGuessValue == gameNumber) {
                // om gissning korrekt visas: 
                showMessage(`CONGRATULATIONS! Your guess of number ${userGuessValue} is CORRECT! You WIN!!!!`);
            } else if (userGuessValue < gameNumber) {
                // om gissning för lågt visas: 
                showMessage(`Your guess of ${userGuessValue} is too low..`);
            } if (userGuesses === maxGuess) {
                showMessage(`GAME OVER LOSER! The correct answer is ${gameNumber}. Try again by pressing "New game".`);
                guessBtn.disabled = true;
                // listItem.textContent = ""; 
            }
            userGuessInput.value = '';
        }
    }
    else if (userGuessValue === '') {
        showMessage("Where's your guess????");
    }
    else if (userGuessValue > 100 || userGuessValue < 1) {
        showMessage('I SAID BETWEEN 1 AND 100!!!')
    } else {
        showMessage('Error')
    }

    

});


function guessListContains(guess) {
    const listItems = guessList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.trim() === guess.trim()) {
            return true;
        }
    }
    return false;
}
