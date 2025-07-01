// scenes/MyScore.js
export default class MyScore extends Phaser.Scene {
    constructor() {
        super('MyScore');
    }

    preload() {
        this.load.image('info_bg', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('score_title', 'assets/myscore.png');
    }

    create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;

    // 배경
    this.add.image(0, 0, 'info_bg').setOrigin(0).setDisplaySize(width, height);

    // SCORE 타이틀과 트로피들
    this.add.image(centerX, 150, 'score_title').setOrigin(0.5).setScale(0.5);

    // 상단 바 ("나의 최고 기록" 영역)
    this.add.rectangle(centerX, 300, 1000, 80, 0xDCCEFF, 0.8)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0xBBA6F2, 0.3);

    
    // 나의 최고 기록 텍스트
    this.add.text(centerX - 350, 300, '나의 최고 기록 :', {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: '#ffffff',
        align: 'center'
    }).setOrigin(0.5);

    // 중간 박스 영역
        const boxWidth = 1000;
        const boxHeight = 320;
        const boxX = centerX;
        const boxY = 560;

        this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0xDCCEFF, 0.8)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xBBA6F2, 0.3);

        // 스크롤용 컨테이너
        const scrollX = centerX - boxWidth / 2;
        const scrollY = boxY - boxHeight / 2;
        const scrollContainer = this.add.container(scrollX, scrollY);

        // 아이템 리스트 (더미 15개)
        const itemHeight = 60;
        const itemGap = 10;
        const itemTotal = 15;
        const totalHeight = itemTotal * (itemHeight + itemGap);

        for (let i = 0; i < itemTotal; i++) {
            const topPadding = 20;
            const bottomPadding = 20;
            const totalHeight = topPadding + itemTotal * (itemHeight + itemGap) + bottomPadding;



            const bg = this.add.rectangle(boxWidth / 2, y, boxWidth - 40, itemHeight, 0xffffff, 1)
                .setStrokeStyle(1, 0x999999, 0.5)
                .setOrigin(0.5);

            const text = this.add.text(boxWidth / 2, y, `기록 ${i + 1}: 12345점`, {
                fontSize: '24px',
                color: '#000000',
                fontFamily: 'Arial'
            })
            .setOrigin(0.5, 0.55) 
            .setPadding(0, 8, 0, 0);


            scrollContainer.add([bg, text]);
        }

        // 마스크
        const maskGraphics = this.make.graphics().fillRect(scrollX, scrollY, boxWidth, boxHeight);
        const mask = maskGraphics.createGeometryMask();
        scrollContainer.setMask(mask);

        // 스크롤 범위 계산
        const upperBound = scrollY;
        const lowerBound = scrollY - (totalHeight - boxHeight);

        // 스크롤 기능 (마우스 휠)
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            scrollContainer.y -= deltaY * 0.5;
            scrollContainer.y = Phaser.Math.Clamp(scrollContainer.y, lowerBound, upperBound);
        });
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
