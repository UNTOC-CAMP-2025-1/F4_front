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

        //LOGIN 타이틀
        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 - 180).createFromHTML(`
            <div style="font-size: 55px; font-weight: bold; color: white;">
                LOGIN
            </div>
        `);

        //ID + PW
        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
            <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">

                <!--ID-->
                <div style="display: flex; align-items: center; gap: 40px;">
                    <label for="username" style="width: 100px; font-size: 20px; color: white; font-weight: bold;">ID</label>
                    <input type="text" id="username" placeholder="ID..."
                        style="font-size: 18px; padding: 10px; width: 300px;
                            border: 1px solid #ccc; border-radius: 6px;
                            background-color: #ffe6f0; color: black;" />
                </div>

                <!--PASSWORD-->
                <div style="display: flex; align-items: center; gap: 40px;">
                    <label for="password" style="width: 100px; font-size: 20px; color: white; font-weight: bold;">PASSWORD</label>
                    <input type="password" id="password" placeholder="PASSWORD..."
                        style="font-size: 18px; padding: 10px; width: 300px;
                            border: 1px solid #ccc; border-radius: 6px;
                            background-color: #ffe6f0; color: black;" />
                </div>
            </div>
        `);

        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 + 180).createFromHTML(`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">

            <button id="signup-btn"
                style="
                    width: 220px;
                    padding: 12px 20px;
                    font-size: 18px;
                    color: #857b98;
                    background-color: rgba(255, 255, 255, 0.3);  /* 반투명 */
                    border: none;
                    border-radius: 30px;
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                ">
                회원가입
            </button>

            <button id="changepw-btn"
                style="
                    width: 220px;
                    padding: 12px 20px;
                    font-size: 18px;
                    color: #857b98;
                    background-color: rgba(255, 255, 255, 0.3);
                    border: none;
                    border-radius: 30px;
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                ">
                비밀번호 변경
            </button>

        </div>
        `);
    }
}