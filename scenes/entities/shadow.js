// src/entities/Shadow.js
export default class shadow {
  /**
   * @param {Phaser.Scene} scene    - Phaser 3 scene
   * @param {Phaser.GameObjects.Sprite[]} sections - 배열로 관리되는 snake 섹션들
   * @param {number} scale          - 섀도우 스케일
   */
  constructor(scene, sections, scale) {
    this.scene       = scene;
    this.sections    = sections;
    this.scale       = scale;
    this.shadowGroup = scene.add.group();
    this.shadows     = [];
    this.isLightingUp    = false;
    this.lightStep       = 0;
    this.maxLightStep    = 3;
    this.lightUpdateCount= 0;
    this.updateLights    = 3;
    // 원본 이미지가 흰색이므로 tint 만으로 색상 표현
    this.darkTint       = 0xaaaaaa;
    this.lightTintBright= 0xaa3333;
    this.lightTintDim   = 0xdd3333;
  }

  /**
   * 새로운 shadow 스프라이트 추가
   * @param {number} x
   * @param {number} y
   */
  add(x, y) {
    const shadow = this.scene.add.sprite(x, y, 'shadow')
      .setOrigin(0.5)
      .setScale(this.scale);
    this.shadowGroup.add(shadow);
    this.shadows.push(shadow);
  }

  /**
   * 매 프레임 호출해서 shadow 위치 및 tint 업데이트
   */
  update() {
    let lastPos = null;

    // 각 섹션 아래에 shadow 위치시키기
    for (let i = 0; i < this.sections.length; i++) {
      const sec   = this.sections[i];
      const sh    = this.shadows[i];
      const posX  = sec.x;
      const posY  = sec.y;

      // 이전 위치와 동일하면 투명 처리
      if (lastPos && lastPos.x === posX && lastPos.y === posY) {
        sh.setAlpha(0);
        sh.naturalAlpha = 0;
      } else {
        sh.setAlpha(1);
        sh.naturalAlpha = 1;
      }
      sh.setPosition(posX, posY);
      lastPos = { x: posX, y: posY };
    }

    // 라이팅 모드일 때 밝힌 후 아니면 어두운 tint 적용
    if (this.isLightingUp) {
      this.lightUpdateCount++;
      if (this.lightUpdateCount >= this.updateLights) {
        this.lightUp();
        this.lightUpdateCount = 0;
      }
    } else {
      this.shadows.forEach(sh => sh.setTint(this.darkTint));
    }
  }

  /**
   * 섀도우 스케일 조정
   * @param {number} scale
   */
  setScale(scale) {
    this.scale = scale;
    this.shadows.forEach(sh => sh.setScale(scale));
  }

  /**
   * cyclic 하게 일부 shadow 에 밝은 tint 적용
   */
  lightUp() {
    this.shadows.forEach((sh, i) => {
      if (sh.naturalAlpha > 0) {
        const step = (i - this.lightStep) % this.maxLightStep === 0
          ? this.lightTintBright
          : this.lightTintDim;
        sh.setTint(step);
      }
    });
    this.lightStep = (this.lightStep + 1) % this.maxLightStep;
  }

  /**
   * 모든 shadow 파괴
   */
  destroy() {
    this.shadows.forEach(sh => sh.destroy());
    this.shadows.length = 0;
  }
}
