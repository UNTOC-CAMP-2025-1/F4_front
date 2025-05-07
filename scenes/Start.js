// Start.js
export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('back', 'assets/back.png');
        this.load.image('title', 'assets/title.png');
        // 필요한 경우 이미지나 폰트 로딩 가능
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        //배경
        this.add.image(0, 0, 'back').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        // Title
        this.add.image(centerX, centerY - 100, 'title')
            .setOrigin(0.5)
            .setScale(0.9);

        // ‘가시가’ 버튼
        const startButton = this.add.text(centerX, centerY - 50, '시작', {
            fontSize: '32px',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 },
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // ‘로그인’ 버튼
        const loginButton = this.add.text(centerX, centerY + 20, '로그인', {
            fontSize: '32px',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 },
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        loginButton.on('pointerdown', () => {
            console.log('로그인 버튼 클릭');
        });

        // ‘테마’ 버튼
        const themeButton = this.add.text(centerX, centerY + 90, '테마', {
            fontSize: '32px',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 },
            color: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        themeButton.on('pointerdown', () => {
            console.log('테마 변경 버튼 클릭');
        });
    }
}
