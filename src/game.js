import Train from './train';
import TrackTile from './track_tile';

class Game {
    constructor({canvasEl}) {
        this.width = 800;
        this.height = 600;
        this.colors = ['slateblue', 'khaki', 'crimson', 'olive', 'coral', 'lightpink', 'orchid', 'lime', 'darkcyan', 'aqua'];
        this.intersections = [];
        this.ctx = this.setupCanvas(canvasEl);
    }
    
    start({size, speed}) {
        this.trainCount = 0;
        this.branchCount = 0;
        this.stationCount = 0;
        this.requiredStations = size;
        this.speed = speed;
        this.trackNodes = {};
        this.intersections = [];
        this.trains = [];
        this.buildTrack();
        this.trainRef = this.addTrain();
        this.animateRef = window.requestAnimationFrame(() => this.animate(this.ctx));
    }

    stop() {
        if (this.animateRef) {
            window.cancelAnimationFrame(this.animateRef);
        }
        if (this.trainRef) {
            window.clearTimeout(this.trainRef);
        }
    }

    setupCanvas(canvasEl) {
        canvasEl.addEventListener('click', e => {
            const x = event.pageX - canvasEl.offsetLeft;
            const y = event.pageY - canvasEl.offsetTop;

            // this.toggleIntersection(this.rootNode, x, y);
            this.intersections.forEach(intersection => {
                if (Math.sqrt((x - intersection.pos[0]) ** 2 + (y - intersection.pos[1]) ** 2) <= 20) {
                    intersection.toggleNextTrack();
                }
            });
        });

        canvasEl.width = this.width;
        canvasEl.height = this.height;
        return canvasEl.getContext('2d');
    }


    animate(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        // this.objects.forEach(object => {
        //     object.draw(ctx);
        // });

        this.rootNode.draw(ctx, 'root');
        this.trains.forEach(train => {
            train.draw(ctx);
        });
        requestAnimationFrame(() => this.animate(ctx));
    }

    buildTrack() {

        //if root node: start branch count, randomly select initial location, and ensure only one child
        this.branchCount += 1;
        const pos = [Math.floor(Math.random() * this.width/100) * 100 + 50, Math.floor(Math.random() * this.height/100) * 100 + 50];
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
        let i = 0;

        while (nodeQueue.length > 0) {

            currentNode = nodeQueue[0];
            nodeChildrenProbabilty = Math.floor(Math.random() * 3);
            validNodes = this.allValidNodes(currentNode.pos);
            nextNodePos = this.randomValidNode(validNodes);

            // make a station, end that branch
            if (nodeChildrenProbabilty === 2 && (this.branchCount - this.stationCount > 1) && validNodes.length > 0 && i > 3) {
                this.stationCount += 1;
                this.trackNodes[nextNodePos] = true;
                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [], color: this.colors[this.stationCount - 1] });
                currentNode.addNextTile(nextNode);
            } 
            // split and add a branch, adding two to queue
            else if (this.branchCount < this.requiredStations && (nodeChildrenProbabilty === 2 || nodeChildrenProbabilty === 1) && validNodes.length > 1 && i > 3) {
                this.branchCount += 1;
                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });
                this.trackNodes[nextNodePos] = true;

                nextNodePos2 = this.randomValidNode(this.allValidNodes(currentNode.pos));
                this.trackNodes[nextNodePos2] = true;
                nextNode2 = new TrackTile({ pos: nextNodePos2, nextTrackTiles: [] });

                currentNode.addNextTile(nextNode);
                currentNode.addNextTile(nextNode2);
                this.intersections.push(currentNode);
                nodeQueue.push(nextNode);
                nodeQueue.push(nextNode2);
            }

            else {
                // if more than 1 remaing station, just add one child, aka just plain track, add one to queue
                if (validNodes.length > 0 && this.requiredStations - this.stationCount > 1) {
                    nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });
                    this.trackNodes[nextNodePos] = true;
                    currentNode.addNextTile(nextNode);
                    nodeQueue.push(nextNode);
                    i++;
                // if one remaing station, 1 in 2 shot of turning into station, else continue with one child
                } else if (this.stationCount < this.requiredStations) {
                    if (validNodes.length > 0 && Math.floor(Math.random() * 2) === 0) {
                        nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });
                        this.trackNodes[nextNodePos] = true;
                        currentNode.addNextTile(nextNode);
                        nodeQueue.push(nextNode);
                    } else {
                        this.stationCount += 1;
                        currentNode.color = this.colors[this.stationCount - 1];
                    }
                }
            }
            nodeQueue.shift();
        }

        // if track isn't of desired number of stations, retry
        if (this.stationCount != this.requiredStations) {
            this.trainCount = 0;
            this.branchCount = 0;
            this.stationCount = 0;
            this.trackNodes = {};
            this.buildTrack();
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
        return (!this.trackNodes[pos] && pos[0] > 0 && pos[0] < this.width && pos[1] > 0 && pos[1] < this.height);
    }

    addTrain() {
        if (this.trainCount < 5) {
            this.trainCount += 1;
            this.trainRef = window.setTimeout(() => {
                console.log(this.trainCount, ' train count');
                this.trains.push(new Train({ startTrackTile: this.rootNode, speed: this.speed, color: this.colors[Math.floor(Math.random() * this.requiredStations)] }));
                this.addTrain();
            }, 2000 + Math.random() * 4000);
        } else {
            if (!this.trains[this.trains.length -1].finished) {
                this.trainRef = window.setTimeout(() => {
                    this.addTrain();
                }, 1000);
            } else {
                console.log('game over');
            }
        }
    }

    score() {
        let score = 0;
        this.trains.forEach( train => {
            if (train.scored) {
                score += 1;
            }
        });
        console.log(score);
        return score;
    }
}

export default Game;