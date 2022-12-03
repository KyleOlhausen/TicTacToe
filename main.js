const startMenu = document.querySelector('.start-menu');
const gameboard = document.querySelector('.gameboard');
const form = document.querySelector('form');
const winner = document.querySelector('.winner');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    GameDriver.createPlayers();
    startMenu.classList.add('invisible');
    gameboard.classList.remove('invisible');
});


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
    
    function getScore() {
        return score;
    }

    function setScore(newScore) {
        this.score = newScore;
    }

    return {getName, getLetter, getScore, setScore};
}



const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const boardSpaces = document.querySelectorAll('.board-space');

    boardSpaces.forEach( space => {
        space.addEventListener('click', e => {
            if(space.textContent == "" && !GameDriver.getIsOver())
            {
                GameDriver.playRound(space);
            }
        })
    });

    function setSpace(playerLetter, space){
            board[space.dataset.id] = playerLetter;
            space.textContent = playerLetter;  
    }

    function getBoard(){
        return board;
    }

    return {setSpace, getBoard};
})();



const GameDriver = (() => {
    
    let players = [];
    let playerTurn = 0;
    let isOver = false;

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

    const nextTurn = (playerTurn) => {
        if(playerTurn == 0) return 1;
        return 0;
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

    function playRound(space) 
    {
        Gameboard.setSpace(players[playerTurn].getLetter(), space)
        
        isOver = checkWin(players[playerTurn].getLetter());
        if(isOver){
            displayWinner();
            //add function to add to player score and display score
            //show restart button
        } 
        playerTurn = nextTurn(playerTurn); 
    }

    //restart function clears board


    function displayWinner() {
        let playerName = players[playerTurn].getName();
        winner.textContent =  playerName + " Wins!";
        winner.classList.remove('invisible');
    }

    function getIsOver()
    {
        return isOver;
    }

    return {checkWin, nextTurn, playRound, getIsOver, createPlayers}
})();
