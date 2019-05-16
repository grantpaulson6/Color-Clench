import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');
    new Game({canvasEl, difficulty: 4});

});
