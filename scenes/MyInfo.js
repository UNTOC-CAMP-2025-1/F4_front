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
            .setScale(0.1)
            .setDepth(5)
            .setInteractive({ useHandCursor: true })
            .on('pointerup', () => {
                this.scene.start('ProfileChange');
            });

        // 카드 스타일
        const cardWidth = 350;
        const cardHeight = 400;
        const cardRadius = 40;
        const iconsY = centerY + 50;
        const spacing = 400;
        const labelOffsetY = 180;
        const cardAlpha = 0.6;
        const cardColor = 0xDCCEFF;

        const items = [
            { key: 'trophy', text: '내 전적', x: centerX - spacing },
            { key: 'coin2', text: '내 코인', x: centerX },
            { key: 'character', text: '비밀번호 변경', x: centerX + spacing }
        ];

        items.forEach(item => {
            // 둥근 카드 배경
            const cardX = item.x - cardWidth / 2;
            const cardY = iconsY - cardHeight / 2 + 30;

            const bg = this.add.graphics();
            bg.fillStyle(cardColor, cardAlpha);
            bg.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, cardRadius);

            // 아이콘
            const icon = this.add.image(item.x, iconsY, item.key)
                .setDepth(2);

            if (item.text === '비밀번호 변경') {
                icon.setScale(0.4)
                    .setInteractive({ useHandCursor: true });
            } else {
                icon.setScale(0.3)
                    .setInteractive({ useHandCursor: true });

                if (item.text === '내 전적') {
                    icon.on('pointerup', () => this.scene.start('MyScore'));
                } else if (item.text === '내 코인') {
                    icon.on('pointerup', () => {
                        console.log('[DEBUG] 내 코인 클릭됨');
                        this.scene.start('CoinShop');
                    });
                }
            }

            // 텍스트
            this.add.text(item.x, iconsY + labelOffsetY, item.text, {
                fontSize: '40px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }).setOrigin(0.5).setDepth(2);
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
