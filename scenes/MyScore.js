export default class MyScore extends Phaser.Scene {
    constructor() {
        super('MyScore');
    }

    preload() {
        this.load.image('info_bg', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('trophy', 'assets/trophy.png');
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // 배경
        this.add.image(0, 0, 'info_bg').setOrigin(0).setDisplaySize(width, height);


        this.add.dom(centerX+360, 100).createFromHTML(`
        <style>
            .score-title-container {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 60px;
            transform: translateX(-50%);
            }

            .score-title-text {
            font-size: 80px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: white;
            }

            .trophy-img {
            width: 150px;
            height: 150px;
            }
        </style>

        <div class="score-title-container">
            <img class="trophy-img" src="assets/trophy.png" />
            <div class="score-title-text">SCORE</div>
            <img class="trophy-img" src="assets/trophy.png" />
        </div>
        `);

        this.add.dom(centerX+360, 250).createFromHTML(`
        <style>
            .top-score-bar {
            width: 1000px;
            height: 50px;
            background-color: rgba(220, 206, 255, 0.8);
            border: 2px solid rgba(187, 166, 242, 0.3);
            display: flex;
            align-items: center;
            justify-content: left;
            padding-left: 40px;
            font-family: Arial, sans-serif;
            font-size: 28px;
            color: white;
            border-radius: 6px;
            box-sizing: border-box;
            transform: translateX(-50%);
            }
        </style>
        <div class="top-score-bar" id="best-score-bar">나의 최고 기록 : 계산 중...</div>
        `);

        this.add.dom(centerX, 450).createFromHTML(`
        <style>
            .scroll-container {
            width: 1000px;
            height: 320px;
            background-color: rgba(220, 206, 255, 0.8);
            border: 2px solid rgba(187, 166, 242, 0.3);
            overflow-y: auto;
            border-radius: 10px;
            padding: 20px 10px;
            box-sizing: border-box;
            position: relative;
            transform: translateX(-50%);
            }

            .scroll-container::-webkit-scrollbar {
            display: none;
            }

            .score-item {
            width: 95%;
            height: 60px;
            background-color: white;
            margin: 10px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-family: Arial, sans-serif;
            border: 1px solid #999;
            border-radius: 8px;
            }
        </style>

        <div class="scroll-container">
            ${Array.from({ length: 20 }, (_, i) => `<div class="score-item">기록 ${i + 1}: ${Math.floor(Math.random() * 10000)}점</div>`).join('')}
        </div>
        `);

        this.time.delayedCall(0, () => {
        const scoreItems = document.querySelectorAll('.score-item');
        const bestScoreBar = document.getElementById('best-score-bar');

        if (scoreItems.length > 0 && bestScoreBar) {
            const scores = Array.from(scoreItems).map(item => {
            const match = item.textContent.match(/(\d+)점/);
            return match ? parseInt(match[1]) : 0;
            });
            const maxScore = Math.max(...scores);
            bestScoreBar.innerText = `나의 최고 기록 : ${maxScore}점`;
        }

        const honorBtn = document.getElementById('honor-html-button');
        if (honorBtn) {
            honorBtn.addEventListener('click', () => {
            this.scene.start('EveryScore');
            });
        }
        });

        this.add.dom(centerX, height - 120).createFromHTML(`
        <style>
            .honor-button {
            width: 500px;
            height: 60px;
            background-color: rgba(187, 166, 242, 0.6);
            border-radius: 30px;
            font-size: 30px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            transform: translateX(-50%);
            }

            .honor-button:hover {
            transform: translate(-50%, 5px);
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
            }
        </style>

        <div class="honor-button" id="honor-html-button">명예의 전당</div>
        `);



        // 뒤로가기 버튼
        this.add.image(60, height - 60, 'arrow')
            .setOrigin(0.5)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('MyInfo');
            });
    
    }
}
