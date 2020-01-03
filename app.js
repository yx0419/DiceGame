var permanentScore, currentScore, activePlayer, isGamePlaying; //these variables will be in global scope so all the functions can access.

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (isGamePlaying) {//using state variable
        //1.display dice image with rolled random number
        var rolledNumber = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice-img').src = "/../diceImages/dice-" + rolledNumber + ".png";
        document.querySelector('.dice-img').style.display = 'block';

        //2.display updated current score. IF it is 1, current score become 0.
        if (rolledNumber !== 1) {
            currentScore += rolledNumber;
            document.getElementById('current-' + activePlayer).textContent = currentScore;
        } else {
            //now next player's turn
            nextTurn();
        }
    }
})

function init() {
    // var gamePlaying = true;//if I declare state variable here, all the other functions cannot access this variable. All the functions only have access to the global scope. So we shouldn't define it here.
    isGamePlaying = true;
    permanentScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    document.getElementById('permanent-0').textContent = 0;
    document.getElementById('permanent-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = "PLAYER 1";
    document.getElementById('name-1').textContent = "PLAYER 2";
}

function nextTurn() {
    currentScore = 0;
    document.getElementById('current-' + activePlayer).textContent = currentScore;
    document.querySelector('.player-' + activePlayer).classList.remove('active');

    if (activePlayer == 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    document.querySelector('.player-' + activePlayer).classList.add('active');
    document.querySelector('.dice-img').style.display = 'none';//If write this here, after clicking new game, dice image will never be displayed when clicking 'roll', unless I write document.querySelector('.dice-img').style.display = 'block'; inside roll eventlistenr.
}

document.querySelector('.btn-save').addEventListener('click', function () {
    if (isGamePlaying) {
        permanentScore[activePlayer] += currentScore;
        document.getElementById('permanent-' + activePlayer).textContent = permanentScore[activePlayer];
        //check if there is winner
        if (permanentScore[activePlayer] >= 10) {
            isGamePlaying = false;
            document.querySelector('.dice-img').style.display = 'none'
            document.getElementById('name-' + activePlayer).textContent = "Winner: Player " + (activePlayer + 1) + " !";
            document.querySelector('.player-' + activePlayer).classList.add('winner');
            document.querySelector('.player-' + activePlayer).classList.remove('active');

        } else {
            nextTurn();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', function () {
    document.querySelector('.player-' + activePlayer).classList.remove('winner');
    init();
    document.querySelector('.player-' + activePlayer).classList.add('active');
    document.querySelector('.player-1').classList.remove('active');
})