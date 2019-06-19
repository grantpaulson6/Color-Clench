import Train from './train';
import TrackTile from './track_tile';

class Game {
    constructor({canvasEl}) {
        this.width = canvasEl.width;
        this.height = canvasEl.height;
        this.lastTrainColor = null;
        this.colors = ['slateblue', 'khaki', 'crimson', 'olive', 'coral', 'lightpink', 'orchid', 'lime', 'darkcyan', 'aqua'];
        this.scores = [];
        this.intersections = [];
        this.ctx = this.setupCanvas(canvasEl);
        this.trains = [];
        this.rootNode = {draw: ()=>{}};
        this.animateRef = window.requestAnimationFrame(() => this.animate(this.ctx));
    }
    
    start({size, speed, frequency, quantity, difficulty}) {
        const fullScreenAdjust = this.width >= 700 ? 2 : 0;
        this.col_x = Math.floor((size - 3) / 2 ) + 4 + fullScreenAdjust;
        if (this.width === 900) {
            this.unit_length = 100;
        } else {
            this.unit_length = Math.floor(this.width/this.col_x);
        }
        this.row_y = Math.floor(this.height / this.unit_length);
        this.offsetX = (this.width - this.col_x*this.unit_length)/2 + this.unit_length/2;
        this.offsetY = (this.height - this.row_y*this.unit_length)/2 + this.unit_length/2;
        this.branchCount = 0;
        this.stationCount = 0;
        this.difficulty = difficulty;
        this.requiredStations = size;
        this.speed = speed;
        this.frequency = frequency;
        this.numTrains = quantity;
        this.trackNodes = {};
        this.intersections = [];
        this.trains = [];
        this.buildTrack();
        this.addTrain();
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
        const pos = [Math.floor(Math.random() * this.col_x)* this.unit_length + this.offsetX,
            Math.floor(Math.random() * this.row_y) * this.unit_length + this.offsetY];
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
            if (nodeChildrenProbabilty === 2 && (this.branchCount - this.stationCount > 1) && validNodes.length > 0 && i > 2) {
                this.stationCount += 1;
                this.trackNodes[nextNodePos] = true;
                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [], color: this.colors[this.stationCount - 1] });
                currentNode.addNextTile(nextNode);
            } 
            // split and add a branch, adding two to queue
            else if (this.branchCount < this.requiredStations && (nodeChildrenProbabilty === 2 || nodeChildrenProbabilty === 1) && validNodes.length > 1 && i > 2) {
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
        [[pos[0] + this.unit_length, pos[1]], [pos[0] - this.unit_length, pos[1]], [pos[0], pos[1] + this.unit_length], [pos[0], pos[1] - this.unit_length]].forEach(pos => {
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
        if (this.trains.length < this.numTrains) {
            this.trainRef = window.setTimeout(() => {
                this.trains.push(new Train({ startTrackTile: this.rootNode, speed: this.speed, color: this.nextTrainColor() }));
                this.addTrain();
            }, this.frequency *1000 / 2 + Math.random() * this.frequency * 1000 );
        } else {
            if (this.allTrainsFinished()) {
                let score = this.score();
                this.scores.push(score);
                this.populateScores();
            } else {
                this.trainRef = window.setTimeout(() => {
                    this.addTrain();
                }, 1000);
            }
        }
    }

    // no back to back repeating colors
    nextTrainColor() {
        let color = this.colors[Math.floor(Math.random() * this.requiredStations)];
        if (color === this.lastTrainColor) {
            return this.nextTrainColor();
        }
        this.lastTrainColor = color;
        return color;
    }

    allTrainsFinished() {
        for (let train of this.trains) {
            if (!train.finished) {
                return false;
            }
        }
        return true;
    }

    score() {
        let score = 0;
        this.trains.forEach( train => {
            if (train.scored) {
                score += 1;
            }
        });
        // const difficulty = this.difficulty();
        return {correct: score, 
            missed: (this.numTrains - score), 
            overall: +((this.difficulty * score / this.numTrains).toFixed(2))};
    }

    // difficulty() {
    //     const size = (this.requiredStations - 3 ) * 3 / 7;
    //     const speed = (180 - this.speed) * 2.5 / 160;
    //     const frequency = (6 -this.frequency) * 2.5 / 5;
    //     const quantity = (this.numTrains - 5)* 2 / 45;
    //     const difficulty = size + speed + frequency + quantity;
    //     return difficulty;
    // }

    populateScores() {
        const scores = document.getElementById('score-list');
        const newScore = document.createElement('tr');
        const lastScore = this.scores[this.scores.length - 1];
        Object.values(lastScore).forEach(value => {
            let entry = document.createElement('td')
            entry.innerHTML = value;
            newScore.appendChild(entry);
        });
        scores.appendChild(newScore);
        this.sortList();
    }

    sortList() {
        const matches = document.getElementById("score-list");
        Array.from(matches.getElementsByTagName("tr"))
            .slice(1)
            .sort((a, b) => Number(b.lastChild.textContent) - Number(a.lastChild.textContent))
            .forEach(row => matches.appendChild(row));
    }

}

export default Game;