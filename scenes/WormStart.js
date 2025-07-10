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

    this.load.image('tiniwormbody1', 'assets/tiniwormbody1.png');
    this.load.image('tiniwormbody2', 'assets/tiniwormbody2.png');
    this.load.image('tiniwormbody3', 'assets/tiniwormbody3.png');
    this.load.image('tiniwormbody4', 'assets/tiniwormbody4.png');


    this.load.image('skin1', 'items/skin1.png');
    this.load.image('skin2', 'items/skin2.png');
    this.load.image('skin3', 'items/skin3.png');
    this.load.image('skin4', 'items/skin4.png');


    // 섹션, 머리, 그림자, 먹이, 타일 이미지 로드
    this.load.image('circle', 'assets/tiniwormbody.png');
    
    this.load.image('face',   'assets/character.png');
    for (let i = 1; i <= 7; i++) {
      this.load.image(`food${i}`, `assets/food${i}.png`);
    }
    this.load.image('tile', 'assets/tile.png');
    this.load.image('gamebackground', 'assets/gamebackground.png')
  }

  create() {
    this.scoreSent = false

    this.logs = []; // AI 학습용 로그
    this.startTime = performance.now();
    this.lastLogTime = 0;  // ✅ 마지막 로그 저장 시각

    const w = this.scale.width;
    const h = this.scale.height;

    // 디버그 그래픽 (원하면 켜두세요)
    //this.physics.world.createDebugGraphic();

    // 카메라 & 배경
    this.cameras.main.setBounds(-w, -h, w * 2, h * 2);
    this.cameras.main.setBackgroundColor('#444');
    // 타일 배경 추가 (전체 월드 크기로 반복)
    this.add.tileSprite(
      -w, -h,     // 시작 좌표 (월드 경계 시작)
      w * 2, h * 2, // 전체 월드 사이즈
      'gamebackground' // 배경 이미지 키
    ).setOrigin(0).setDepth(-1);

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

    const currentUser = localStorage.getItem('currentUser');
    const savedSkin = currentUser ? localStorage.getItem(`selectedHeadSkin_${currentUser}`) || 'face' : 'face';

    let bodyTextureKey = 'circle';
    if (savedSkin === 'skin1') bodyTextureKey = 'tiniwormbody1';
    else if (savedSkin === 'skin2') bodyTextureKey = 'tiniwormbody2';
    else if (savedSkin === 'skin3') bodyTextureKey = 'tiniwormbody3';
    else if (savedSkin === 'skin4') bodyTextureKey = 'tiniwormbody4';


    const player = new PlayerSnake(this, bodyTextureKey, savedSkin, 0, 0);
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

      // 점수 초기값
  this.score = 0;

  // 점수 텍스트 생성
  this.scoreText = this.add.text(
    this.scale.width - 220, 40, // x, y 위치
    'SCORE: 0',
    {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 4,
    }
  ).setScrollFactor(0); // 카메라 움직여도 고정됨
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

      if (snake instanceof PlayerSnake) {
        this.score += 50;
        this.scoreText.setText('SCORE: ' + this.score);
      }

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

    // update 함수의 마지막 부분
    const now = performance.now();
    if (now - this.lastLogTime >= 5000) {
      this.snakes.forEach(snake => {
        const { x, y } = snake.head;

        this.logs.push({
          step: this.logs.length,
          state_x: 0,
          state_y: 0,
          player_x: Number(x),
          player_y: Number(y),
          action: 0,
          boost: false,
          reward: 0,
          event: 'move',
        });
      });
      this.lastLogTime = now;
    }
  }

  initFood(x, y) {
    const n   = Phaser.Math.Between(1, 7);
    const key = `food${n}`;
    const f   = new Food(this, x, y, key);
    this.foodGroup.add(f.sprite);
    return f;
  }

  sendLogsToBackend() {
    if (!this.logs || this.logs.length === 0 || this.logsSent) return;
    this.logsSent = true;

    const token = localStorage.getItem('token');

    const payloadArray = this.logs.map((log) => ({
      step: log.step,
      state_x: log.state_x,
      state_y: log.state_y,
      player_x: log.player_x,
      player_y: log.player_y,
      action: log.action,
      boost: log.boost,
      reward: log.reward,
      event: log.event
    }));

    console.log('📤 전송할 전체 로그 배열:', payloadArray);

    fetch('http://34.169.165.241:8000/bot_log/log?domain=bot_log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(payloadArray),
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(`🚫 전체 로그 전송 실패: ${text}`); });
        return res.json();
      })
      .then(data => {
        console.log(`✅ 전체 로그 전송 성공 응답:`, data);
      })
      .catch(err => {
        console.error(`❌ 전체 로그 전송 에러:`, err);
      });
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

    

  // ✅ 점수 전송 & 씬 전환 로직
  const sendScoreAndGoToGameOver = () => {
    if (this.scoreSent) return;
    this.scoreSent = true;  

    const token = localStorage.getItem('token');  // ✅ 누락된 부분 추가
    const score = this.score;

    this.sendLogsToBackend();

    fetch('http://34.169.165.241:8000/game_session/?domain=game_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })  
        },
      
      body: JSON.stringify({
        user_score: this.score,
      })
    })
    .then(res => res.json())
    .catch(err => {
      console.error('❌ 점수 전송 실패:', err);
    })
    .finally(() => {
      this.time.delayedCall(1000, () => {
        this.scene.start('GameOver', { score: score });
      });
    });
  };

  if (snake instanceof PlayerSnake) {
    sendScoreAndGoToGameOver();
  } else {
    const anyBotLeft = this.snakes.some(s => s instanceof BotSnake && !s.destroyed);
    if (!anyBotLeft) {
      sendScoreAndGoToGameOver();
    }
  }



}


}




