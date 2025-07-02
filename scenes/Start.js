// Start.js
export default class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('back', 'assets/back.png');
        this.load.image('title', 'assets/title.png');
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


        this.add.dom(centerX, centerY + 100).createFromHTML(`
            <style>
                .menu-button {
                    width: 300px;
                    padding: 15px;
                    margin: 15px auto;
                    font-size: 24px;
                    font-family: Arial, sans-serif;
                    color: white;
                    background-color: rgba(255, 255, 255, 0.2);
                    border: 2px solid white;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    backdrop-filter: blur(5px);
                }

                .menu-button:hover {
                    background-color: rgba(255, 255, 255, 0.4);
                    color: #b35481;
                    transform: scale(1.05);
                    border-color: #b35481;
                }
            </style>

            <div style="display: flex; flex-direction: column; align-items: center;">
                <button id="startBtn" class="menu-button">START</button>
                <button id="loginBtn" class="menu-button">LOGIN</button>
                <button id="mypageBtn" class="menu-button">MYPAGE</button>
            </div>
        `);


        this.time.delayedCall(0, () => {
            document.getElementById('startBtn').addEventListener('click', () => {
                this.scene.start('Home');
            });

            document.getElementById('loginBtn').addEventListener('click', () => {
                this.scene.start('LoginScreen');
            });

            document.getElementById('mypageBtn').addEventListener('click', () => {
                this.scene.start('MyInfo');
            });
        });
        
    }  
} 
