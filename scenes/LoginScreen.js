export default class LoginScreen extends Phaser.Scene {
    constructor() {
        super('LoginScreen');
    }

    preload() {
        this.load.image('loginback', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
    }
    
    create() {
        this.add.image(0, 0, 'loginback')
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
        // 입력 칸 추가
        const inputElement = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
            <input type="text" name="username" id="username" placeholder="ID를 입력하세요"
                style="font-size: 20px; padding: 10px; width: 300px; border-radius: 10px; border: 1px solid #ccc;" />
        `);
    }
}