import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');
    let game = new Game({canvasEl, numTrains: 5});
    document.getElementById('start').addEventListener('click', () => {
        game.stop();
        const size = document.getElementById('difficulty-size').value;
        let speed = document.getElementById('difficulty-speed').value;
        speed = parseInt(speed) + 2*(80-parseInt(speed)+20);
        let frequency = document.getElementById('difficulty-frequency').value;
        frequency = Number(frequency) + 2 * (1.5 - Number(frequency) + 1);
        game.start({size, speed, frequency});

    });
});
