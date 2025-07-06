export default class EveryScore extends Phaser.Scene {
    constructor() {
        super('EveryScore');
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

        // 타이틀 (트로피 + SCORE + 트로피)
        const trophyScale = 0.2;
        const spacing = 70;

        this.add.image(centerX - 140 - spacing, 100, 'trophy')
            .setOrigin(0.5)
            .setScale(trophyScale);

        this.add.text(centerX, 100, 'SCORE', {
            fontSize: '60px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.add.image(centerX + 140 + spacing, 100, 'trophy')
            .setOrigin(0.5)
            .setScale(trophyScale);

        // 상단 바
        this.add.rectangle(centerX, 250, 1000, 50, 0xDCCEFF, 0.8)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xBBA6F2, 0.3);

        this.add.text(centerX - 350, 250, '최고의 지주(지렁이 주인이란 뜻) :', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // 스크롤 박스
        const boxWidth = 1000;
        const boxHeight = 320;
        const boxX = centerX;
        const boxY = 450;

        this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0xDCCEFF, 0.8)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xBBA6F2, 0.3);

        // 스크롤 컨테이너
        const scrollX = boxX - boxWidth / 2;
        const scrollY = boxY - boxHeight / 2;
        const scrollContainer = this.add.container(scrollX, scrollY);
        const initialY = scrollContainer.y;

        // 더미 아이템
        const itemHeight = 60;
        const itemGap = 10;
        const itemTotal = 20;
        const topPadding = 60;
        const bottomPadding = 20;
        const totalHeight = topPadding + itemTotal * (itemHeight + itemGap) + bottomPadding;

        for (let i = 0; i < itemTotal; i++) {
            const y = topPadding + i * (itemHeight + itemGap);

            const bg = this.add.rectangle(boxWidth / 2, y, boxWidth - 40, itemHeight, 0xffffff, 1)
                .setOrigin(0.5)
                .setStrokeStyle(1, 0x999999, 0.5);

            const text = this.add.text(boxWidth / 2, y, `기록 ${i + 1}: 12345점`, {
                fontSize: '24px',
                color: '#000000',
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            scrollContainer.add([bg, text]);
        }

        // 마스크 설정
        const maskGraphics = this.make.graphics();
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(scrollX, scrollY, boxWidth, boxHeight);
        const mask = maskGraphics.createGeometryMask();
        scrollContainer.setMask(mask);

        // 스크롤 범위
        const minY = initialY - (totalHeight - boxHeight);
        const maxY = initialY;

        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            scrollContainer.y -= deltaY * 0.5;
            scrollContainer.y = Phaser.Math.Clamp(scrollContainer.y, minY, maxY);
        });

        // ====== 명예의 전당 박스 추가 ======
        const honorBoxWidth = 500;
        const honorBoxHeight = 60;
        const honorBoxRadius = 40;
        const honorBoxY = height - 120;

        // 배경 그래픽
        const honorBoxGraphics = this.add.graphics();
        honorBoxGraphics.fillStyle(0xBBA6F2, 0.6);
        honorBoxGraphics.fillRoundedRect(-honorBoxWidth/2, -honorBoxHeight/2, honorBoxWidth, honorBoxHeight, honorBoxRadius-30);

        // 텍스트
        const honorText = this.add.text(0, 0, 'revenge?', {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // 컨테이너로 묶기
        const honorContainer = this.add.container(centerX, honorBoxY, [honorBoxGraphics, honorText]);
        honorContainer.setSize(honorBoxWidth, honorBoxHeight);
        honorContainer.setInteractive(new Phaser.Geom.Rectangle(-honorBoxWidth/2, -honorBoxHeight/2, honorBoxWidth, honorBoxHeight), Phaser.Geom.Rectangle.Contains);

        // 클릭 시 Home로 이동
        honorContainer.on('pointerdown', () => {
            this.scene.start('Home');
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
