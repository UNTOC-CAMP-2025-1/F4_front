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

        // highscore
        const highscoreImage = this.add.image(this.cameras.main.centerX - 250, 120, 'highscore')
            .setOrigin(0.5)
            .setScale(0.8);

        // coin
        const coinImage = this.add.image(highscoreImage.x + 600, highscoreImage.y, 'coin')
            .setOrigin(0.5)
            .setScale(0.8);



        //반투명 배경 그래픽 생성 함수
        function createRoundedPanel(scene, x, y, width, height, radius, color, alpha) {
            const graphics = scene.add.graphics({ x: 0, y: 0 });
            graphics.fillStyle(color, alpha);
            graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, radius);
            return graphics;
        }

        //점수-백연결해야함
        this.highscoreValueText = this.add.text(highscoreImage.x, highscoreImage.y, '0', {
            fontSize: '28px',
            color: '#000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);


        //코인-백연결해야함함
        this.coinValueText = this.add.text(coinImage.x + 70, coinImage.y, '0', {
            fontSize: '28px',
            color: '#000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        //테스트 용, 삭제해야함
        const tempScore = 12345;
        const tempCoins = 99;
        this.highscoreValueText.setText(tempScore.toString());
        this.coinValueText.setText(tempCoins.toString());

        //heart_start button
        const heartStartImage = this.add.image(highscoreImage.x, highscoreImage.y + 330, 'heart_start')
            .setOrigin(0.5)
            .setScale(0.47);

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
