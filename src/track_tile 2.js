
class TrackTile {
    constructor({pos, nextTrackTiles}) {
        this.pos = pos;
        this.nextTrackTileIndex = 0;
        this.nextTrackTiles = nextTrackTiles;
        this.nextTrackTile = this.nextTrackTiles[0];
        this.toggleable = nextTrackTiles.length > 1 ? true : false;
    }

    toggleNextTrack() {
        this.nextTrackTileIndex = ((this.nextTrackTileIndex + 1) % this.nextTrackTiles.length);
        this.nextTrackTile = this.nextTrackTiles[this.nextTrackTileIndex];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
}

// export default TrackTile;
module.exports = TrackTile;