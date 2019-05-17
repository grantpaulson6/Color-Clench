import Game from './game2';

document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');
    new Game({ canvasEl, difficulty: 3});
});
