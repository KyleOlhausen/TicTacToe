
function Player(name, playerLetter)
{
    this.name = name;
    this.playerLetter = playerLetter
    this.score = 0;

    function getName() {
        return name;
    }

    function getLetter() {
        return playerLetter;
    }

    return {getName, getLetter};
}



const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const boardSpaces = document.querySelectorAll('.board-space');

    boardSpaces.forEach( space => {
        space.addEventListener('click', e => {
            if(space.textContent == "" && !GameDriver.getIsOver()){
                GameDriver.playMove(space);
            }
        })
    });

    function setSpace(playerLetter, space) {
            board[space.dataset.id] = playerLetter;
            space.textContent = playerLetter;  
    }

    function getBoard() {
        return board;
    }

    function clearBoard() {
        boardSpaces.forEach(space => {
            board[space.dataset.id] = "";
            space.textContent = "";
         })
    }

    return {setSpace, getBoard, clearBoard};
})();



const GameDriver = (() => {
    let players = [];
    let playerTurn = 0;
    let isOver = false;
    playerxScore = 0
    playeroScore = 0

    const form = document.querySelector('form');
    const playAgainBtn = document.querySelector('.play-again');
    const newGameBtn = document.querySelector('.new-game');
    const winCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

    playAgainBtn.addEventListener('click', (e) => { 
        Gameboard.clearBoard();
        playerTurn = 0;
        isOver = false;
        displayController.hideWinner()
    });

    newGameBtn.addEventListener('click', (e) => {
        displayController.displayScore(players);
        newGame();
        displayController.hideBoard();
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        createPlayers();
        displayController.displayScore(players);
        displayController.displayBoard();
    });

    function nextTurn(playerTurn){
        if(playerTurn == 0) return 1;
        return 0;
    }
    
    function newGame() {
        Gameboard.clearBoard();
        players = [];
        playerTurn = 0;
        isOver = false;
        playerxScore = 0
        playeroScore = 0
    }

    function createPlayers(){
        const xName = document.querySelector('#x-name');
        const oName = document.querySelector('#o-name');
        players = [new Player(xName.value, "X"), new Player(oName.value, "O")];
    }

    function checkWin(playerLetter)
    {   
        let playerSpaces = [];
        let win = false;

        Gameboard.getBoard().forEach((e, i) => {
            if(e === playerLetter) playerSpaces.push(i);
        });
        
        winCombos.forEach((combo) => {
            if(combo.every(e => {return playerSpaces.includes(e);})) win = true;
        });

        return win;
    }

    function playMove(space) 
    {
        currPlayer = players[playerTurn];
        Gameboard.setSpace(currPlayer.getLetter(), space)
        
        isOver = checkWin(currPlayer.getLetter());
        if(isOver){
            displayController.displayWinner(currPlayer);
            addScore(currPlayer);
            displayController.displayScore(players);
        } 
        else if(!Gameboard.getBoard().includes("")){
            isOver = true;
            displayController.displayTie();
        }
        playerTurn = nextTurn(playerTurn); 
    }

    function addScore(currPlayer)
    {
        if(currPlayer.getLetter() == "X"){
            playerxScore += 1;
        }
        else {
            playeroScore += 1;
        }
    }

    function getIsOver()
    {
        return isOver;
    }

    return {playMove, getIsOver}
})();




const displayController = (() => {
    const startMenu = document.querySelector('.start-menu');
    const gameboard = document.querySelector('.gameboard');
    const winner = document.querySelector('.winner');
    const scores = document.querySelector('.scores');
    const xScore = document.querySelector('.player-x');
    const oScore = document.querySelector('.player-o');
    const options = document.querySelector('.options');

    function hideWinner() {
        winner.classList.add('invisible');
    }

    function displayWinner(currPlayer) {
        winner.textContent =  currPlayer.getName() + " Wins!";
        winner.classList.remove('invisible');
    }

    function displayTie() {
        winner.textContent = "Tie!";
        winner.classList.remove('invisible');
    }

    function displayScore(players)
    {
        xScore.textContent = players[0].getName() + ": " + playerxScore;
        oScore.textContent = players[1].getName() + ": " + playeroScore;
    }

    function hideBoard() {
        winner.classList.add('invisible');
        gameboard.classList.add('invisible');
        scores.classList.add('invisible');
        options.classList.add('invisible');
        startMenu.classList.remove('invisible');
    }

    function displayBoard() {
        startMenu.classList.add('invisible');
        gameboard.classList.remove('invisible');
        scores.classList.remove('invisible');
        options.classList.remove('invisible');
    }
  
    return {hideWinner, displayTie, displayWinner, displayScore, hideBoard, displayBoard}
})();