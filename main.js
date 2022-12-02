




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
                if( space.textContent == "")
                {
                    GameDriver.playRound(space);
                }
            })
        });


    function setSpace(playerLetter, space){
    
            let spaceNum = space.dataset.id;

            board[spaceNum] = playerLetter;
            space.textContent = playerLetter;  
    }

    function getBoard(){
        return board;
    }


    return {setSpace, getBoard};

})();






const startMenu = document.querySelector('.start-menu');
const gameboard = document.querySelector('.gameboard');
const form = document.querySelector('form');




form.addEventListener('submit', (e) => {
    e.preventDefault();
    GameDriver();
});




const GameDriver = (() => {
    
    const xName = document.querySelector('#x-name');
    const oName = document.querySelector('#o-name');

    let players = [new Player(xName.value, "X"), new Player(oName.value, "O")];
    let playerTurn = 0;

    startMenu.classList.add('invisible');
    gameboard.classList.remove('invisible');
 
    const nextTurn = (playerTurn) => {
        if(playerTurn == 0) return 1;
        return 0;
    }

    function checkWin(playerLetter)
    {
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
        
        let playerSpaces = Gameboard.getBoard().filter(e =>  e.textContent === playerLetter);
        let win = false;
        
        winCombos.forEach((combo) => {
            if(playerSpaces.includes(combo)) win = true;
        });
        
        return win;
    }

    function playRound(space) 
    {
        Gameboard.setSpace(players[playerTurn].getLetter(), space)
        checkWin(players[playerTurn].getLetter());
        playerTurn = nextTurn(playerTurn); 
    }

    return {checkWin, nextTurn, playRound}
})();





















