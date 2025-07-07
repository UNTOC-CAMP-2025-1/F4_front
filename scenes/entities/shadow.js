// src/entities/Shadow.js
export default class Shadow {
  /**
   * @param {Phaser.Scene} scene              - Phaser 3 scene
   * @param {Phaser.GameObjects.Sprite[]} sections - snake의 섹션 스프라이트 배열
   * @param {number} scale                    - 섀도우 스케일
   * @param {number} spacing                  - 섹션 인덱스 간격 (1: 모든 섹션마다, 2: 한 칸 건너뛰고…)
   */
  constructor(scene, sections, scale, spacing = 1) {
    this.scene       = scene;
    this.sections    = sections;
    this.scale       = scale;
    this.spacing     = spacing;
    this.shadowGroup = scene.add.group();
    this.shadows     = [];
    this.isLightingUp     = false;
    this.lightStep        = 0;
    this.maxLightStep     = 3;
    this.lightUpdateCount = 0;
    this.updateLights     = 3;
    this.darkTint         = 0xaaaaaa;
    this.lightTintBright  = 0xaa3333;
    this.lightTintDim     = 0xdd3333;

    // spacing 간격으로 미리 shadow 스프라이트 생성
    for (let i = 0; i < sections.length; i += spacing) {
      const sh = scene.add
        .sprite(0, 0, 'shadow')
        .setOrigin(0.5)
        .setScale(scale)
        .setDepth(0);     // 그림자는 가장 아래 레이어
      this.shadowGroup.add(sh);
      this.shadows.push(sh);
    }
  }


  /**
   * 새로운 shadow 스프라이트 추가
   * @param {number} x
   * @param {number} y
   */
  add(x, y) {
    const sh = this.scene.add
      .sprite(x, y, 'shadow')
      .setOrigin(0.5)
      .setScale(this.scale)
      .setDepth(0);
    this.shadowGroup.add(sh);
    this.shadows.push(sh);
  }
  
  /**
   * 매 프레임 호출: shadows 위치·alpha·tint 업데이트
   */
  update() {
    let lastPos = null;
    let idx     = 0;

    // sections 배열을 spacing 간격으로 건너뛰며 그림자 위치 갱신
    for (let i = 0; i < this.sections.length && idx < this.shadows.length; i += this.spacing) {
      const sec = this.sections[i];
      const sh  = this.shadows[idx++];

      const posX = sec.x;
      const posY = sec.y;

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
        this._lightUp();
        this.lightUpdateCount = 0;
      }
    } else {
      this.shadows.forEach(sh => sh.setTint(this.darkTint));
    }
  }

  /**
   * shadow 스케일 일괄 조정
   * @param {number} scale
   */
  setScale(scale) {
    this.scale = scale;
    this.shadows.forEach(sh => sh.setScale(scale));
  }

  /**
   * cyclic하게 일부 shadow에 밝은 tint 적용
   * @private
   */
  _lightUp() {
    this.shadows.forEach((sh, i) => {
      if (sh.naturalAlpha > 0) {
        const tint = ((i - this.lightStep) % this.maxLightStep === 0)
          ? this.lightTintBright
          : this.lightTintDim;
        sh.setTint(tint);
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
