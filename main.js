



















function Player(name, playerLetter)
{
    this.name = name;
    this.playerLetter = playerLetter
    this.score = 0;

    function getLetter() {
        return playerLetter;
    }
    
    function getScore() {
        return score;
    }

    function setScore(newScore) {
        this.score = newScore;
    }

    return {getLetter, getScore, setScore};
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






    return {setSpace, prepBoard};

})();


const startMenu = document.querySelector('.start-menu');
const gameboard = document.querySelector('.gameboard');
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    gameDriver();
});





function gameDriver()
{
    
    const xName = document.querySelector('#x-name');
    const oName = document.querySelector('#o-name');

    let players = [new Player(xName.value, "X"), new Player(oName.value, "O")];

    startMenu.classList.add('invisible');
    gameboard.classList.remove('invisible');

    //make player info show on left and right of board

    //playRound(players);


}


function nextTurn(playerTurn) 
{
    if(playerTurn == 0) return 1;
    return 0;
}

//checkWin(playerLetter)
//check each element in board array, if (playerLetter), save index to array
//check if the array nums are in the 2d array of winning combos
//clear array at end

function playRound(players)
{
    let endRound = false;
    let playerTurn = 0;
    while(endRound == false)
    {
        Gameboard.prepBoard(players, playerTurn);
        //checkWin
        playerTurn = nextTurn(playerTurn);
    }
    

}


