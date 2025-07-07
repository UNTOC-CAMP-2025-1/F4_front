// src/entities/Food.js
export default class Food {
  /**
   * @param {Phaser.Scene} scene  - Phaser 3 scene
   * @param {number} x            - 초기 x 좌표
   * @param {number} y            - 초기 y 좌표
   */
  constructor(scene, x, y) {
    this.scene = scene;
    this.attached = false;   // 헤드에 붙었는지 여부
    this.head     = null;    // 붙은 스네이크 헤드 참조

    // 1) 스프라이트 생성 및 물리엔진 적용
    this.sprite = scene.physics.add.sprite(x, y, 'food')
      .setTint(0xff0000)
      .setScale(0.2)
      .setOrigin(0.5);
    this.sprite.setOrigin(0.5);
    this.sprite.body.setCircle(this.sprite.width * 0.5);
    this.sprite.food = this; // 역참조

    // 2) overlap 콜백은 SlitherGame 씬에서 등록
  }

  /**
   * 헤드와 충돌했을 때 호출될 메서드
   * 씬에서 physics.add.overlap( head, food.sprite, (h,f)=>f.food.onHit(h) ) 으로 바인딩
   * @param {Phaser.GameObjects.Sprite} headSprite 
   */
  onHit(headSprite) {
    if (this.attached) return;
    this.attached = true;
    this.head = headSprite;
    // 더 이상 물리 시뮬레이션이 필요 없으므로 비활성화
    this.scene.physics.world.disable(this.sprite);
    // 스네이크에 food 참조 추가
    this.head.snake.food.push(this);
  }

  /**
   * 매 프레임 호출: 붙은 상태라면 헤드 위치로 이동 → 사이즈 증가 → 파괴
   */
  update() {
    if (!this.attached) return;

    // 헤드 중앙으로 바로 옮기기
    this.sprite.x = this.head.x;
    this.sprite.y = this.head.y;

    // 완전히 붙었으면 사이즈 늘리고 제거
    this.head.snake.incrementSize();
    this.destroy();
  }

  /**
   * food 파괴 및 스네이크 레퍼런스 정리
   */
  destroy() {
    // 씬에서 스프라이트 제거
    this.sprite.destroy();
    // 스네이크 food 배열에서 제거
    const arr = this.head?.snake.food;
    if (arr) {
      const i = arr.indexOf(this);
      if (i !== -1) arr.splice(i, 1);
    }
    this.head = null;
  }
}
