export default class SignUp extends Phaser.Scene {
    constructor() {
        super('SignUp');
    }

    preload() {
        this.load.image('signback', 'assets/back.png');
    }

    create() {
        this.add.image(0, 0, 'signback')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        //LOGIN 타이틀
        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 - 200).createFromHTML(`
            <div style="font-size: 55px; font-weight: bold; color: white;">
                SIGN UP
            </div>
        `);

        this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
        <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">

            <!-- ID -->
            <div style="display: flex; align-items: center; gap: 20px;">
            <label for="id" style="width: 120px; font-size: 20px; color: white; font-weight: bold; text-align: right;">ID</label>
            <input id="id" type="text" placeholder="ID..." maxlength="20" 
                style="width: 300px; font-size: 18px; padding: 10px;
                    background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />
            </div>

            <!-- Email -->
            <div style="display: flex; align-items: center; gap: 20px;">
            <label for="email" style="width: 120px; font-size: 20px; color: white; font-weight: bold; text-align: right;">E-mail</label>
            <input id="email" type="email" placeholder="E-MAIL..." 
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
            <div style="display: flex; align-items: center; gap: 20px;">
            <label for="confirm" style="width: 120px; font-size: 20px; color: white; font-weight: bold; text-align: right;">CONFIRM</label>
            <input id="confirm" type="password" placeholder="PASSWORD..." maxlength="20" 
                style="width: 300px; font-size: 18px; padding: 10px;
                    background-color: #ffe6f0; border: 1px solid #ccc; border-radius: 6px; color: black;" />

            <!--체크표시부분 영역-->
            <span id="checkmark" style="
                display: block;
                width: 20px;
                height: 20px;
                border: 2px solid white;
                border-radius: 4px;
                position: absolute;
                right: -30px;
                top: 90%;
                transform: translateY(-50%);
                visibility: hidden;
            ">
                <span style="
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                border-right: 3px solid white;
                border-bottom: 3px solid white;
                transform: rotate(45deg);
                position: absolute;
                top: 1px;
                left: 4px;
                "></span>
            </span>
            </div>

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
                submitBtn.addEventListener('click', () => {
                    if(id.value && email.value && pw.value && cf.value && pw.value == cf.value) {
                        window.alert('회원가입이 완료되었습니다.');
                        this.scene.start('LoginScreen');
                    }else {
                        window.alert('모든 항목을 올바르게 입력해주세요.');
                    }
                    console.log('가입하기 클릭됨');
    
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


        // 버튼들
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
                <!-- 가입하기 버튼 -->
                <button id="submit-btn" class="fancy-button">가입하기</button>

                <!-- 취소하기 버튼 -->
                <button id="cancel-btn" class="fancy-button">취소하기</button>
            </div>
        `);



    }
}