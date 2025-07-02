export default class ChangePW extends Phaser.Scene {
    constructor() {
        super('ChangePW');
    }

    preload() {
        this.load.image('PWback', 'assets/back.png');
    }

    create() {
        this.add.image(0, 0, 'PWback')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
            <style>
                #send-code-btn, #verify-code-btn {
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

                #send-code-btn:hover, #verify-code-btn:hover {
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(1.05);
                }
            </style>

            <div style="display: flex; flex-direction: column; gap: 30px; align-items: flex-start;">

            <!-- ID 입력 -->
            <div style="display: flex; align-items: center; gap: 20px;">
            <label for="id" style="width: 100px; font-size: 20px; font-weight: bold; color: white;">ID</label>
            <input id="id" type="text" placeholder="ID..." maxlength="20" 
                style="width: 300px; padding: 10px; font-size: 18px; background-color: #ffe6f0;
                    border: 1px solid #ccc; border-radius: 6px; color: black;" />
            </div>

            <!-- Email + 인증코드 버튼 -->
            <div style="display: flex; align-items: center; gap: 20px;">
            <label for="email" style="width: 100px; font-size: 20px; font-weight: bold; color: white;">E-mail</label>
            <input id="email" type="email" placeholder="E-MAIL..." 
                style="width: 300px; padding: 10px; font-size: 18px; background-color: #ffe6f0;
                    border: 1px solid #ccc; border-radius: 6px; color: black;" />
            <button id="send-code-btn">인증코드 받기</button>
            </div>

            <!-- 안내 문구 -->
            <div style="color: white; font-size: 16px; margin-left: 120px;">
            메일로 전송된 인증코드를 입력해주세요.
            </div>

            <!-- 인증코드입력 -->
            <div id="code-section" style="display: none; align-items: center; gap: 20px;">
            <label for="code" style="width: 100px; font-size: 20px; color: white; font-weight: bold;">CODE</label>
            <input id="code" type="text" placeholder="ENTER HERE..."
                style="width: 300px; font-size: 18px; padding: 10px;
                    background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />

            <button id="verify-code-btn" style="
                padding: 10px 15px;
                font-size: 14px;
                border: none;
                border-radius: 6px;
                background-color: rgba(255, 255, 255, 0.4);
                color: #444;
                backdrop-filter: blur(5px);
                cursor: pointer;
                transition: all 0.25s ease;
            ">
                확인
            </button>
            </div>
        `);

        // 버튼들
        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 + 250).createFromHTML(`
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
                <!-- 다음단계 버튼 -->
                <button id="submit-btn" class="fancy-button">✔ 다음 단계로</button>

                <!-- 취소하기 버튼 -->
                <button id="cancel-btn" class="fancy-button">취소하기</button>
            </div>
        `);

        this.time.delayedCall(0, () => {
            const sendBtn = document.getElementById('send-code-btn');
            const idInput = document.getElementById('id');
            const emailInput = document.getElementById('email');
            const codeSection = document.getElementById('code-section');
            const codeInput = document.getElementById('code');
            const submitBtn = document.getElementById('submit-btn');
            const cancelBtn = document.getElementById('cancel-btn');
            const verifyBtn = document.getElementById('verify-code-btn');

            const TEMP_CODE = '1'; // 임시 인증코드
            let isVerified = false; // 인증 여부 확인용

            if (sendBtn) {
                sendBtn.addEventListener('click', () => {
                    const idVal = idInput.value.trim();
                    const emailVal = emailInput.value.trim();

                    if (!idVal || !emailVal) {
                        alert('ID와 E-mail을 모두 입력해주세요.');
                    } else {
                        alert('인증코드가 이메일로 전송되었습니다.');
                        codeSection.style.display = 'flex';
                    }
                });
            }

            if (verifyBtn) {
                verifyBtn.addEventListener('click', () => {
                    if (codeInput.value.trim() === TEMP_CODE) {
                        alert('인증이 완료되었습니다.');
                        isVerified = true;
                    } else {
                        alert('인증코드가 올바르지 않습니다.');
                        isVerified = false;
                    }
                });
            }

            if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                if (!isVerified) {
                    alert('인증을 먼저 완료해주세요.');
                } else {
                    this.scene.start('NewPW');
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


    }

}