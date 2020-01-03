init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    //1.display dice image with rolled random number
    var rolledNumber = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.dice-img').src = "/../diceImages/dice-" + rolledNumber + ".png";

    //2.display updated current score. IF it is 1, current score become 0.
    if (rolledNumber !== 1) {
        currentScore += rolledNumber;
        document.getElementById('current-' + activePlayer).textContent = currentScore;
    } else {
        currentScore = 0;
        document.getElementById('current-' + activePlayer).textContent = currentScore;
        //now next player's turn
        nextTurn();
    }
})

function init() {
    permanentScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
}

function nextTurn() {
    document.querySelector('.player-' + activePlayer).classList.remove('active');

    if (activePlayer == 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    document.querySelector('.player-' + activePlayer).classList.add('active');
}

document.querySelector('.btn-save').addEventListener('click', function () {
    permanentScore[activePlayer] += currentScore;

    document.getElementById('permanent-' + activePlayer).textContent = permanentScore[activePlayer];
    currentScore = 0;
    document.getElementById('current-' + activePlayer).textContent = currentScore;

    //check if there is winner
    if (permanentScore[activePlayer] >= 10) {
        document.getElementById('name-' + activePlayer).textContent = "Winner: Player" + (activePlayer + 1);
        document.querySelector('.player-' + activePlayer).classList.add('winner');
        document.querySelector('.player-' + activePlayer).classList.remove('active');
        document.querySelector('.dice-img').style.display = 'none';
    } else {
        nextTurn();
    }
})