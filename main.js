
const startMenu = document.querySelector('.start-menu');
const startBtn = document.querySelector('.start-btn');
const gameboard = document.querySelector('.gameboard');



startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startMenu.classList.add('invisible');
    gameboard.classList.remove('invisible');
});


// function Player(name)
// {
//     this.name = name;
// }


// const Gameboard = (() => {
//    let gameboard = [
//         [x, x, x],
//         [x, x, x],
//         [x, x, x]
//     ];
// })(); 


// const Game = (() => {

// })();

