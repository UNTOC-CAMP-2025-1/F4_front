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
  update(time, delta) {    // 기본 Snake 업데이트 (이동 및 섹션/눈/그림자 갱신)
    super.update(time, delta);
  }

  destroy() {
    // 1) 공통 destroy: head/sec/edge 파괴 + this.deathScore 계산
    super.destroy();

    // 2) Bot 전용: deathScore 만큼 spawnRatio 로 계산
    const path       = this.headPath;
    let spawnCount   = Math.floor(this.deathScore+30 /10);

    // 최소 0, 최대 deathScore
    spawnCount = Phaser.Math.Clamp(spawnCount, 0, this.deathScore);

    if (spawnCount <= 0) return;

    // 3) 경로 전체를 spawnCount 등분한 간격으로 인덱스 뽑기
    const step        = Math.max(1, Math.floor(path.length / spawnCount));
    const offsetRange = 60;   // ±60px 랜덤 오프셋
    const minDist     = 100;  // 스폰 간 최소 거리
    const spawns      = [];

    for (let i = 0; i < path.length && spawns.length < spawnCount; i += step) {
      const base = path[i];
      const x    = base.x + Util.randomInt(-offsetRange, offsetRange);
      const y    = base.y + Util.randomInt(-offsetRange, offsetRange);

      // 이미 선택된 위치들과 최소 거리(minDist) 체크
      const tooClose = spawns.some(p =>
        Phaser.Math.Distance.Between(p.x, p.y, x, y) < minDist
      );
      if (tooClose) continue;

      spawns.push({ x, y });
    }

    // 4) 최종 선택된 위치에만 먹이 생성
    spawns.forEach(pt => {
      this.scene.initFood(pt.x, pt.y);
    });
  }

  predictAndMove(worldW, worldH) {
    const x = this.head.x;
    const y = this.head.y;

    const input = {
      state_x: 0.0,  // float
      state_y: 0.0,  // float
      player_x: parseFloat(((x + worldW) / (worldW * 2)).toFixed(6)),
      player_y: parseFloat(((y + worldH) / (worldH * 2)).toFixed(6)),
      boost: this.isBoosting ? 1.0 : 0.0  // float
    };

    console.log('🐍 Bot input (float):', input);

    fetch('http://34.169.165.241:8000/AI_bot/ai/infer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(err => {
            throw new Error(`HTTP ${res.status} - ${err}`);
          });
        }
        return res.json();
      })
      .then(data => {
        const action = data.action;
        this.setDirection(action);
        console.log(`🤖 Bot ${this.botNumber} → 예측된 방향: ${action}`);
      })
      .catch(err => {
        console.error(`❌ Bot ${this.botNumber} 방향 예측 실패:`, err);
      });
  }



  setDirection(action) {
    switch (action) {
      case 0: this.head.rotation = Math.PI;       break; // 왼쪽
      case 1: this.head.rotation = -Math.PI / 2;  break; // 위
      case 2: this.head.rotation = 0;             break; // 오른쪽
      case 3: this.head.rotation = Math.PI / 2;   break; // 아래
    }
  }




}
