// src/scenes/WormStart.js
import PlayerSnake from './entities/PlayerSnake.js';
import BotSnake from './entities/BotSnake.js'
import Food        from './entities/Food.js';
import Util        from './Util.js';

export default class WormStart extends Phaser.Scene {
  constructor() {
    super('WormStart');
  }

  preload() {
    // 몸통(section)과 얼굴(head) 이미지 둘 다 로드
    this.load.image('circle', 'assets/food2.png');  // section
    this.load.image('face', 'assets/character.png');   // head
    this.load.image('shadow', 'assets/food3.png');
    this.load.image('food', 'assets/food1.png');
    this.load.image('tile', 'assets/tile.png');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    // 카메라 & 배경
    this.cameras.main.setBounds(-w, -h, w * 2, h * 2);
    this.cameras.main.setBackgroundColor('#444');
    // 수정: world 전체(2w × 2h)를 타일로 덮음
    this.add.tileSprite(-w,-h,w * 2, h * 2,'tile').setOrigin(0).setTileScale(1).setDepth(-1);

    // 물리 경계 & 그룹
    this.physics.world.setBounds(-w, -h, w * 2, h * 2);
    this.foodGroup = this.physics.add.group();
    this.snakes    = [];

    // 음식 100개 흩뿌리기
    for (let i = 0; i < 100; i++) {
      this.initFood(
        Util.randomInt(-w, w),
        Util.randomInt(-h, h)
      );
    }

    // 플레이어 스네이크 (sectionKey='circle', headKey='face')
    const player = new PlayerSnake(this, 'circle', 'face', 0, 0);
    this.snakes.push(player);
    this.cameras.main.startFollow(player.head);

    // 봇 스네이크 두 마리
    const bot1 = new BotSnake(this, 'circle', 'face', -200, 0);
    const bot2 = new BotSnake(this, 'circle', 'face',  200, 0);
    this.snakes.push(bot1, bot2);

    // 충돌&파괴 콜백
    this.snakes.forEach(snake => {
      // food랑 부딪히면 eat() 호출
      this.physics.add.overlap(
        snake.head,
        this.foodGroup,
        (headSprite, foodSprite) => foodSprite.food.onHit(headSprite),
        null,
        this
      );
      // snakeDestroyed 이벤트 등록
      snake.addDestroyedCallback(this.snakeDestroyed, this);
    });
  }

  update(time, delta) {
    this.snakes.forEach(s => s.update(time, delta));
    this.foodGroup.getChildren().forEach(sprite => sprite.food.update());
  }

  initFood(x, y) {
    const f = new Food(this, x, y);
    this.foodGroup.add(f.sprite);
    return f;
  }

  snakeDestroyed(snake) {
    const path = snake.headPath;
    const len  = snake.snakeLength;
    for (let i = 0; i < path.length; i += Math.max(1, Math.round(path.length/len) * 2)) {
      this.initFood(
        path[i].x + Util.randomInt(-10, 10),
        path[i].y + Util.randomInt(-10, 10)
      );
    }
  }
}
