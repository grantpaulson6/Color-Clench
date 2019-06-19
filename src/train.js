class Train {
    constructor({ startTrackTile, color, speed, scored, missed }) {
        this.startTrackTile = startTrackTile;
        this.endTrackTile = startTrackTile.nextTrackTile;
        this.color = color;
        this.pos = [startTrackTile.pos[0], startTrackTile.pos[1]];
        this.renderCount = 0;
        this.renderInterval = speed;
        this.scoredF = scored;
        this.missed = missed;
    }


    draw(ctx) {
        if (!this.finished) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
            ctx.fill();
            this.move();
        }
    }

    move() {
        const deltaX = (this.endTrackTile.pos[0] - this.startTrackTile.pos[0]) / this.renderInterval;
        const deltaY = (this.endTrackTile.pos[1] - this.startTrackTile.pos[1]) / this.renderInterval;
        this.pos[0] += deltaX;
        this.pos[1] += deltaY;
        this.renderCount += 1;
        if (this.renderCount >= this.renderInterval) {
            if (this.endTrackTile.color) {
                this.finished = true;
                if (this.color === this.endTrackTile.color) {
                    this.scored = true;
                    this.scoredF();
                } else {
                    this.missed();
                }
            } else {
                this.renderCount = 0;
                this.startTrackTile = this.endTrackTile;
                this.endTrackTile = this.endTrackTile.nextTrackTile;
            }
        }
    }
}

export default Train;