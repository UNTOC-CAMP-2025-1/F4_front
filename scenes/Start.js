// Start.js
export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('back', 'assets/back.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('button', 'assets/button.png');
        // 필요한 경우 이미지나 폰트 로딩 가능
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        
        //배경
        this.add.image(0, 0, 'back').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        // Title
        const titleImage = this.add.image(centerX, centerY - 150, 'title')
            .setOrigin(0.5)
            .setScale(1.0);
        
        this.tweens.add({
            targets: titleImage,
            y: titleImage.y + 30,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // ‘start’ 버튼
        const startButtonY = centerY + 20;
        const startButton = this.add.image(centerX, startButtonY, 'button')
            .setOrigin(0.43, 0.5)
            .setScale(0.6)
            .setInteractive();

        const startText = this.add.text(centerX, startButtonY-20, 'START', {
            fontSize: '45px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();
        
        startButton.on('pointerdown', () => {
            console.log("start 버튼 눌림");
            startButton.setScale(0.55);  // 버튼 크기 줄어듦
            startText.setColor('#ff0000');  // 텍스트 색상 빨간색으로 변경
        });

        startButton.on('pointerup', () => {
            this.scene.start('GameScene');
        });

        

        // ‘로그인’ 버튼
        const loginButtonY = centerY + 130;
        const loginButton = this.add.image(centerX, loginButtonY, 'button')
            .setOrigin(0.43, 0.5)
            .setScale(0.6)
            .setInteractive();

        this.add.text(centerX, loginButtonY-20, 'LOGIN', {
            fontSize: '45px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        loginButton.on('pointerdown', () => {
            console.log('로그인 버튼 클릭');
        });

        // ‘테마’ 버튼
        const themeButtonY = centerY + 245;
        const themeButton = this.add.image(centerX, centerY + 245, 'button')
            .setOrigin(0.43, 0.5)
            .setScale(0.6)
            .setInteractive();

        this.add.text(centerX, themeButtonY-20, 'STYLE', {
            fontSize: '45px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        themeButton.on('pointerdown', () => {
            console.log('테마 변경 버튼 클릭');
        });
    }
}
