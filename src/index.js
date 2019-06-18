import Game from './game';

window.addEventListener('load', () => {
    let canvasEl = document.getElementById('game-canvas');
    if (innerWidth < 700) {
        canvasEl.width = innerWidth;
        canvasEl.height = innerHeight*0.7;
    } else {
        canvasEl.width = innerWidth - 300;
        canvasEl.height = innerHeight;
    }
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    let game = new Game({canvasEl});
    document.getElementById('start').addEventListener('click', () => {
        game.stop();
        const size = document.getElementById('difficultySize').value;
        let speed = document.getElementById('difficultySpeed').value;
        speed = parseInt(speed) + 2*(80-parseInt(speed)+20);
        let frequency = document.getElementById('difficultyFrequency').value;
        frequency = Number(frequency) + 2 * (2.5 - Number(frequency) + 1);
        const quantity = document.getElementById('difficultyQuantity').value;
        game.start({size, speed, frequency, quantity});
        
    });
});

