const Train = require('./train');
const TrackTile = require('./track_tile');

class Game {
    constructor({difficulty, canvasEl}) {
        this.difficulty = difficulty;
        this.objects = [];
        this.colors = ['slateblue', 'khaki', 'crimson','olive','coral', 'lightpink', 'orchid','lime','darkcyan','aqua'];
        this.score = 0;
        this.trainCount = 0;

        this.buildTrack();
        this.addTrain();
        this.ctx = this.setupCanvas(canvasEl);
        window.requestAnimationFrame(() => this.animate(this.ctx));
    }



    setupCanvas(canvasEl) {
        canvasEl.addEventListener('click', e => {
            const x = event.pageX - canvasEl.offsetLeft;
            const y = event.pageY - canvasEl.offsetTop;


            if (Math.abs(x - this.objects[1].pos[0]) < 10 && Math.abs(y - this.objects[1].pos[1])) {
                this.objects[1].toggleNextTrack();
            }
        });

        canvasEl.width = 600;
        canvasEl.height = 600;
        return canvasEl.getContext('2d');
    }

    animate(ctx) {
        ctx.clearRect(0, 0, 600, 600);
        this.objects.forEach(object => {
            object.draw(ctx);
        });
        requestAnimationFrame(() => this.animate(ctx));
    }

    buildTrack() {
        let nextTrackTile5 = new TrackTile({ pos: [500, 100], nextTrackTiles: [], color: 'blue' });
        let nextTrackTile4 = new TrackTile({ pos: [400, 100], nextTrackTiles: [nextTrackTile5] });
        let nextTrackTile3 = new TrackTile({ pos: [400, 200], nextTrackTiles: [nextTrackTile4] });
        let nextTrackTile2 = new TrackTile({ pos: [200, 200], nextTrackTiles: [], color: 'green' });
        let nextTrackTile1 = new TrackTile({ pos: [300, 200], nextTrackTiles: [nextTrackTile2, nextTrackTile3] });
        let startTrackTile = new TrackTile({ pos: [300, 300], nextTrackTiles: [nextTrackTile1] });
        let train = new Train({ startTrackTile, color: 'blue' });

        this.objects = [startTrackTile, nextTrackTile1, nextTrackTile2, nextTrackTile3, nextTrackTile4, nextTrackTile5, train];
    }

    addTrain() {
        if (this.trainCount < 20) {
            this.trainCount += 1;
            window.setTimeout(() => {
                this.objects.push(new Train({ startTrackTile: this.objects[0], color: this.colors[Math.floor(Math.random() * this.difficulty)]}));
                this.addTrain();
            }, 1000 + Math.random() * 2000);
        }
    }
}

export default Game;