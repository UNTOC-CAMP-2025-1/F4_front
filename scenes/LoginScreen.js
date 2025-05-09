// LoginScreen.js
export default class LoginScreen extends Phaser.Scene {
    constructor() {
        super('LoginScreen');
    }

    preload() {
        this.load.image('loginBackground', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
    }

    create() {

        this.add.dom(0, 0);

        // 로그인 화면 배경 추가
        const background = this.add.image(0, 0, 'loginBackground')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        
        const formHTML = `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <input id="username" type="text" placeholder="ID"
                    style="font-size: 20px; text-align: center; padding: 10px; width: 200px; margin-bottom: 20px;">
                <input id="password" type="password" placeholder="Password"
                    style="font-size: 20px; text-align: center; padding: 10px; width: 200px;">
            </div>
        `;

        const form = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY - 50).createFromHTML(formHTML);
        
        const loginButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Login', {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        loginButton.on('pointerdown', () => {
            const username = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;
            console.log('Username:', username);
            console.log('Password:', password);
            // TODO: 로그인 처리 후 씬 이동
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
