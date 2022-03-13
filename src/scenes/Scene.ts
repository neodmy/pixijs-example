/* eslint-disable max-len */
import {
  Container, AnimatedSprite, Texture, Loader,
} from 'pixi.js';
import Manager from '../Manager/Manager';
import IScene from '../Manager/IScene';

export default class GameScene extends Container implements IScene {
  private player: AnimatedSprite;

  private vx: number;

  private vy: number;

  private velocity: number = 2.5;

  private ANIMATION_SPEED: number = 0.3;

  private playerAnimations: Texture[] = Loader.shared.resources.assets.spritesheet?.animations.player as Texture[];

  private playerStates: { [key: string]: Texture[] } = {
    down: this.playerAnimations.slice(0, 1),
    walkDown: this.playerAnimations.slice(0, 3),
    up: this.playerAnimations.slice(3, 4),
    walkUp: this.playerAnimations.slice(3, 6),
    right: this.playerAnimations.slice(6, 7),
    walkRight: this.playerAnimations.slice(6, 9),
    left: this.playerAnimations.slice(9, 10),
    walkLeft: this.playerAnimations.slice(9, 11),
  };

  constructor() {
    super();

    this.player = new AnimatedSprite(this.playerStates.down);
    this.player.animationSpeed = this.ANIMATION_SPEED;

    this.player.anchor.set(0.5);
    this.player.x = Manager.width / 2;
    this.player.y = Manager.height / 2;
    this.addChild(this.player);

    this.vx = 0;
    this.vy = 0;

    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  public update(framesPassed: number): void {
    this.player.x += this.vx * framesPassed;
    this.player.y += this.vy * framesPassed;

    const leftEnd = this.player.x - this.player.width / 2;
    const rightEnd = this.player.x + this.player.width / 2;
    const upperEnd = this.player.y - this.player.height / 2;
    const bottomEnd = this.player.y + this.player.height / 2;

    if (rightEnd >= Manager.width) {
      this.player.x = Manager.width - this.player.width / 2;
    }

    if (leftEnd < 0) {
      this.player.x = 0 + this.player.width / 2;
    }

    if (upperEnd < 0) {
      this.player.y = 0 + this.player.height / 2;
    }

    if (bottomEnd > Manager.height) {
      this.player.y = Manager.height - this.player.height / 2;
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    const keyCodeMap: { [key: string]: Function } = {
      ArrowLeft: (): void => {
        if (!this.player.playing) {
          this.player.textures = this.playerStates.walkLeft;
          this.player.play();
        }
        this.vx = -this.velocity;
      },
      ArrowRight: (): void => {
        if (!this.player.playing) {
          this.player.textures = this.playerStates.walkRight;
          this.player.play();
        }
        this.vx = +this.velocity;
      },
      ArrowDown: (): void => {
        if (!this.player.playing) {
          this.player.textures = this.playerStates.walkDown;
          this.player.play();
        }
        this.vy = +this.velocity;
      },
      ArrowUp: (): void => {
        if (!this.player.playing) {
          this.player.textures = this.playerStates.walkUp;
          this.player.play();
        }
        this.vy = -this.velocity;
      },
      default: (): void => {},
    };
    (keyCodeMap[e.code] || keyCodeMap.default)();
  }

  private onKeyUp(e: KeyboardEvent): void {
    const keyCodeMap: { [key: string]: Function } = {
      ArrowLeft: (): void => {
        this.player.textures = this.playerStates.left;
        this.vx = 0;
      },
      ArrowRight: (): void => {
        this.player.textures = this.playerStates.right;
        this.vx = 0;
      },
      ArrowDown: (): void => {
        this.player.textures = this.playerStates.down;
        this.vy = 0;
      },
      ArrowUp: (): void => {
        this.player.textures = this.playerStates.up;
        this.vy = 0;
      },
      default: (): void => {},
    };
    (keyCodeMap[e.code] || keyCodeMap.default)();
  }
}
