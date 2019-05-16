
class TrackTile {
    constructor({ pos, nextTrackTiles, color }) {
        this.pos = pos;
        this.nextTrackTileIndex = 0;
        this.nextTrackTiles = nextTrackTiles;
        this.nextTrackTile = this.nextTrackTiles[0];
        this.toggleable = nextTrackTiles.length > 1 ? true : false;
        this.color = color;
    }

    toggleNextTrack() {
        this.nextTrackTileIndex = ((this.nextTrackTileIndex + 1) % this.nextTrackTiles.length);
        this.nextTrackTile = this.nextTrackTiles[this.nextTrackTileIndex];
    }

    draw(ctx) {
        if (this.color) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);
            ctx.fill();
        } else {
            this.nextTrackTiles.forEach(nextTile => {
                ctx.beginPath();
                ctx.moveTo(this.pos[0], this.pos[1]);
                ctx.lineTo(nextTile.pos[0], nextTile.pos[1]);
                ctx.stroke();
            });
            if (this.toggleable) {
                ctx.beginPath();
                ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.moveTo(this.pos[0], this.pos[1]);
                ctx.lineTo(this.nextTrackTile.pos[0], this.nextTrackTile.pos[1]);
                ctx.stroke();
            }
        }

    }
}

module.exports = TrackTile;