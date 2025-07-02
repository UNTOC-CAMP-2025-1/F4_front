export default class NewPW extends Phaser.Scene {
    constructor() {
        super('NewPW');
    }

    preload() {
        this.load.image('NewPWback', 'assets/back.png');
    }

    create() {
        this.add.image(0, 0, 'NewPWback')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
            <style>
                #verify-code-btn {
                padding: 10px 15px;
                font-size: 14px;
                border: none;
                border-radius: 6px;
                background-color: rgba(255, 255, 255, 0.4);
                color: #444;
                backdrop-filter: blur(5px);
                cursor: pointer;
                transition: all 0.25s ease;
                }

                #verify-code-btn:hover {
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(1.05);
                }
            </style>
        
            <div style="display: flex; flex-direction: column; gap: 30px; align-items: flex-start;">

            <!-- 안내 문구 -->
            <div style="color: white; font-size: 20px; align-self: center;">
                새로운 비밀번호를 입력해주세요.
            </div>

            <!-- 비밀번호 입력 -->
            <div style="display: flex; align-items: center; gap: 20px;">
                <label for="pw" style="width: 130px; font-size: 20px; font-weight: bold; color: white;">PASSWORD</label>
                <input id="pw" type="password" placeholder="PASSWORD..." maxlength="20" 
                    style="width: 300px; padding: 10px; font-size: 18px; background-color: #ffe6f0;
                        border: 1px solid #ccc; border-radius: 6px; color: black;" />
            </div>

            <!-- 비밀번호 확인 -->
            <div style="display: flex; align-items: center; gap: 20px;">
                <label for="confirm" style="width: 130px; font-size: 20px; font-weight: bold; color: white;">CONFIRM</label>
                <input id="confirm" type="password" placeholder="PASSWORD..." maxlength="20" 
                    style="width: 300px; padding: 10px; font-size: 18px; background-color: #ffe6f0;
                        border: 1px solid #ccc; border-radius: 6px; color: black;" />
                <button id="verify-code-btn">확인</button>
            </div>
        </div>
    `);

        // 버튼 동작 연결
        this.time.delayedCall(0, () => {
            const pwInput = document.getElementById('pw');
            const confirmInput = document.getElementById('confirm');
            const verifyBtn = document.getElementById('verify-code-btn');
            const cancelBtn = document.getElementById('cancel-btn');

            if (verifyBtn) {
                verifyBtn.addEventListener('click', () => {
                    const pw = pwInput.value.trim();
                    const confirm = confirmInput.value.trim();

                    if (!pw || !confirm) {
                        alert('새로운 비밀번호를 입력해주세요.');
                    } else if (pw === confirm) {
                        alert('비밀번호가 변경되었습니다.');
                        this.scene.start('LoginScreen');
                    } else {
                        alert('새로운 비밀번호가 일치하지 않습니다.');
                    }
                });
            }

            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    const confirmed = window.confirm('비밀번호 변경을 취소하시겠습니까?');
                    if (confirmed) {
                        this.scene.start('LoginScreen');
                    }
                });
            }
        });

        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200).createFromHTML(`
            <style>
                .fancy-button {
                    padding: 12px 30px;
                    font-size: 15px;
                    border-radius: 30px;
                    border: 1px solid #aaa;
                    background-color: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(5px);
                    color: #444;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .fancy-button:hover {
                    background-color: rgba(255, 255, 255, 0.5);
                    transform: scale(1.05);
                }
            </style>

            <div style="display: flex; gap: 20px; justify-content: center;">
               <!-- 취소하기 버튼 -->
                <button id="cancel-btn" class="fancy-button">취소하기</button>
            </div>
        `);

    }
}