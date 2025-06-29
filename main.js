import Start from './scenes/Start.js';
import Home from './scenes/Home.js';
import LoginScreen from './scenes/LoginScreen.js';
import Style from './scenes/Style.js';
import SignUp from './scenes/SignUp.js';
import ChangePW from './scenes/ChangePW.js';
import NewPW from './scenes/NewPW.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [Start, Home, LoginScreen, Style, SignUp, ChangePW, NewPW],
    dom: {
        createContainer: true
    }
};

const game = new Phaser.Game(config);
