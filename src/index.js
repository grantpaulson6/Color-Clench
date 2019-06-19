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
        const difficulty = document.getElementById('totalDifficulty').innerHTML;
        game.start({size, speed, frequency, quantity,difficulty});
        
    });

    let sliders = document.getElementsByClassName('slider');

    Array.from(sliders).forEach( el => {

        el.addEventListener('change',() => {
    // document.getElementById('difficultySize').oninput = () => {
        // e.preventDefault();
        let size = document.getElementById('difficultySize').value;
        size = (size-2)*3/8;
        let speed = document.getElementById('difficultySpeed').value;
        speed = (speed-10)*(2.5)/170;
        let frequency = document.getElementById('difficultyFrequency').value;
        frequency = (frequency)*2.5/6;
        let quantity = document.getElementById('difficultyQuantity').value;
        quantity = (quantity-4)*2/46;
        let difficulty = document.getElementById('totalDifficulty');
        difficulty.value = (size + speed + frequency + quantity).toFixed(2);
        });
    });
});

