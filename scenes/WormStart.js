// scenes/wormstart.js

import PlayerSnake from './entities/PlayerSnake.js';
import BotSnake    from './entities/BotSnake.js';
import Food        from './entities/Food.js';
import Util        from './Util.js';

export default class WormStart extends Phaser.Scene {
  constructor() {
    super('WormStart');
  }

  preload() {
    // 섹션, 머리, 그림자, 먹이, 타일 이미지 로드
    this.load.image('circle', 'assets/tiniwormbody.png');
    this.load.image('face',   'assets/character.png');
    for (let i = 1; i <= 7; i++) {
      this.load.image(`food${i}`, `assets/food${i}.png`);
    }
    this.load.image('tile', 'assets/tile.png');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    this.worldW = w;
    this.worldH = h;

    // 디버그 그래픽 (원하면 켜두세요)
    //this.physics.world.createDebugGraphic();

    // 카메라 & 배경
    this.cameras.main.setBounds(-w, -h, w * 2, h * 2);
    this.cameras.main.setBackgroundColor('#444');
    this.add
      .tileSprite(-w, -h, w * 2, h * 2, 'tile')
      .setOrigin(0)
      .setDepth(-1);

    // 물리 경계
    this.physics.world.setBounds(-w, -h, w * 2, h * 2);

    // 먹이 그룹 
    this.foodGroup = this.physics.add.group();

    // 뱀들 저장할 배열
    this.snakes = [];

    // 초기 먹이 100개 생성
    for (let i = 0; i < 100; i++) {
      this.initFood(
        Util.randomInt(-w, w),
        Util.randomInt(-h, h)
      );
    }

    // 플레이어 스네이크
    const player = new PlayerSnake(this, 'circle', 'face', 0, 0);
    player.head.setScale(0.4);
    this.snakes.push(player);
    this.cameras.main.startFollow(player.head);

    // 봇 스네이크 2마리
    const bot1 = new BotSnake(this, 'circle', 'face', -200, 0);
    bot1.head.setScale(0.4);
    const bot2 = new BotSnake(this, 'circle', 'face',  200, 0);
    bot2.head.setScale(0.4);
    this.snakes.push(bot1, bot2);

    // 뱀 파괴(죽음) 콜백 등록
    this.snakes.forEach(snake => {
      snake.addDestroyedCallback(this.snakeDestroyed, this);
    });
  }

  update(time, delta) {
  // 1) 각 뱀 기본 로직
  this.snakes.forEach(s => s.update(time, delta));

  // 2) 수동 충돌 검사: 머리(head) ↔ 먹이
  this.snakes.forEach(snake => {
    const head       = snake.head;
    const headRadius = head.displayWidth * 0.3;

    this.foodGroup.getChildren().forEach(foodSprite => {
      const food       = foodSprite.food;
      const foodRadius = foodSprite.displayWidth * 0.3;

      if (food.attached) return;

      const dist = Phaser.Math.Distance.Between(
        head.x, head.y,
        foodSprite.x, foodSprite.y
      );

      if (dist <= headRadius + foodRadius) {
        // ① 기존 붙이는 로직
        food.onHit(head);

        // ② 새 먹이 랜덤 생성 (world bounds: -w..w, -h..h)
        //    create()에서 this.worldW = w, this.worldH = h 로 저장했다고 가정
        const x = Util.randomInt(-this.worldW, this.worldW);
        const y = Util.randomInt(-this.worldH, this.worldH);
        this.initFood(x, y);
      }
    });
  });

    // 3) **머리 ↔ 다른 뱀 몸통 충돌 (수동)**
      this.snakes.forEach(snake => {
      const head       = snake.head;
      const headRadius = head.displayWidth * 0.3;

      this.snakes.forEach(other => {
        if (other === snake) return;              // 자기 자신 제외
        other.sections.forEach(sec => {
          const secRadius = sec.displayWidth * 0.3;  
          const dist = Phaser.Math.Distance.Between(
            head.x, head.y,
            sec.x,  sec.y
          );
          if (dist <= headRadius + secRadius) {
            // 충돌하면 해당 뱀 파괴
            snake.destroy();
          }
        });
      });
    });

    // 4) 먹이들 업데이트
    this.foodGroup.getChildren().forEach(sprite => sprite.food.update());

  }

  initFood(x, y) {
    const n   = Phaser.Math.Between(1, 7);
    const key = `food${n}`;
    const f   = new Food(this, x, y, key);
    this.foodGroup.add(f.sprite);
    return f;
  }

  snakeDestroyed(snake) {
  const path = snake.headPath;
  const len  = snake.snakeLength;

  // 1) 뱀 길이 비율로 생성 개수 결정 (예: 길이의 0.5%)
  const spawnRatio = 0.1;          // 0.5% 로 설정
  let spawnCount   = Math.floor(len * spawnRatio);

  // spawnCount가 0이면 그냥 종료
  if (spawnCount === 0) {
    return;
  }

  // 2) 경로 전체를 spawnCount 등분한 간격으로 인덱스 뽑기
  const step        = Math.max(1, Math.floor(path.length / spawnCount));
  const offsetRange = 60;   // 좌표 ±60px 랜덤 오프셋
  const minDist     = 100;   // 스폰 간 최소 거리
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

  // 3) 최종 선택된 위치에만 먹이 생성
  spawns.forEach(pt => {
    this.initFood(pt.x, pt.y);
  });


  if (snake instanceof PlayerSnake) {
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOver');
    });
  }

  else {
    const anyBotLeft = this.snakes.some(s => s instanceof BotSnake && !s.destroyed);
    if (!anyBotLeft) {
      this.time.delayedCall(1000, () => {
        this.scene.start('GameOver');
      });
    }
  }
}



}
