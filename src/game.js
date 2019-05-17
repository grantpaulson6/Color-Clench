const Train = require('./train');
const TrackTile = require('./track_tile');

class Game {
    constructor({ difficulty, canvasEl }) {
        this.difficulty = difficulty;
        this.colors = ['slateblue', 'khaki', 'crimson', 'olive', 'coral', 'lightpink', 'orchid', 'lime', 'darkcyan', 'aqua'];
        this.score = 0;
        
        this.trainCount = 0;
        this.branchCount = 0;
        this.stationCount = 0;
        this.requiredStations = difficulty;
        this.trackNodes = {};
        
        
        this.objects = this.buildTrack();
        // this.addTrain();
        this.ctx = this.setupCanvas(canvasEl);
        // window.requestAnimationFrame(() => this.animate(this.ctx));
        this.animate(this.ctx);
    }



    setupCanvas(canvasEl) {
        canvasEl.addEventListener('click', e => {
            const x = event.pageX - canvasEl.offsetLeft;
            const y = event.pageY - canvasEl.offsetTop;


            if (Math.abs(x - this.objects[1].pos[0]) < 10 && Math.abs(y - this.objects[1].pos[1])) {
                this.objects[1].toggleNextTrack();
            }
        });

        canvasEl.width = 900;
        canvasEl.height = 700;
        return canvasEl.getContext('2d');
    }

    animate(ctx) {
        console.log('stations: ', this.stationCount, '  branches:', this.branchCount);
        console.log(this.objects);
        ctx.clearRect(0, 0, 900, 700);
        // this.objects.forEach(object => {
        //     object.draw(ctx);
        // });
        this.objects.draw(ctx);
        requestAnimationFrame(() => this.animate(ctx));
    }

    buildTrack(prevPos) {
        console.log(prevPos)
        // console.log(this.trackNodes);
        console.log('stations: ',this.stationCount,'  branches:', this.branchCount);
        // let nextTrackTile5 = new TrackTile({ pos: [500, 100], nextTrackTiles: [], color: 'blue' });
        // let nextTrackTile4 = new TrackTile({ pos: [400, 100], nextTrackTiles: [nextTrackTile5] });
        // let nextTrackTile3 = new TrackTile({ pos: [400, 200], nextTrackTiles: [nextTrackTile4] });
        // let nextTrackTile2 = new TrackTile({ pos: [200, 200], nextTrackTiles: [], color: 'green' });
        // let nextTrackTile1 = new TrackTile({ pos: [300, 200], nextTrackTiles: [nextTrackTile2, nextTrackTile3] });
        // let startTrackTile = new TrackTile({ pos: [300, 300], nextTrackTiles: [nextTrackTile1] });
        // let train = new Train({ startTrackTile, color: 'blue' });
        // this.objects = [startTrackTile, nextTrackTile1, nextTrackTile2, nextTrackTile3, nextTrackTile4, nextTrackTile5, train];



        //if root node: start branch count, randomly select initial location, and ensure only one child
        if (this.branchCount === 0) {
            this.branchCount += 1;
            const pos = [Math.floor(Math.random() * 9) * 100 + 50, Math.floor(Math.random() * 7) * 100 + 50];
            this.trackNodes[pos] = true;
            return new TrackTile({ pos: pos, nextTrackTiles: [this.buildTrack(pos)] });
        }
        const nodeChildrenProbabilty = Math.floor(Math.random() * 3);
        const validTracks = this.allValidTracks(prevPos);
        const oneTrack = this.randomValidTrack(validTracks);
        
        // if (validTracks.length === 0) {
        //     return new TrackTile({})
        // } else 

        //logic for if branch count = requiredStations
        if (this.requiredStations === this.branchCount) {
            this.stationCount += 1;
            this.trackNodes[oneTrack] = true;
            return new TrackTile({ pos: oneTrack, nextTrackTiles: [], color: this.colors[this.stationCount - 1] });
        } 
        // 25% chance of becoming station, as long as it isn't the last open branch with more stations needed
        if (nodeChildrenProbabilty === 2 && (this.branchCount - this.stationCount > 1) && validTracks.length > 0) {
            this.stationCount += 1;
            this.trackNodes[oneTrack] = true;
            return new TrackTile({pos: oneTrack, nextTrackTiles: [], color: this.colors[this.stationCount-1]});
        // 25% of branching
        } else if ((nodeChildrenProbabilty == 1 || nodeChildrenProbabilty == 2) && validTracks.length > 1 && (this.branchCount < this.requiredStations)) {
            this.branchCount += 1;

            this.trackNodes[oneTrack] = true;

            new TrackTile({ pos: oneTrack, nextTrackTiles: [this.buildTrack(oneTrack)] });

            const pos2 = this.randomValidTrack(this.allValidTracks(prevPos));
            this.trackNodes[pos2] = true;
            new TrackTile({ pos: pos2, nextTrackTiles: [this.buildTrack(pos2)] });


        }  else if (validTracks.length > 0) {
            //handle no valid nodes
            this.trackNodes[oneTrack] = true;
            return new TrackTile({ oneTrack, nextTrackTiles: [this.buildTrack(oneTrack)] });
        }
        console.log('shouldnt');
    }

    randomValidTrack(validTracks) {
        if (validTracks.length > 0) {
            let randIdx = Math.floor(Math.random() * validTracks.length);
            return validTracks[randIdx];
        }
        return validTracks;
    }

    allValidTracks(pos) {
        let validTracks = [];
        [[pos[0] + 100, pos[1]], [pos[0] - 100, pos[1]], [pos[0], pos[1] + 100], [pos[0], pos[1] - 100]].forEach(pos => {
            if (this.validTrack(pos)) {
                validTracks.push(pos);
            }
        });
        return validTracks;
    }

    validTrack(pos) {
        return (!this.trackNodes[pos] && pos[0] > 0 && pos[0] < 900 && pos[1] > 0 && pos[1] < 700);
    }

    addTrain() {
        if (this.trainCount < 20) {
            this.trainCount += 1;
            window.setTimeout(() => {
                this.objects.push(new Train({ startTrackTile: this.objects[0], color: this.colors[Math.floor(Math.random() * this.difficulty)] }));
                this.addTrain();
            }, 1000 + Math.random() * 2000);
        }
    }
}

export default Game;