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
                L O G I N
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
            <style>
                .fancy-button {
                    width: 220px;
                    padding: 12px 20px;
                    font-size: 18px;
                    color: #857b98;
                    background-color: rgba(255, 255, 255, 0.3);
                    border: none;
                    border-radius: 30px;
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                    transition: all 0.25s ease;
                }
                .fancy-button:hover {
                    background-color: rgba(255, 255, 255, 0.5);
                    transform: scale(1.05);
                }
            </style>

            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                <button id="signup-btn" class="fancy-button">회원가입</button>
                <button id="changepw-btn" class="fancy-button">비밀번호 찾기</button>
            </div>
        `);

        // 로그인 버튼 추가
        this.add.dom(this.cameras.main.width / 2 + 280, this.cameras.main.height / 2 + 5).createFromHTML(`
            <style>
                .circle-login-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    background-color: rgba(255, 255, 255, 0.5);
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    backdrop-filter: blur(5px);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .circle-login-btn:hover {
                    background-color: rgba(255, 255, 255, 0.7);
                    transform: scale(1.1); 
                }
            </style>
            <button id="login-btn" class="circle-login-btn">✔</button>
        `);


        this.time.delayedCall(0, () => {
            const signupButton = document.getElementById('signup-btn');
            if (signupButton) {
                signupButton.addEventListener('click', () => {
                    console.log('회원가입 버튼 클릭됨');
                    this.scene.start('SignUp');
                });
            }

            const changePwButton = document.getElementById('changepw-btn');
            if (changePwButton) {
                changePwButton.addEventListener('click', () => {
                    console.log('비밀번호 변경 버튼 클릭됨');                        this.scene.start('ChangePW');
                });
            }

            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    const id = document.getElementById('username');
                    const pw = document.getElementById('password');
                    if (id.value && pw.value) {
                        alert('로그인 시도됨');
                        // TODO: 로그인 처리 후 씬 이동 등
                    } else {
                        alert('ID와 비밀번호를 모두 입력해주세요.');
                    }
                });
            }


        });



    }
}