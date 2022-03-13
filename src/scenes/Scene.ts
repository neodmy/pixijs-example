import { Container, Sprite } from 'pixi.js';
import Manager from '../Manager/Manager';
import IScene from '../Manager/IScene';

export default class GameScene extends Container implements IScene {
  private box: Sprite;

  private vx: number;

  private vy: number;

  private velocity: number;

  constructor() {
    super();

    this.box = Sprite.from('block_01.png');

    this.box.anchor.set(0.5);
    this.box.x = Manager.width / 2;
    this.box.y = Manager.height / 2;
    this.addChild(this.box);

    this.velocity = 5;
    this.vx = 0;
    this.vy = 0;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  public update(framesPassed: number): void {
    this.box.x += this.vx * framesPassed;
    this.box.y += this.vy * framesPassed;

    const leftEnd = this.box.x - this.box.width / 2;
    const rightEnd = this.box.x + this.box.width / 2;
    const upperEnd = this.box.y - this.box.height / 2;
    const bottomEnd = this.box.y + this.box.height / 2;

    if (rightEnd >= Manager.width) {
      this.box.x = Manager.width - this.box.width / 2;
    }

    if (leftEnd < 0) {
      this.box.x = 0 + this.box.width / 2;
    }

    if (upperEnd < 0) {
      this.box.y = 0 + this.box.height / 2;
    }

    if (bottomEnd > Manager.height) {
      this.box.y = Manager.height - this.box.height / 2;
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    const keyCodeMap: { [key: string]: Function } = {
      ArrowLeft: (): void => { this.vx = -this.velocity; },
      ArrowRight: (): void => { this.vx = +this.velocity; },
      ArrowDown: (): void => { this.vy = +this.velocity; },
      ArrowUp: (): void => { this.vy = -this.velocity; },
      default: (): void => {},
    };
    (keyCodeMap[e.code] || keyCodeMap.default)();
  }

  private onKeyUp(e: KeyboardEvent): void {
    const keyCodeMap: { [key: string]: Function } = {
      ArrowLeft: (): void => { this.vx = 0; },
      ArrowRight: (): void => { this.vx = 0; },
      ArrowDown: (): void => { this.vy = 0; },
      ArrowUp: (): void => { this.vy = 0; },
      default: (): void => {},
    };
    (keyCodeMap[e.code] || keyCodeMap.default)();
  }
}
