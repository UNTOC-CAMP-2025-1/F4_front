// scenes/MainMenuScene.js
export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // 필요한 경우 이미지나 폰트 로딩 가능
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, centerY - 150, 'Title', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

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
