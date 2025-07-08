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
    this.load.image('shadow', 'assets/food3.png');
    for (let i = 1; i <= 7; i++) {
      this.load.image(`food${i}`, `assets/food${i}.png`);
    }
    this.load.image('tile', 'assets/tile.png');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // 디버그 그래픽 (원하면 켜두세요)
    this.physics.world.createDebugGraphic();

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
    const bot2 = new BotSnake(this, 'circle', 'face',  200, 0);
    this.snakes.push(bot1, bot2);

    // 뱀 파괴(죽음) 콜백 등록
    this.snakes.forEach(snake => {
      snake.addDestroyedCallback(this.snakeDestroyed, this);
    });
  }

  update(time, delta) {
    // 1) 각 뱀의 기본 로직 실행
    this.snakes.forEach(s => s.update(time, delta));

    // 2) 수동 충돌 검사: 머리(head) ↔ 먹이
    this.snakes.forEach(snake => {
      const head       = snake.head;
      const headRadius = head.displayWidth * 0.3;

      this.foodGroup.getChildren().forEach(foodSprite => {
        const food       = foodSprite.food;
        const foodRadius = foodSprite.displayWidth * 0.3;

        // 이미 붙은 음식은 무시
        if (food.attached) return;

        // 머리와 먹이 사이 거리 계산
        const dist = Phaser.Math.Distance.Between(
          head.x, head.y,
          foodSprite.x, foodSprite.y
        );

        // 반지름 합 이내라면 충돌로 간주
        if (dist <= headRadius + foodRadius) {
          food.onHit(head);
        }
      });
    });

    // 3) **머리 ↔ 다른 뱀 몸통 충돌 (수동)**
      this.snakes.forEach(snake => {
      const head       = snake.head;
      const headRadius = head.displayWidth * 0.5;

      this.snakes.forEach(other => {
        if (other === snake) return;              // 자기 자신 제외
        other.sections.forEach(sec => {
          const secRadius = sec.displayWidth * 0.5;  
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
    // 죽은 뱀의 headPath를 따라 먹이를 재생성
    const path = snake.headPath;
    const len  = snake.snakeLength;
    for (let i = 0; i < path.length; i += Math.max(1, Math.round(path.length / len) * 2)) {
      this.initFood(
        path[i].x + Util.randomInt(-10, 10),
        path[i].y + Util.randomInt(-10, 10)
      );
    }
  }
}
