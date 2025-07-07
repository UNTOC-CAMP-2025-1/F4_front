import Snake from './Snake.js';

export default class PlayerSnake extends Snake {
  constructor(scene, sectionKey, headKey, x, y) {
    super(scene, sectionKey, headKey, x, y);

    this.head.setScale(0.4);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.currentSpeed = this.slowSpeed;  // 자동 전진 초기값
    this.maxSpeed = this.slowSpeed;
    this.acceleration = 300;             // 부드럽게 속도 바뀌도록
    this.turnSpeed = 2.5;                // 라디안/초

    const spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on('down', this.spaceKeyDown, this);
    spaceKey.on('up', this.spaceKeyUp, this);

    this.addDestroyedCallback(() => {
      spaceKey.off('down', this.spaceKeyDown, this);
      spaceKey.off('up', this.spaceKeyUp, this);
    }, this);
  }

  spaceKeyDown() {
    this.maxSpeed = this.fastSpeed;
    this.shadow.isLightingUp = true;
  }

  spaceKeyUp() {
    this.maxSpeed = this.slowSpeed;
    this.shadow.isLightingUp = false;
  }

  update(time, delta) {
    super.update(time, delta);
    const dt = delta / 1000;

    const turnLeft = this.cursors.left.isDown || this.keys.A.isDown;
    const turnRight = this.cursors.right.isDown || this.keys.D.isDown;

    // 회전 입력 처리
    if (turnLeft) {
      this.head.rotation -= this.turnSpeed * dt;
    }
    if (turnRight) {
      this.head.rotation += this.turnSpeed * dt;
    }

    // 현재 속도를 maxSpeed에 부드럽게 맞추기
    const speedDiff = this.maxSpeed - this.currentSpeed;
    const accelStep = this.acceleration * dt;
    if (Math.abs(speedDiff) < accelStep) {
      this.currentSpeed = this.maxSpeed;
    } else {
      this.currentSpeed += Math.sign(speedDiff) * accelStep;
    }

    // 현재 회전 방향으로 이동
    this.scene.physics.velocityFromRotation(
      this.head.rotation - Math.PI / 2,
      this.currentSpeed,
      this.head.body.velocity
    );
  }
}
