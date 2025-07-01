// scenes/GameOver.js
export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('background', 'assets/back.png');
        this.load.image('trophy', 'assets/trophy.png');
    }

    create() {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // 배경
        this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setDisplaySize(width, height)
            .setDepth(0);

        // 타이틀 (트로피 + 순위 + 트로피)
        const trophyScale = 0.2;
        const spacing = 60;

        this.add.image(centerX - 120 - spacing, height * 0.15, 'trophy')
            .setOrigin(0.5)
            .setScale(trophyScale);

        this.add.text(centerX, height * 0.15, '순위', {
            fontSize: '70px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.image(centerX + 120 + spacing, height * 0.15, 'trophy')
            .setOrigin(0.5)
            .setScale(trophyScale);

        // 공통 스타일
        const boxColor = 0xd8b0f7;
        const boxAlpha = 0.6;
        const cornerRadius = 60;

        // 순위 박스 (둥글고 반투명)
        const rankBoxWidth = width * 0.5;
        const rankBoxHeight = height * 0.1;
        const rankBoxX = centerX - rankBoxWidth / 2;
        const rankBoxY = height * 0.35 - rankBoxHeight / 2;

        const rankBox = this.add.graphics();
        const rankCorner = 30;
        rankBox.fillStyle(boxColor, boxAlpha);
        rankBox.fillRoundedRect(rankBoxX, rankBoxY, rankBoxWidth, rankBoxHeight, rankCorner);

        // 텍스트 더미
        this.rankText = this.add.text(centerX, height * 0.35, '당신의 순위: 불러오는 중...', {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#ffffff',
        }).setOrigin(0.5);

        // 나중에 실제 백엔드에서 순위 불러오기 
        // this.loadRankFromServer(1);
        // loadRankFromServer(userId) {
        //   fetch(`/api/result?user_id=${userId}`)
        //     .then(res => res.json())
        //     .then(data => {
        //       this.rankText.setText(`당신의 순위: ${data.rank}위`);
        //     });
        // }

        // 버튼 공통 설정
        const buttonWidth = 400;
        const buttonHeight = 300;
        const buttonY = height * 0.65 - buttonHeight / 2;

        // [1] 나가기 버튼
        const exitX = centerX - width * 0.2 - buttonWidth / 2;
        const exitBg = this.add.graphics();
        exitBg.fillStyle(boxColor, boxAlpha);
        exitBg.fillRoundedRect(exitX, buttonY, buttonWidth, buttonHeight, cornerRadius);
        exitBg.setInteractive(new Phaser.Geom.Rectangle(exitX, buttonY, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);

        const exitText = this.add.text(exitX + buttonWidth / 2, buttonY + buttonHeight / 2, '나가기', {
            fontSize: '70px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        exitBg.on('pointerdown', () => this.scene.start('Home'))
            .on('pointerover', () => {
                this.tweens.add({ targets: [exitBg, exitText], y: '+=10', duration: 100 });
            })
            .on('pointerout', () => {
                this.tweens.add({ targets: [exitBg, exitText], y: '-=10', duration: 100 });
            });

        // [2] 재시작 버튼
        const restartX = centerX + width * 0.2 - buttonWidth / 2;
        const restartBg = this.add.graphics();
        restartBg.fillStyle(boxColor, boxAlpha);
        restartBg.fillRoundedRect(restartX, buttonY, buttonWidth, buttonHeight, cornerRadius);
        restartBg.setInteractive(new Phaser.Geom.Rectangle(restartX, buttonY, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);

        const restartText = this.add.text(restartX + buttonWidth / 2, buttonY + buttonHeight / 2, '재시작', {
            fontSize: '70px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        restartBg.on('pointerdown', () => this.scene.start('RankBoard'))
            .on('pointerover', () => {
                this.tweens.add({ targets: [restartBg, restartText], y: '+=10', duration: 100 });
            })
            .on('pointerout', () => {
                this.tweens.add({ targets: [restartBg, restartText], y: '-=10', duration: 100 });
            });
    }
}
