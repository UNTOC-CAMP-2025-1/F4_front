// scenes/GameOver.js
export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        // 필요한 이미지 로딩
        this.load.image('background', 'assets/back.png');  
        this.load.image('trophy', 'assets/trophy.png');  // 트로피 이미지 추가
        this.load.image('button', 'assets/button.png');   
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // 배경
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(width, height).setDepth(0);

        // 타이틀
        const trophyScale = 0.2;
        const spacing = 60;

        this.add.image(centerX - 120 - spacing, height * 0.15, 'trophy')
            .setOrigin(0.5)
            .setScale(trophyScale);

        this.add.text(centerX, height * 0.15, '순위', {
            fontSize: '70px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.image(centerX + 120 + spacing, height * 0.15, 'trophy')
            .setOrigin(0.5)
            .setScale(trophyScale);

        // 순위 표시 박스
        const rankBox = this.add.rectangle(centerX, height * 0.35, width * 0.5, height * 0.1, 0xd8b0f7, 0.7)
            .setOrigin(0.5)
            .setDepth(1);

        // 버튼 - 나가기
        const exitButton = this.add.rectangle(centerX - width * 0.2, height * 0.65, 400, 300, 0xd8b0f7, 0.9)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const exitText = this.add.text(exitButton.x, exitButton.y, '나가기', {
            fontSize: '70px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        exitButton.on('pointerdown', () => this.scene.start('Home'))
            .on('pointerover', () => {
                this.tweens.add({
                    targets: [exitButton, exitText],
                    y: '+=10',
                    duration: 100,
                    ease: 'Power2'
                });
            })
            .on('pointerout', () => {
                this.tweens.add({
                    targets: [exitButton, exitText],
                    y: '-=10',
                    duration: 100,
                    ease: 'Power2'
                });
            });

        // 버튼 - 재시작
        const restartButton = this.add.rectangle(centerX + width * 0.2, height * 0.65, 400, 300, 0xd8b0f7, 0.9)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        const restartText = this.add.text(restartButton.x, restartButton.y, '재시작', {
            fontSize: '70px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        restartButton.on('pointerdown', () => this.scene.start('RankBoard'))
            .on('pointerover', () => {
                this.tweens.add({
                    targets: [restartButton, restartText],
                    y: '+=10',
                    duration: 100,
                    ease: 'Power2'
                });
            })
            .on('pointerout', () => {
                this.tweens.add({
                    targets: [restartButton, restartText],
                    y: '-=10',
                    duration: 100,
                    ease: 'Power2'
                });
            });
    }
}
