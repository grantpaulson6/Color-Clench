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

    addNextTile(trackTile) {
        this.nextTrackTiles.push(trackTile);
        this.nextTrackTile = this.nextTrackTiles[0];
        if (this.nextTrackTiles.length > 1) {
            this.toggleable = true;
        }
    }

    draw(ctx, parentPos) {
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
                ctx.fillStyle = "lightgray";
                // ctx.strokeStyle = "lightgray";
                // ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.strokeStyle = "black";
                ctx.moveTo(this.pos[0], this.pos[1]);
                let nextPosDelta = this.connect(this.pos, this.nextTrackTile.pos);
                ctx.lineTo(this.pos[0] + nextPosDelta[0], this.pos[1] + nextPosDelta[1]);

                ctx.moveTo(this.pos[0], this.pos[1]);
                let nextPosDelta2 = this.connect(this.pos, parentPos);
                ctx.lineTo(this.pos[0] + nextPosDelta2[0], this.pos[1] + nextPosDelta2[1]);
                ctx.stroke();
            }
        }

        if (parentPos === "root") {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.rect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
            ctx.fillStyle = "white";
            ctx.fill();
        } 

        this.nextTrackTiles.forEach( tile => {
            tile.draw(ctx, this.pos);
        });
    }

    connect(pos1, pos2) {
        return [(pos2[0] - pos1[0]) * 20 / (Math.abs((pos2[0] - pos1[0])) ? Math.abs((pos2[0] - pos1[0])) : 1),
            (pos2[1] - pos1[1]) * 20 / (Math.abs((pos2[1] - pos1[1])) ? Math.abs((pos2[1] - pos1[1])) : 1)];
    }
}

export default TrackTile;