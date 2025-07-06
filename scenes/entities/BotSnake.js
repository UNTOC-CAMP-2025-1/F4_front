// src/entities/BotSnake.js
import Snake from './Snake.js';
import Util from '../Util.js';

export default class BotSnake extends Snake {
  /**
   * @param {Phaser.Scene} scene  
   * @param {string} spriteKey   
   * @param {number} x           
   * @param {number} y           
   */
  constructor(scene, spriteKey, x, y) {
    super(scene, spriteKey, x, y);
    this.trend = 1;
  }

  /**
   * Bot 전용 update: 랜덤으로 방향 전환한 뒤 기본 Snake 업데이트 호출
   * @param {number} time  
   * @param {number} delta 
   */
  update(time, delta) {
    // 한 방향으로 일정 시간 회전하다가 가끔 반대 방향으로 바뀜
    if (Util.randomInt(1, 20) === 1) {
      this.trend *= -1;
    }
    // Phaser 3 Arcade: rotation 속성 직접 조절
    this.head.rotation += this.trend * this.rotationSpeed;

    // 기본 Snake 업데이트 (이동 및 섹션/눈/그림자 갱신)
    super.update(time, delta);
  }
}
