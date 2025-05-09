// Start.js
export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('back', 'assets/back.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('startbutton', 'assets/startbutton.png');
        this.load.image('loginbutton', 'assets/loginbutton.png');
        this.load.image('stylebutton', 'assets/stylebutton.png');
        this.load.image('heart', 'assets/heart.png');
        // 필요한 경우 이미지나 폰트 로딩 가능
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
    
        // 배경
        this.add.image(0, 0, 'back')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    

        // Title
        const titleImage = this.add.image(centerX, centerY - 130, 'title')
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

        //두근두근
        const heartImage = this.add.image(centerX, titleImage.y-180, 'heart')
            .setOrigin(0.5)
            .setScale(0.65);
    
        this.tweens.add({
            targets: heartImage,
            y: heartImage.y + 30,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // START 버튼
        const startButtonY = centerY;
        const startButton = this.add.image(centerX, startButtonY, 'startbutton')
            .setDisplaySize(300, 60) // 원하는 크기로 조절
            .setInteractive({ useHandCursor: true });

        const startText = this.add.text(centerX, startButtonY, 'START', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        startButton.on('pointerdown', () => {
            startText.setColor('#000000'); // 클릭 시 글자 색을 검은색으로 변경
        });
        
        startButton.on('pointerup', () => {
            this.scene.start('Home'); // 게임 씬으로 전환
        });

        startButton.on('pointerover', () => {
            startButton.setScale(0.6); // 버튼 크기 키우기
            startText.setFontSize('36px'); // 글자 크기 키우기
        });

        startButton.on('pointerout', () => {
            startButton.setScale(0.48); // 버튼 크기 원래대로
            startText.setFontSize('32px'); // 글자 크기 원래대로
        });

        // LOGIN 버튼
        const loginButtonY = startButtonY + 90;
        const loginButton = this.add.image(centerX, loginButtonY, 'loginbutton')
            .setDisplaySize(300, 60)
            .setInteractive({ useHandCursor: true });

        const loginText = this.add.text(centerX, loginButtonY, 'LOGIN', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        loginButton.on('pointerdown', () => {
            loginText.setColor('#000000');
        });
        loginButton.on('pointerup', () => {
            console.log('로그인 버튼 클릭');
            this.scene.start('LoginScreen');
        });

        loginButton.on('pointerover', () => {
            loginButton.setScale(0.6); // 버튼 크기 키우기
            loginText.setFontSize('36px'); // 글자 크기 키우기
        });

        loginButton.on('pointerout', () => {
            loginButton.setScale(0.48); // 버튼 크기 원래대로
            loginText.setFontSize('32px'); // 글자 크기 원래대로
        });

        // STYLE 버튼
        const styleButtonY = loginButtonY + 90;
        const styleButton = this.add.image(centerX, styleButtonY, 'stylebutton')
            .setDisplaySize(300, 60)
            .setInteractive({ useHandCursor: true });

        const styleText = this.add.text(centerX, styleButtonY, 'STYLE', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        styleButton.on('pointerdown', () => {
            styleText.setColor('#000000');
        });
        styleButton.on('pointerup', () => {
            console.log('테마 변경 버튼 클릭');
            this.scene.start('Style');
        });

        styleButton.on('pointerover', () => {
            styleButton.setScale(0.6); // 버튼 크기 키우기
            styleText.setFontSize('36px'); // 글자 크기 키우기
        });

        styleButton.on('pointerout', () => {
            styleButton.setScale(0.48); // 버튼 크기 원래대로
            styleText.setFontSize('32px'); // 글자 크기 원래대로
        });
        
    }  
} 
