import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');
    let game = new Game({canvasEl});
    document.getElementById('start').addEventListener('click', () => {
        game.stop();
        const size = document.getElementById('difficulty-size').value;
        let speed = document.getElementById('difficulty-speed').value;
        speed = parseInt(speed) + 2*(90-parseInt(speed)+60);
        game.start({size, speed});

    });
});
