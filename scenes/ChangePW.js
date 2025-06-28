export default class ChangePW extends Phaser.Scene {
    constructor() {
        super('ChangePW');
    }

    preload() {
        this.load.image('PWback', 'assets/back.png');
    }

    create() {
        this.add.image(0, 0, 'PWback')
            .setOrigin(0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    }

}