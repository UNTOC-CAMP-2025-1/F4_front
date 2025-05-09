// Style.js
export default class Style extends Phaser.Scene {
    constructor() {
        super('Style');
    }

    preload() {
        this.load.image('styleBackground', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
    }

    create() {
        const background = this.add.image(0, 0, 'styleBackground')
        .setOrigin(0)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

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