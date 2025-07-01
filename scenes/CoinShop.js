export default class CoinShop extends Phaser.Scene {
    constructor() {
        super('CoinShop');
    }

    preload() {
        this.load.image('shop_bg', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('coin2', 'assets/coin2.png');
        this.load.image('shop_coin', 'assets/coin2.png');
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // 배경
        this.add.image(0, 0, 'shop_bg').setOrigin(0).setDisplaySize(width, height);

        //상단 타이틀 (코인 2개 + COIN 텍스트)
        const coinTitleY = 130;
        const spacing = 150;
        const coinScale = 0.15;

        this.add.image(centerX - spacing-250, coinTitleY, 'shop_coin').setOrigin(0.5).setScale(coinScale);
        this.add.text(centerX-250, coinTitleY, 'COIN', {
            fontSize: '60px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.image(centerX + spacing-250, coinTitleY, 'shop_coin').setOrigin(0.5).setScale(coinScale);

        // ===== 공통 스타일 =====
        const boxColor = 0xd8b0f7;
        const boxAlpha = 0.6;
        const cornerRadius = 30;

        // [1] 코인 잔액 박스 (둥글고 반투명)
        const coinBoxX = centerX + 300 - 250;
        const coinBoxY = 160;
        const coinBoxWidth = 500;
        const coinBoxHeight = 60;

        const coinBox = this.add.graphics();
        coinBox.fillStyle(boxColor, boxAlpha);
        coinBox.fillRoundedRect(coinBoxX, coinBoxY-40, coinBoxWidth, coinBoxHeight, cornerRadius);

        this.add.text(centerX + 180, coinBoxY + coinBoxHeight / 2-40, '내 코인: 0000', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // [2-4] 상품 박스들
        const boxY = 400;
        const boxSpacing = 400;
        const itemData = [
            { x: centerX - boxSpacing, coin: 'coin2', label: '500 COIN' },
            { x: centerX, coin: 'coin_2x', label: '1000 COIN' },
            { x: centerX + boxSpacing, coin: 'coin_3x', label: '1500 COIN' }
        ];

        itemData.forEach((item) => {
            const cardWidth = 300;
            const cardHeight = 400;
            const cardX = item.x - cardWidth / 2;
            const cardY = boxY + 30 - cardHeight / 2;

            const card = this.add.graphics();
            card.fillStyle(boxColor, boxAlpha);
            card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, cornerRadius);

            this.add.image(item.x, boxY - 10, item.coin)
                .setScale(0.2)
                .setOrigin(0.5);

            this.add.text(item.x, boxY + 150, item.label, {
                fontSize: '28px',
                color: '#ffffff',
                fontFamily: 'Arial',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            // 클릭 이벤트
            card.setInteractive(new Phaser.Geom.Rectangle(cardX, cardY, cardWidth, cardHeight), Phaser.Geom.Rectangle.Contains)
                .on('pointerdown', () => {
                    console.log(`${item.label} 상품 클릭됨`);
                });
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
