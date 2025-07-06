// src/entities/snake.js
import Shadow from './shadow.js';
import Util   from '../Util.js';

export default class Snake {
  /**
   * @param {Phaser.Scene} scene
   * @param {string} sectionKey — 몸통에 사용할 스프라이트 키
   * @param {string} headKey    — 머리에 사용할 스프라이트 키
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, sectionKey, headKey, x, y) {
    this.scene      = scene;
    scene.snakes    = scene.snakes || [];
    scene.snakes.push(this);

    this.sectionKey = sectionKey;
    this.headKey    = headKey;
    this.scale      = 0.6;
    this.fastSpeed  = 200;
    this.slowSpeed  = 130;
    this.speed      = this.slowSpeed;
    this.rotationSpeed    = 0.05;       // rad/s
    this.preferredDistance = 17 * this.scale;
    this.queuedSections    = 0;

    this.sections    = [];
    this.headPath    = [];
    this.snakeLength = 0;

    // 섀도우 & 섹션 그룹
    this.shadow       = new Shadow(scene, this.sections, this.scale);
    this.sectionGroup = scene.physics.add.group();

    // — 헤드 생성 (headKey 사용) —
    this.head = scene.physics.add.sprite(x, y, this.headKey)
      .setOrigin(0.5)
      .setScale(this.scale);
    this.head.snake = this;
    this.head.body.setCircle(this.head.width * 0.5);
    this.head.body.setCollideWorldBounds(false);

    // 마지막 헤드 위치 저장
    this.lastHeadPosition = new Phaser.Math.Vector2(this.head.x, this.head.y);

    // 초기 섹션 배치 (30개)
    this.initSections(30);

    // — edge 센서 (머리 앞 충돌 감지) —
    this.edgeOffset = 4;
    this.edge = scene.physics.add.sprite(x, y - this.edgeOffset, this.headKey)
      .setOrigin(0.5)
      .setAlpha(0);
    this.edge.body.setCircle(this.edgeOffset);
    this.edge.body.allowGravity = false;
    this.edge.body.immovable    = true;
    scene.physics.add.overlap(
      this.edge,
      this.sectionGroup,
      this.edgeContact,
      null,
      this
    );

    this.onDestroyedCallbacks = [];
  }

  initSections(num) {
    for (let i = 1; i <= num; i++) {
      const px = this.head.x;
      const py = this.head.y + i * this.preferredDistance;
      this.addSectionAtPosition(px, py);
      this.headPath.push(new Phaser.Math.Vector2(px, py));
    }
  }

  addSectionAtPosition(x, y) {
    const sec = this.sectionGroup.create(x, y, this.sectionKey)
      .setOrigin(0.5)
      .setScale(this.scale);
    sec.body.setCircle(sec.width * 0.5);
    sec.body.immovable = true;

    this.snakeLength++;
    this.sections.push(sec);
    this.shadow.add(x, y);
    return sec;
  }

  update(time, delta) {
    // 1) 머리 앞으로 이동
    this.scene.physics.velocityFromRotation(
      this.head.rotation - Math.PI / 2,
      this.speed,
      this.head.body.velocity
    );

    // 2) headPath 갱신
    const pt = this.headPath.pop() || new Phaser.Math.Vector2();
    pt.set(this.head.x, this.head.y);
    this.headPath.unshift(pt);

    // 3) 섹션 위치 맞추기
    let index = 0, lastIndex = null;
    for (let i = 0; i < this.snakeLength; i++) {
      const sec = this.sections[i];
      sec.x = this.headPath[index].x;
      sec.y = this.headPath[index].y;
      sec.setVisible(!(lastIndex !== null && index === lastIndex));
      lastIndex = index;
      index = this.findNextPointIndex(index);
    }

    // 4) headPath 길이 조정
    if (index >= this.headPath.length - 1) {
      this.headPath.push(this.headPath[this.headPath.length - 1].clone());
    } else {
      this.headPath.pop();
    }

    // 5) 사이클 완료 체크
    let found = false, i = 0;
    while (i < this.headPath.length) {
      if (
        this.headPath[i].equals(this.sections[1]) ||
        this.headPath[i].equals(this.lastHeadPosition)
      ) {
        found = true;
        break;
      }
      i++;
    }
    if (!found) {
      this.lastHeadPosition.set(this.head.x, this.head.y);
      this.onCycleComplete();
    }

    // 6) 섀도우 업데이트 (눈 기능 제거)
    this.shadow.update();
  }

  findNextPointIndex(currentIndex) {
    const pref = this.preferredDistance;
    let sum = 0, prevDiff = null, diff = null, i = currentIndex;
    while (i + 1 < this.headPath.length && (diff === null || diff < 0)) {
      const a = this.headPath[i], b = this.headPath[i + 1];
      const d = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
      sum += d;
      prevDiff = diff;
      diff = sum - pref;
      i++;
    }
    return (prevDiff === null || Math.abs(diff) < Math.abs(prevDiff)) ? i : i - 1;
  }

  onCycleComplete() {
    if (this.queuedSections > 0) {
      const lastSec = this.sections[this.sections.length - 1];
      this.addSectionAtPosition(lastSec.x, lastSec.y);
      this.queuedSections--;
    }
  }

  setScale(scale) {
    this.scale = scale;
    this.preferredDistance = 17 * scale;
    this.sections.forEach(sec => {
      sec.setScale(scale);
      sec.body.setCircle(sec.width * 0.5);
    });
    this.shadow.setScale(scale);
  }

  incrementSize() {
    this.queuedSections++;
    this.setScale(this.scale * 1.01);
  }

  destroy() {
    // 씬의 snakes 배열에서 제거
    this.scene.snakes = this.scene.snakes.filter(s => s !== this);

    // edge, 섹션, 섀도우 파괴
    this.edge.destroy();
    this.sections.forEach(sec => sec.destroy());
    this.shadow.destroy();

    // destruction 콜백 호출
    this.onDestroyedCallbacks.forEach(cb => cb.func.call(cb.ctx, this));
  }

  edgeContact(edgeSprite, sectionSprite) {
    // 다른 뱀 부딪히면 파괴, 자기 몸통이면 edge 위치 리셋
    if (sectionSprite.snake !== this) {
      this.destroy();
    } else {
      this.edge.setPosition(this.head.x, this.head.y);
    }
  }

  addDestroyedCallback(func, ctx) {
    this.onDestroyedCallbacks.push({ func, ctx });
  }
}
