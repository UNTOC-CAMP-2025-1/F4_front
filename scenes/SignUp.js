export default class SignUp extends Phaser.Scene {
    constructor() {
        super('SignUp');
    }

    preload() {
        this.load.image('signback', 'assets/back.png');
    }

    create() {

        let isVerified = false;

        this.add.image(0, 0, 'signback')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        //LOGIN 타이틀
        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 - 250).createFromHTML(`
            <div style="font-size: 55px; font-weight: bold; color: white;">
                SIGN UP
            </div>
        `);

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

            <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">

            <!-- ID -->
            <div style="display: flex; align-items: center; gap: 20px;">
                <label for="id" style="width: 120px; font-size: 20px; color: white; font-weight: bold; text-align: right;">ID</label>
                <input id="id" type="text" placeholder="ID..." maxlength="20"
                style="width: 300px; font-size: 18px; padding: 10px;
                        background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />
            </div>

            <!-- Password -->
            <div style="display: flex; align-items: center; gap: 20px;">
                <label for="password" style="width: 120px; font-size: 20px; color: white; font-weight: bold; text-align: right;">PASSWORD</label>
                <input id="password" type="password" placeholder="PASSWORD..." maxlength="20"
                style="width: 300px; font-size: 18px; padding: 10px;
                        background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />
            </div>

            <!-- Confirm Password -->
            <div style="display: flex; align-items: center; gap: 20px; transform: translateX(25px);">
                <label for="confirm" style="width: 120px; font-size: 20px; color: white; font-weight: bold; text-align: right;">CONFIRM</label>
                <input id="confirm" type="password" placeholder="PASSWORD..." maxlength="20"
                style="width: 300px; font-size: 18px; padding: 10px;
                        background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />
                
                <!-- 체크 표시 -->
                <span id="checkmark" style="
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid white;
                border-radius: 4px;
                margin-left: 10px;
                position: relative;
                visibility: hidden;
                ">
                <span style="
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 10px;
                    height: 10px;
                    border-right: 3px solid white;
                    border-bottom: 3px solid white;
                    transform: rotate(45deg);
                    display: block;
                "></span>
                </span>
            </div>

            <!-- Email + 인증코드 버튼 -->
            <div style="display: flex; align-items: center; gap: 20px; transform: translateX(75px);">
                <label for="email" style="width: 100px; font-size: 20px; font-weight: bold; color: white; text-align: right;">E-mail</label>
                <input id="email" type="email" placeholder="E-MAIL..."
                style="width: 300px; padding: 10px; font-size: 18px; background-color: #ffe6f0;
                        border: 1px solid #ccc; border-radius: 6px; color: black;" />
                <button id="send-code-btn">인증코드 받기</button>
            </div>

            <!-- 인증코드 입력칸 -->
            <div id="code-section" style="display: flex; align-items: center; gap: 20px; transform: translateX(60px);">
                <label for="code" style="width: 100px; font-size: 20px; color: white; font-weight: bold; text-align: right;">CODE</label>
                <input id="code" type="text" placeholder="ENTER CODE..."
                style="width: 300px; font-size: 18px; padding: 10px;
                        background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />
                <button id="verify-code-btn">인증하기</button>
            </div>
        </div>
        `);

        // 버튼들
        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 + 230).createFromHTML(`
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
                <!-- 가입하기 버튼 -->
                <button id="submit-btn" class="fancy-button">가입하기</button>

                <!-- 취소하기 버튼 -->
                <button id="cancel-btn" class="fancy-button">취소하기</button>
            </div>
        `);

        this.time.delayedCall(0, () => {
            const pw = document.getElementById('password');
            const cf = document.getElementById('confirm');
            const checkmark = document.getElementById('checkmark');
            const id = document.getElementById('id');
            const email = document.getElementById('email');

            // 입력될 때마다 비교
            const validate = () => {
                if (pw.value && cf.value && pw.value === cf.value) {
                    checkmark.style.visibility = 'visible';
                } else {
                    checkmark.style.visibility = 'hidden';
                }
            };

            pw.addEventListener('input', validate);
            cf.addEventListener('input', validate);

            const submitBtn = document.getElementById('submit-btn');

            if (submitBtn) {
                submitBtn.addEventListener('click', async () => {
                    const id = document.getElementById('id').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const pw = document.getElementById('password').value.trim();
                    const cf = document.getElementById('confirm').value.trim();

                    if (!id || !email || !pw || !cf) {
                        alert('모든 항목을 올바르게 입력해주세요.');
                        return;
                    }

                    if (pw !== cf) {
                        alert('비밀번호와 확인이 일치하지 않습니다.');
                        return;
                    }

                    if (!isVerified) {
                        alert('이메일 인증을 먼저 완료해주세요.');
                        return;
                    }

                    try {
                        const signupResponse = await fetch('http://34.19.18.103:8000/user/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                user_name: id,
                                user_email: email,
                                password: pw
                            })
                        });

                        if (signupResponse.ok) {
                            alert('회원가입이 완료되었습니다!');
                            this.scene.start('LoginScreen');
                        } else {
                            alert('회원가입 실패');
                        }
                    } catch (err) {
                        alert('서버 요청 중 오류가 발생했습니다.');
                        console.error(err);
                    }
                });

            }
            
            const cancelBtn = document.getElementById('cancel-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    const confirmed = window.confirm('회원가입을 취소하시겠습니까?');
                    if (confirmed) {
                        this.scene.start('LoginScreen');
                    }
                });
            }
        });




        const emailInput = document.getElementById('email');
        const idInput = document.getElementById('id');
        const sendCodeBtn = document.getElementById('send-code-btn');

        //email 백엔드로 보내는 부분
        sendCodeBtn.addEventListener('click', async () => {
            const id = idInput.value.trim();
            const email = emailInput.value.trim();
            const password = document.getElementById('password').value.trim();
            const confirm = document.getElementById('confirm').value.trim();

            // 입력값 검증
            if (!id || !email || !password || !confirm) {
                alert('모든 항목을 입력한 후에 인증코드를 받을 수 있습니다.');
                return;
            }

            if (password !== confirm) {
                alert('비밀번호와 확인이 일치하지 않습니다.');
                return;
            }

            try {
                const response = await fetch(`http://34.19.18.103:8000/user/send-auth-code?user_email=${email}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    const resultText = await response.text(); // 서버가 문자열 반환 시 사용
                    alert('인증코드가 이메일로 전송되었습니다.');
                } else {
                    alert('인증코드 전송 실패');
                }
            } catch (error) {
                alert('서버 연결 중 오류가 발생했습니다.');
            }
        });

        
        //이메일 인증 백엔드 연결부분
        const verifyCodeBtn = document.getElementById('verify-code-btn');

        verifyCodeBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value.trim();
            const code = document.getElementById('code').value.trim();

            if (!email || !code) {
                alert('이메일과 인증코드를 모두 입력해주세요.');
                return;
            }

            try {
                const response = await fetch(`http://34.19.18.103:8000/user/verify-auth-code?user_email=${email}&code=${code}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    const text = await response.text();
                    alert('인증 성공');
                    isVerified = true;
                } else {
                    alert('인증 실패');
                    isVerified = false;
                }
            } catch (error) {
                alert('서버 연결 중 오류가 발생했습니다.');
                isVerified = false;
            }
        });





    }
}