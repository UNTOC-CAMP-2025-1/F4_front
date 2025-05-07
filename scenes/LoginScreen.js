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
        // 로그인 화면 배경 추가
        const background = this.add.image(0, 0, 'loginBackground')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        
        //id 입력칸
        const inputText = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY-100).createFromHTML(`
            <input type="text" name="username" value="ID" style="font-size: 30px; text-align: center; padding: 10px; width: 250px; color: #000000; position: absolute; z-index: 10;">`
        );

        inputText.addListener('focus');

        inputText.on('focus', function() {
            if(inputText.node.value === "ID") {
                inputText.node.value = "";
            }
        });
        // 로그인 버튼 추가
        const loginButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Login', {
            fontSize: '40px',
            color: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        loginButton.on('pointerdown', () => {
            console.log('Login Button Clicked');
            const username = inputText.node.value; // 입력된 아이디를 가져옴
            console.log('Entered Username: ', username);
            // 로그인 버튼 클릭 시 로그인 처리를 하고 다른 씬으로 이동하는 로직 추가 가능
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
