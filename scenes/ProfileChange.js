// scenes/ProfileChange.js
export default class ProfileChange extends Phaser.Scene {
    constructor() {
        super('ProfileChange');
    }

    preload() {
        //console.log('[DEBUG] ProfileChange preload 진입');
        this.load.image('background', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('profile1', 'assets/character.png');
        this.load.image('profile2', 'assets/character2.png');
        this.load.image('profile3', 'assets/character3.png');
        this.load.image('profile4', 'assets/profile4.png');
        this.load.image('profile5', 'assets/profile5.png');
        this.load.image('profile6', 'assets/profile6.png');
    }

    create() {
        console.log('[DEBUG] ProfileChange create 진입');
        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        
        // 배경
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(width, height).setDepth(0);

        // 현재 선택된 프로필
        this.add.circle(320, centerY - 110, 200, 0xffc0cb);
        this.currentProfile = this.add.image(320, centerY - 110, 'profile1')
            .setDisplaySize(300, 300)
            .setOrigin(0.5);

        // 스크롤 박스
        const scrollBoxWidth = 500;
        const scrollBoxHeight = 580;
        const scrollBoxX = centerX + 180;
        const scrollBoxY = centerY - 50;

        const scrollBox = this.add.rectangle(scrollBoxX, scrollBoxY, scrollBoxWidth, scrollBoxHeight, 0xDCCEFF, 0.4)
            .setStrokeStyle(2, 0xBBA6F2, 0.3)
            .setOrigin(0.5);

        // 마스크 설정
        const maskGraphics = this.make.graphics({ x: 0, y: 0, add: false });
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(
            scrollBoxX - scrollBoxWidth / 2,
            scrollBoxY - scrollBoxHeight / 2,
            scrollBoxWidth,
            scrollBoxHeight
        );
        const mask = maskGraphics.createGeometryMask();

        // 스크롤 컨테이너
        const profileKeys = ['profile1', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6'];
        const scrollContainer = this.add.container(
            scrollBoxX - scrollBoxWidth / 2 + 150,
            scrollBoxY - scrollBoxHeight / 2 + 110
        );
        scrollContainer.setMask(mask);
        const initialY = scrollContainer.y;

        const columns = 2;
        const spacingX = 200;
        const spacingY = 200;

        profileKeys.forEach((key, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            const x = col * spacingX;
            const y = row * spacingY;

            const bg = this.add.circle(x, y, 90, 0xDCCEFF, 0.9)
                .setStrokeStyle(2, 0xBBA6F2, 0.3);

            const img = this.add.image(x, y, key)
                .setDisplaySize(150, 150)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    this.currentProfile.setTexture(key);
                });

            scrollContainer.add([bg, img]);
        });

        // 스크롤 한계 계산
        const totalRows = Math.ceil(profileKeys.length / columns);
        const contentHeight = totalRows * spacingY;
        const visibleHeight = scrollBoxHeight - 160;

        const minScrollY = initialY - (contentHeight - visibleHeight);
        const maxScrollY = initialY;

        // 휠 스크롤
        this.input.on('wheel', (pointer, gameObjects, dx, dy) => {
            scrollContainer.y -= dy * 0.3;
            scrollContainer.y = Phaser.Math.Clamp(scrollContainer.y, minScrollY, maxScrollY);
        });

        // '적용하기' 버튼
        const applyButton = this.add.rectangle(320, height - 200, 300, 100, 0xffc0cb, 0.8)
            .setStrokeStyle(3, 0xBBA6F2, 0.5) 
            .setOrigin(0.5)
            .setRadius(20)  // 둥글게 만들기
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log('적용하기 버튼 클릭됨');
                // 버튼 클릭 시 처리할 로직을 추가할 수 있음
            });

        // 버튼 텍스트
        this.add.text(320, height - 200, '적용하기', {
            fontSize: '28px',
            fontStyle: 'bold',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5).setDepth(10);

        // 버튼에 마우스 오버 시 색상 변경 효과 추가
        applyButton.on('pointerover', () => {
            applyButton.setFill(0xFFB6C1); // 마우스를 올리면 색상 변경
        }).on('pointerout', () => {
            applyButton.setFill(0xffc0cb); // 마우스를 떼면 원래 색상으로 돌아옴
        });

        // 뒤로가기 버튼
        this.add.image(320, height - 200, 'arrow')
            .setOrigin(0.5)
            .setScale(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('MyInfo');
            });

    }
}
