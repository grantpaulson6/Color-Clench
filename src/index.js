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

    let score = document.getElementById('livescore');
    let missed = document.getElementById('missedscore');
    let remaining = document.getElementById('remainingscore');
    let remainingtitle = document.getElementById('remainingtitle');
    let liveScoring = [score, missed, remaining, remainingtitle];
    let scoreTable = document.getElementById('current-score');

    let game = new Game({canvasEl, liveScoring,});

    document.getElementById('start').addEventListener('click', () => {
        game.stop();
        scoreTable.className = "playing";
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
    let div1 = document.getElementById('container1');
    let div2 = document.getElementById('container2');
    let div3 = document.getElementById('container3');
    let h1 = document.getElementById('header1');
    let h2 = document.getElementById('header2');
    let h3 = document.getElementById('header3');
    let icon = document.getElementById('icon');
    let icon2 = document.getElementById('icon2');
    let icon3 = document.getElementById('icon3');
    let howto = document.getElementById('howto');
    let setting = document.getElementById('settingshower');
    let scores = document.getElementById('scores');
    
    let open1 = false;
    let open2 = false;
    let open3 = false;
    [h1,div1].forEach(el=>{
        el.addEventListener('click', function () {
            if (open1) {
                icon.className = 'fa fa-arrow-down';
                howto.className = "";
            } else {
                icon.className = 'fa fa-arrow-down open';
                howto.className = "open";
            }
            open1 = !open1;
        });
    });
    
    [h2, div2].forEach(el => {
        el.addEventListener('click', function () {
            if (open2) {
                icon2.className = 'fa fa-arrow-down';
                setting.className = "";
            } else {
                icon2.className = 'fa fa-arrow-down open';
                setting.className = "open";
            }
            open2 = !open2;
        });
    });
    
    [h3, div3].forEach(el => {
        el.addEventListener('click', function () {
            if (open3) {
                icon3.className = 'fa fa-arrow-down';
                scores.className = "";
            } else {
                icon3.className = 'fa fa-arrow-down open';
                scores.className = "open";
            }
            open3 = !open3;
        });
    });
});

