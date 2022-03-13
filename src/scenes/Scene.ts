import { Container, Sprite } from 'pixi.js';
import Manager from '../Manager/Manager';
import IScene from '../Manager/IScene';

export default class GameScene extends Container implements IScene {
  private box: Sprite;

  private boxVelocity: number;

  constructor() {
    super();

    this.box = Sprite.from('block_01.png');

    this.box.anchor.set(0.5);
    this.box.x = Manager.width / 2;
    this.box.y = Manager.height / 2;
    this.addChild(this.box);

    this.boxVelocity = 2.5;
  }

  public update(framesPassed: number): void {
    this.box.x += this.boxVelocity * framesPassed;

    if (this.box.x + this.box.width / 2 >= Manager.width) {
      this.box.x = Manager.width - this.box.width / 2;
      this.boxVelocity = -this.boxVelocity;
    }

    if (this.box.x - this.box.width / 2 < 0) {
      this.box.x = 0 + this.box.width / 2;
      this.boxVelocity = -this.boxVelocity;
    }
  }
}
