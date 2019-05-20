import Game from './game';

window.addEventListener('load', () => {
    let canvasEl = document.getElementById('game-canvas');
    if (innerWidth < 700) {
        canvasEl.width = innerWidth;
        canvasEl.height = innerHeight*0.7;
    } else {
        canvasEl.width = 900;
        canvasEl.height = 700;
    }
    let game = new Game({canvasEl});
    document.getElementById('start').addEventListener('click', () => {
        game.stop();
        const size = document.getElementById('difficulty-size').value;
        let speed = document.getElementById('difficulty-speed').value;
        speed = parseInt(speed) + 2*(80-parseInt(speed)+20);
        let frequency = document.getElementById('difficulty-frequency').value;
        frequency = Number(frequency) + 2 * (2.5 - Number(frequency) + 1);
        const quantity = document.getElementById('difficulty-quantity').value;
        game.start({size, speed, frequency, quantity});

    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const canvasEl = document.getElementById('game-canvas');
//     let game = new Game({canvasEl});
//     document.getElementById('start').addEventListener('click', () => {
//         game.stop();
//         const size = document.getElementById('difficulty-size').value;
//         let speed = document.getElementById('difficulty-speed').value;
//         speed = parseInt(speed) + 2*(80-parseInt(speed)+20);
//         let frequency = document.getElementById('difficulty-frequency').value;
//         frequency = Number(frequency) + 2 * (2.5 - Number(frequency) + 1);
//         const quantity = document.getElementById('difficulty-quantity').value;
//         game.start({size, speed, frequency, quantity});

//     });
// });
