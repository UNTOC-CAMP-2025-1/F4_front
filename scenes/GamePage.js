import Snake from './Snake.js';

export default class GamePage extends Phaser.Scene {
    constructor() {
        super('GamePage');
        // 7종류 먹이 키 배열 초기화
        this.foodKeys = [];
    }

    preload() {
        // 배경 이미지 로드
        this.load.image('back', 'assets/back.png');
        // 7종류 먹이 이미지 로드 (assets/food1~food7.png)
        for (let i = 1; i <= 7; i++) {
            this.load.image(`food${i}`, `assets/food${i}.png`);
        }
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // 배경
        this.add.image(0, 0, 'back')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // HTML 버튼 DOM (게임 오버 씬 전환용 예시)
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
                <button id="testBtn" class="menu-button">test</button>
            </div>
        `);

        // 버튼 클릭 시 GameOver 씬으로 전환
        this.time.delayedCall(0, () => {
            document.getElementById('testBtn').addEventListener('click', () => {
                this.scene.start('GameOver');
            });
        });

        // --- 기본 게임 요소 추가 ---
        // 뱀 생성
        this.snake = new Snake(this, centerX, centerY - 50);

        // 랜덤 먹이 키 배열 설정
        this.foodKeys = Array.from({ length: 7 }, (_, i) => `food${i + 1}`);

        // 먹이 그룹 생성 및 주기적 스폰
        this.foodGroup = this.physics.add.group();
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnFood,
            callbackScope: this,
            loop: true
        });

        // 뱀 머리와 먹이 충돌 처리
        this.physics.add.overlap(
            this.snake.head,
            this.foodGroup,
            this.eatFood,
            null,
            this
        );
    }

    update(time, delta) {
        // 뱀 업데이트
        this.snake.update(time, delta);
    }

    spawnFood() {
        // 랜덤 먹이 키 선택
        const key = Phaser.Utils.Array.GetRandom(this.foodKeys);
        // 랜덤 위치 계산
        const x = Phaser.Math.Between(16, this.cameras.main.width - 16);
        const y = Phaser.Math.Between(16, this.cameras.main.height - 16);
        // 먹이 스프라이트 생성
        const food = this.foodGroup.create(x, y, key);
        food.setDisplaySize(16, 16);
        food.body.immovable = true;
    }

    eatFood(head, food) {
        // 먹이 제거
        food.disableBody(true, true);
        // 뱀 길이 3만큼 증가
        this.snake.grow(3);
    }
}