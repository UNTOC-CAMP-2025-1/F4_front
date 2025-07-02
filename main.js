import Start from './scenes/Start.js';
import Home from './scenes/Home.js';
import LoginScreen from './scenes/LoginScreen.js';
import Mypage from './scenes/Mypage.js';
import SignUp from './scenes/SignUp.js';
import ChangePW from './scenes/ChangePW.js';
import NewPW from './scenes/NewPW.js';
import BestScore from './scenes/BestScore.js';
import CoinShop from './scenes/CoinShop.js';
import GameOver from './scenes/GameOver.js';
import MyInfo from './scenes/MyInfo.js';
import MyScore from './scenes/MyScore.js';
import ProfileChange from './scenes/ProfileChange.js';
import RankBoard from './scenes/RankBoard.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [Start, Home, LoginScreen, Mypage, SignUp, ChangePW, NewPW, BestScore, CoinShop, GameOver, MyInfo, MyScore, ProfileChange, RankBoard],
    dom: {
        createContainer: true
    }
};

const game = new Phaser.Game(config);
