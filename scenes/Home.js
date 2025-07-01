// Home.js
export default class Home extends Phaser.Scene {
    constructor() {
        super('Home');
    }

    preload() {
        this.load.image('homeback', 'assets/back.png');
        this.load.image('highscore', 'assets/highscore.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('heart_start', 'assets/heart_start.png');
        this.load.image('arrow', 'assets/arrow.png');
    }

    create() {
        const background = this.add.image(0, 0, 'homeback')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        console.log('background loaded');

        //highscore
        const highscoreImage = this.add.image(this.cameras.main.centerX-250, 120, 'highscore')
            .setOrigin(0.5)
            .setScale(0.8);

        const highscoreText = this.add.text(highscoreImage.x + 90, highscoreImage.y, '로그인 필요', {
            fontSize: '38px',
            color: '#000000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        //coin
        const coinImage = this.add.image(highscoreImage.x + 600, highscoreImage.y, 'coin')
            .setOrigin(0.5)
            .setScale(0.8);

        const coinText = this.add.text(coinImage.x + 50, coinImage.y, '0', {
            fontSize: '38px',
            color: '#000000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const heartStartImage = this.add.image(highscoreImage.x, highscoreImage.y + 330, 'heart_start')
            .setOrigin(0.5)
            .setScale(0.47)
            .setInteractive({ useHandCursor: true }); 

        heartStartImage.on('pointerdown', () => {
            console.log('Heart Start Clicked');
            this.scene.start('RankBoard'); 
        });

        this.tweens.add({
            targets: heartStartImage,
            y: heartStartImage.y + 20,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 뒤로가기 버튼
        const backButton = this.add.image(50, this.cameras.main.height - 60, 'arrow') // 화면 밑 왼쪽에 배치
            .setOrigin(0.5)
            .setScale(0.5) 
            .setInteractive({ useHandCursor: true });

        backButton.on('pointerdown', () => {
            console.log('Back Button Clicked');
            this.scene.start('Start');
        });

    }
}
