const Train = require('./train');
const TrackTile = require('./track_tile');

document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');
    canvasEl.width = 600;
    canvasEl.height = 600;


    const ctx = canvasEl.getContext('2d');


    let nextTrackTile5 = new TrackTile({ pos: [500, 100], nextTrackTiles: [], color: 'blue' });
    let nextTrackTile4 = new TrackTile({ pos: [400, 100], nextTrackTiles: [nextTrackTile5] });
    let nextTrackTile3 = new TrackTile({ pos: [400, 200], nextTrackTiles: [nextTrackTile4] });
    let nextTrackTile2 = new TrackTile({ pos: [200, 200], nextTrackTiles: [], color: 'green' });
    let nextTrackTile1 = new TrackTile({ pos: [300, 200], nextTrackTiles: [nextTrackTile2, nextTrackTile3] });
    let startTrackTile = new TrackTile({ pos: [300, 300], nextTrackTiles: [nextTrackTile1] });
    let train = new Train({ startTrackTile, color: 'blue' });

    const objects = [nextTrackTile1, nextTrackTile2, nextTrackTile3, nextTrackTile4, nextTrackTile5, startTrackTile, train];

    canvasEl.addEventListener('click', e => {
        const x = event.pageX - canvasEl.offsetLeft;
        const y = event.pageY = canvasEl.offsetTop;

        if (Math.abs(x - nextTrackTile1.pos[0]) < 10 && Math.abs(y - nextTrackTile1.pos[1])) {
            nextTrackTile1.toggleNextTrack();
        }
    });

    const animate = () => {
        ctx.clearRect(0,0,600,600);
        objects.forEach( object => {
            object.draw(ctx);
        });
        requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
});
