import Start from './scenes/Start.js';
import Home from './scenes/Home.js';
import LoginScreen from './scenes/LoginScreen.js';
import CoinShop from './scenes/CoinShop.js';
import GameOver from './scenes/GameOver.js';
import MyInfo from './scenes/MyInfo.js';
import MyScore from './scenes/MyScore.js';
import RankBoard from './scenes/RankBoard.js';
import EveryScore from './scenes/EveryScore.js';
import ProfileChange from './scenes/ProfileChange.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Start, Home, LoginScreen, GameOver, MyInfo, MyScore, RankBoard, CoinShop, EveryScore, ProfileChange]
};

const game = new Phaser.Game(config);
