// const Game = require('./game');
// const GameView = require('./game_view');
const Train = require('./train');
const TrackTile = require('./track_tile');

document.addEventListener('DOMContentLoaded', () => {
    const canvasEl = document.getElementById('game-canvas');
    canvasEl.width = 600;
    canvasEl.height = 600;

    
    const ctx = canvasEl.getContext('2d');
    
    
    let nextTrackTile3 = new TrackTile({ pos: [400, 200], nextTrackTiles: [] });
    let nextTrackTile2 = new TrackTile({ pos: [200, 200], nextTrackTiles: [] });
    let nextTrackTile1 = new TrackTile({ pos: [300, 200], nextTrackTiles: [nextTrackTile2, nextTrackTile3] });
    let startTrackTile = new TrackTile({ pos: [300, 300], nextTrackTiles: [nextTrackTile1]});
    let train = new Train({startTrackTile, color: 'red'});

    // const tiles = [nextTrackTile1]
    
    canvasEl.addEventListener('click', e => {
        const x = event.pageX - canvasEl.offsetLeft;
        const y = event.pageY = canvasEl.offsetTop;

        if (Math.abs(x - nextTrackTile1.pos[0]) < 10 && Math.abs(y - nextTrackTile1.pos[1])) {
            nextTrackTile1.toggleNextTrack();
        }
    })
    // train.draw(ctx);

    nextTrackTile1.draw(ctx);
    const animate = () => {
        train.draw(ctx);
        train.move();
        requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
    // const game = new Game();
    // new GameView(game, ctx).start();
});
