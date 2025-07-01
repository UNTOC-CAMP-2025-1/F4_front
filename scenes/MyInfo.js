// scenes/MyInfo.js
export default class MyInfo extends Phaser.Scene {
    constructor() {
        super('MyInfo');
    }

    preload() {
        this.load.image('info_bg', 'assets/back.png');
        this.load.image('trophy', 'assets/trophy.png');
        this.load.image('coin2', 'assets/coin2.png');
        this.load.image('character', 'assets/character.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('emoji', 'assets/emoji.png');
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        // 배경
        this.add.image(0, 0, 'info_bg')
            .setOrigin(0)
            .setDisplaySize(width, height);

        // 프로필 영역
        const profileY = 130;
        this.add.circle(centerX, profileY, 100, 0xffc0cb);
        this.add.image(centerX + 80, profileY + 50, 'emoji')
            .setScale(0.3)
            .setDepth(5)
            .setInteractive({ useHandCursor: true })
            .on('pointerup', () => {
                        this.scene.start('ProfileChange');
            });

        // 메뉴 카드 설정
        const cardWidth = 350;
        const cardHeight = 400;
        const cardRadius = 30;
        const iconsY = centerY + 50;
        const spacing = 400;
        const labelOffsetY = 80;

        const items = [
            { key: 'trophy', text: '내 전적', x: centerX - spacing },
            { key: 'coin2', text: '내 코인', x: centerX },
            { key: 'character', text: '비밀번호 변경', x: centerX + spacing }
        ];

        items.forEach(item => {
            // 카드 배경
            this.add.rectangle(item.x, iconsY + 30, cardWidth, cardHeight, 0xDCCEFF, 0.8)
                .setOrigin(0.5)
                .setStrokeStyle(2, 0xBBA6F2, 0.3)
                .setDepth(1);

            // 아이콘
            if(item.text === '비밀번호 변경'){
                this.add.image(item.x, iconsY, item.key)
                .setScale(0.4)
                .setInteractive({ useHandCursor: true })
                .setDepth(2);

            }
            else if(item.text === '내 전적'){
                this.add.image(item.x, iconsY, item.key)
                    .setScale(0.3)
                    .setInteractive({ useHandCursor: true })
                    .setDepth(2)
                    .on('pointerup', () => {
                        this.scene.start('MyScore');
                });
            }
            else if(item.text === '내 코인') {
            this.add.image(item.x, iconsY, item.key)
                .setScale(0.3)
                .setInteractive({ useHandCursor: true })
                .setDepth(5)
                .on('pointerup', () => {
                    console.log('[DEBUG] 내 코인 클릭됨');
                    this.scene.start('CoinShop');
            });
}
            // 텍스트
            this.add.text(item.x, iconsY + labelOffsetY+100, item.text, {
                fontSize: '40px',
                color: '#ffffff'
            }).setOrigin(0.5)
              .setDepth(2);
        });

        // 돌아가기 버튼
        this.add.image(60, height - 60, 'arrow')
            .setOrigin(0.5)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log('Back Button Clicked');
                this.scene.start('Start');
            });
    }
}
