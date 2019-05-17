const Train = require('./train');
const TrackTile = require('./track_tile');

class Game {
    constructor({difficulty, canvasEl}) {
        this.difficulty = difficulty;
        this.colors = ['slateblue', 'khaki', 'crimson', 'olive', 'coral', 'lightpink', 'orchid', 'lime', 'darkcyan', 'aqua'];
        this.score = 0;

        this.trainCount = 0;
        this.branchCount = 0;
        this.stationCount = 0;
        this.requiredStations = difficulty;
        this.trackNodes = {};

        //use station count for train colors
        this.objects = [];
        this.buildTrack();
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
        this.rootNode.draw(ctx);
        // requestAnimationFrame(() => this.animate(ctx));
    }

    buildTrack(prevPos) {

        //if root node: start branch count, randomly select initial location, and ensure only one child
        this.branchCount += 1;
        const pos = [Math.floor(Math.random() * 9) * 100 + 50, Math.floor(Math.random() * 7) * 100 + 50];
        this.rootNode = new TrackTile({ pos: pos, nextTrackTiles: [] });
        this.trackNodes[pos] = this.rootNode;


        let validNodes = this.allValidNodes(pos);
        let nextNodePos = this.randomValidNode(validNodes);
        let nextChildNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: []});
        this.trackNodes[nextNodePos] = nextNodePos;
        this.rootNode.addNextTile(nextChildNode);
        const nodeQueue = [nextChildNode];
        let nextNode;
        let nextNode2;
        let nextNodePos2;
        let currentNode;

        let nodeChildrenProbabilty;
        while (nodeQueue.length > 0) {

            currentNode = nodeQueue[0];
            nodeChildrenProbabilty = Math.floor(Math.random() * 3);
            validNodes = this.allValidNodes(currentNode.pos);
            nextNodePos = this.randomValidNode(validNodes);

            // make a station, end that branch
            if (nodeChildrenProbabilty === 2 && (this.branchCount - this.stationCount > 1) && validNodes.length > 0) {
                this.stationCount += 1;
                this.trackNodes[nextNodePos] = true;
                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [], color: this.colors[this.stationCount - 1] });
                currentNode.addNextTile(nextNode);
            } 
            // split and add a branch, adding two to queue
            else if (this.branchCount < this.requiredStations && (nodeChildrenProbabilty === 2 || nodeChildrenProbabilty === 1) && validNodes.length > 1) {
                this.branchCount += 1;
                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });
                this.trackNodes[nextNodePos] = true;

                nextNodePos2 = this.randomValidNode(this.allValidNodes(currentNode.pos));
                this.trackNodes[nextNodePos2] = true;
                nextNode2 = new TrackTile({ pos: nextNodePos2, nextTrackTiles: [] });

                currentNode.addNextTile(nextNode);
                currentNode.addNextTile(nextNode2);
                nodeQueue.push(nextNode);
                nodeQueue.push(nextNode2);
            }

            // just add one child, aka just plain track, add one to queue
            else if (validNodes.length > 0) {
                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });
                this.trackNodes[nextNodePos] = true;
                currentNode.addNextTile(nextNode);
                nodeQueue.push(nextNode);
            } else if (this.stationCount < this.requiredStations) {
                this.stationCount += 1;
                currentNode.color = this.colors[this.stationCount - 1];
            }
            nodeQueue.shift();
        }
    }

    randomValidNode(validNodes) {
        if (validNodes.length > 0) {
            let randIdx = Math.floor(Math.random() * validNodes.length);
            return validNodes[randIdx];
        }
        return validNodes;
    }

    allValidNodes(pos) {
        let validNodes = [];
        [[pos[0] + 100, pos[1]], [pos[0] - 100, pos[1]], [pos[0], pos[1] + 100], [pos[0], pos[1] - 100]].forEach(pos => {
            if (this.validNode(pos)) {
                validNodes.push(pos);
            }
        });
        return validNodes;
    }

    validNode(pos) {
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