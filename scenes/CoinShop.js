// scenes/CoinShop.js
export default class CoinShop extends Phaser.Scene {
    constructor() {
        super('CoinShop');
    }


    preload() {
        this.load.image('shop_bg', 'assets/back.png');     
        this.load.image('arrow', 'assets/arrow.png'); 
        this.load.image('coin2', 'assets/coin2.png');    
        this.load.image('coin_2x', 'assets/twocoin.png');   
        this.load.image('coin_3x', 'assets/threecoin.png');
        this.load.image('shop_title', 'assets/coinshoptitle.png');

    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // 배경
        this.add.image(0, 0, 'shop_bg').setOrigin(0).setDisplaySize(width, height);

        // 상단 타이틀 이미지

        this.add.image(200, -10, 'shop_title').setOrigin(0, 0).setScale(0.3); // 왼쪽 상단에 배치

        // 코인 잔액 텍스트
        this.add.rectangle(centerX +300, 140, 500, 60, 0xDCCEFF, 0.8)
            .setStrokeStyle(2, 0xBBA6F2, 0.3)
            .setOrigin(0.5);
        this.add.text(centerX + 180, 140, '내 코인: 0000', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        // 상품 박스들 (3개)
        const boxY = 400;
        const boxSpacing = 400;
        const itemData = [
            { x: centerX - boxSpacing, coin: 'coin2', label: '500 COIN' },
            { x: centerX, coin: 'coin_2x', label: '1000 COIN' },
            { x: centerX + boxSpacing, coin: 'coin_3x', label: '1500 COIN' }
        ];

        itemData.forEach((item) => {
            const card = this.add.rectangle(item.x, boxY+30, 300, 400, 0xDCCEFF, 0.8)
                .setOrigin(0.5)
                .setStrokeStyle(2, 0xBBA6F2, 0.3);

            this.add.image(item.x, boxY - 10, item.coin).setScale(0.2).setOrigin(0.5);
            this.add.text(item.x, boxY + 150, item.label, {
                fontSize: '28px',
                color: '#ffffff',
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            // 클릭 이벤트 (추후 구매 로직 연결 가능)
            card.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
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
