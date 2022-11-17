
const startMenu = document.querySelector('.start-menu');
const gameboard = document.querySelector('.gameboard');
const form = document.querySelector('form');




function Player(name)
{
    this.name = name;
    this.score = 0;
}


// const Gameboard = (() => {
//    let gameboard = [
//         [x, x, x],
//         [x, x, x],
//         [x, x, x]
//     ];
// })(); 




function Game(){
    const xName = document.querySelector('#x-name');
    const oName = document.querySelector('#o-name');

    let players = [new Player(xName.value), new Player(oName.value)];

    startMenu.classList.add('invisible');

    gameboard.classList.remove('invisible');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    Game();
});