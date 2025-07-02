// scenes/ProfileChange.js
export default class ProfileChange extends Phaser.Scene {
    constructor() {
        super('ProfileChange');
    }

    preload() {
        this.load.image('background', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('profile1', 'assets/character.png');
        this.load.image('profile2', 'assets/character2.png');
        this.load.image('profile3', 'assets/character3.png');
        this.load.image('profile4', 'assets/character4.png');
        this.load.image('profile5', 'assets/character55.png');
        
    }

    create() {

        const savedProfile = localStorage.getItem('selectedProfile');
        this.selectedProfileSrc = savedProfile || null;

        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        
        // 배경
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(width, height).setDepth(0);

        this.add.dom(320, centerY - 110).createFromHTML(`
        <style>
            .profile-circle-large {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background-color:rgb(252, 227, 231);
            border: 4px solid white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .profile-circle-large img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            }
        </style>
        <div class="profile-circle-large" id="main-profile-display">${this.selectedProfileSrc ? `<img src="${this.selectedProfileSrc}" />` : ''}</div>
        `);


        this.add.dom(centerX + 300, centerY).createFromHTML(`
        <style>
            .scroll-wrapper {
            width: 550px;
            height: 580px;
            background-color: rgba(220, 206, 255, 0.4);
            border: 2px solid rgba(187, 166, 242, 0.3);
            overflow-y: auto;
            padding: 20px 10px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            row-gap: 30px;
            column-gap: 20px;
            }

            .profile-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: #dccfff;
            border: 2px solid #bba6f2;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            transition: transform 0.3s ease, border-color 0.3s ease;
            }

            .profile-circle:hover {
            transform: scale(1.07);
            border-color: white;
            }

            .profile-circle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            }
        </style>

        <div class="scroll-wrapper" id="profile-scroll-box">
            <div class="profile-circle"><img src="assets/character.png" /></div>
            <div class="profile-circle"><img src="assets/character2.png" /></div>
            <div class="profile-circle"><img src="assets/character3.png" /></div>
            <div class="profile-circle"><img src="assets/character4.png" /></div>
            <div class="profile-circle"><img src="assets/character5.png" /></div>
            <div class="profile-circle"></div>
            <div class="profile-circle"></div>
            <div class="profile-circle"></div>
            <div class="profile-circle"></div>
            <div class="profile-circle"></div>
        </div>
        `);

        this.time.delayedCall(0, () => {
            const scrollCircles = document.querySelectorAll('.profile-circle img');
            const mainProfile = document.getElementById('main-profile-display');

            scrollCircles.forEach(img => {
                img.addEventListener('click', () => {
                    const selectedSrc = img.getAttribute('src');
                    mainProfile.innerHTML = `<img src="${selectedSrc}" />`;
                    this.selectedProfileSrc = selectedSrc; 
                });
            });
        });

        this.add.dom(320, height - 200).createFromHTML(`
        <style>
            .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            }

            .transparent-btn {
            width: 300px;
            padding: 15px 0;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            background-color: rgba(255, 192, 203, 0.4); /* 연한 분홍, 투명 */
            border: 2px solid rgba(255, 255, 255, 0.4);
            border-radius: 25px;
            backdrop-filter: blur(5px);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
            }

            .transparent-btn:hover {
            background-color: rgba(255, 192, 203, 0.7);
            border-color: white;
            transform: scale(1.05);
            }
        </style>

        <div class="button-container">
            <button id="apply-html-btn" class="transparent-btn">적용하기</button>
            <button id="default-html-btn" class="transparent-btn">기본이미지</button>
        </div>
        `);


        const applyHtmlBtn = document.getElementById('apply-html-btn');
        if (applyHtmlBtn) {
            applyHtmlBtn.addEventListener('click', () => {
                console.log('적용하기 버튼 클릭됨');
                if (this.selectedProfileSrc) {
                    localStorage.setItem('selectedProfile', this.selectedProfileSrc);
                }

                this.scene.start('MyInfo');

            });
        }

        const defaultHtmlBtn = document.getElementById('default-html-btn');
        if (defaultHtmlBtn) {
        defaultHtmlBtn.addEventListener('click', () => {
            console.log('기본이미지 버튼 클릭됨');

            const mainProfile = document.getElementById('main-profile-display');
            if (mainProfile) {
                mainProfile.innerHTML = ''; 
            }

            this.selectedProfileSrc = null;

            localStorage.removeItem('selectedProfile');
        });
    }

        // 돌아가기 버튼
        this.add.image(60, height - 60, 'arrow')
            .setOrigin(0.5)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log('Back Button Clicked');
                this.scene.start('MyInfo');
            });

    }
}
