




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


    function prepBoard(players, playerTurn)
    {
        const boardSpaces = document.querySelectorAll('.board-space');

        boardSpaces.forEach( space => {
            space.addEventListener('click', e => {Gameboard.setSpace(players[playerTurn].getLetter(), space)})
        });
    }


    function validateChoice(space)
    {
        if(space.textContent != "") return false;
        return true;
    }



    //function setSpace(playerLetter)
    //check data-id of space clicked, loop array til i > data-id number
    //add (playerLetter) to board array
    //set data-id textContent to playerLetter
    function setSpace(playerLetter, space){
        if(validateChoice(space))
        {
            let spaceNum = space.dataset.id;
            for(i = 0; i < spaceNum; i++)
            {
                if(i == spaceNum)
                {
                    board[i] == playerLetter;
                    space.textContent = playerLetter;
                }
            }
        }
    }

    //getSpace()
    //return textContent


    //checkWin(playerLetter)
    //check each element in board array, if (playerLetter), save index to array
    //check if the array nums are in the 2d array of winning combos
    //clear array at end
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
        
        //check array methods to see best way to do this
        let playerSpaces = board.filter(e =>  e.textContent === playerLetter);

        return winCombos
        .filter((combination) => combination.includes(playerSpaces))
        .some((possibleCombination) =>
          possibleCombination.every(
            (index) => playerSpaces[index] === "X"//?????
          ));


    }



    return {setSpace, prepBoard, checkWin};

})();


const startMenu = document.querySelector('.start-menu');
const gameboard = document.querySelector('.gameboard');
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    gameDriver();
});





function gameDriver()//probably can just have this outside of the function
{
    
    const xName = document.querySelector('#x-name');
    const oName = document.querySelector('#o-name');

    let players = [new Player(xName.value, "X"), new Player(oName.value, "O")];

    startMenu.classList.add('invisible');
    gameboard.classList.remove('invisible');

    //make player info show on left and right of board

    //playRound(players);
    playRound(players);


}


function nextTurn(playerTurn) 
{
    if(playerTurn == 0) return 1;
    return 0;
}





function playRound(players)
{
    let endRound = false;
    let playerTurn = 0;
    while(endRound == false)
    {
        Gameboard.prepBoard(players, playerTurn);
        Gameboard.checkWin(players[playerTurn].getLetter());
        playerTurn = nextTurn(playerTurn);
    }
    

}


