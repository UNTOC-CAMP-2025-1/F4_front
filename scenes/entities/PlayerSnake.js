// src/scenes/entities/PlayerSnake.js
import Snake from './Snake.js';

/**
 * Player-controlled snake, extending the core Snake class.
 * @extends Snake
 */
export default class PlayerSnake extends Snake {
  /**
   * @param {Phaser.Scene} scene      현재 씬(this)
   * @param {string} sectionKey       몸통(섹션) 스프라이트 키
   * @param {string} headKey          머리 스프라이트 키
   * @param {number} x                초기 X 좌표
   * @param {number} y                초기 Y 좌표
   */
  constructor(scene, sectionKey, headKey, x, y) {
    super(scene, sectionKey, headKey, x, y);

    this.head.setScale(0.4);

    // 화살표 키 입력용
    this.cursors = scene.input.keyboard.createCursorKeys();

    // 스페이스바로 가속/감속 제어
    const spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    spaceKey.on('down', this.spaceKeyDown, this);
    spaceKey.on('up',   this.spaceKeyUp,   this);

    // 객체 파괴 시 이벤트 제거
    this.addDestroyedCallback(() => {
      spaceKey.off('down', this.spaceKeyDown, this);
      spaceKey.off('up',   this.spaceKeyUp,   this);
    }, this);
  }

  /** 가속 처리 */
  spaceKeyDown() {
    this.speed = this.fastSpeed;
    this.shadow.isLightingUp = true;
  }

  /** 감속 처리 */
  spaceKeyUp() {
    this.speed = this.slowSpeed;
    this.shadow.isLightingUp = false;
  }

  /**
   * 매 프레임 호출되는 콜백
   * @param {number} time
   * @param {number} delta
   */
  update(time, delta) {
    // 1) 부모 클래스의 길이 증가 등 내부 로직 실행
    super.update(time, delta);

    // 2) 마우스 위치 계산
    const pointer = this.scene.input.activePointer;
    const mouseX = pointer.worldX;
    const mouseY = pointer.worldY;

    // 3) 머리 스프라이트 위치
    const headX = this.head.x;
    const headY = this.head.y;

    // 4) 목표 각도(도 단위) 계산
    let angleDeg = Phaser.Math.RadToDeg(
      Math.atan2(mouseY - headY, mouseX - headX)
    );

    // 5) 시각적 회전 적용
    this.head.setAngle(angleDeg);

    // 6) 속도 벡터 설정 (this.speed는 spaceKeyDown/Up에서 설정됨)
    this.scene.physics.velocityFromAngle(
      angleDeg,
      this.speed,
      this.head.body.velocity
    );
  }
}
