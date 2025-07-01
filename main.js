import Start from './scenes/Start.js';
import Home from './scenes/Home.js';
import LoginScreen from './scenes/LoginScreen.js';
import ProfileChange from './scenes/ProfileChange.js';
import CoinShop from './scenes/CoinShop.js';
import GameOver from './scenes/GameOver.js';
import MyInfo from './scenes/MyInfo.js';
import MyScore from './scenes/MyScore.js';
import RankBoard from './scenes/RankBoard.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Start, Home, LoginScreen, ProfileChange, GameOver, MyInfo, MyScore, RankBoard, CoinShop]
};

const game = new Phaser.Game(config);
