
class Train {
    constructor({ startTrackTile, color }) {
        this.startTrackTile = startTrackTile;
        this.endTrackTile = startTrackTile.nextTrackTile;
        this.color = color;
        this.pos = [startTrackTile.pos[0], startTrackTile.pos[1]];
    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    move() {
        const deltaX = (this.endTrackTile.pos[0] - this.startTrackTile.pos[0]) / 100;
        const deltaY = (this.endTrackTile.pos[1] - this.startTrackTile.pos[1]) / 100;
        this.pos[0] += deltaX;
        this.pos[1] += deltaY;
        if (this.pos[0] === this.endTrackTile.pos[0] && this.pos[1] === this.endTrackTile.pos[1]) {
            this.startTrackTile = this.endTrackTile;
            this.endTrackTile = this.endTrackTile.nextTrackTile;
        }
    }
}

module.exports = Train;