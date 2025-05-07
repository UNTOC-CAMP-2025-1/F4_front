import Start from './scenes/Start.js';
import Home from './scenes/Home.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Start, Home]
};

const game = new Phaser.Game(config);
