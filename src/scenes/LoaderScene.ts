import { Container, Graphics, Loader } from 'pixi.js';
import assets from '../Assets/assets';
import Manager from '../Manager/Manager';
import IScene from '../Manager/IScene';
import Scene from './Scene';

export default class LoaderScene extends Container implements IScene {
  private loaderBar: Container;

  private loaderBarBoder: Graphics;

  private loaderBarFill: Graphics;

  constructor() {
    super();

    const loaderBarWidth = Manager.width * 0.8;

    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x008800, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new Graphics();
    this.loaderBarBoder.lineStyle(10, 0x0, 1);
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);

    Loader.shared.add(assets);

    Loader.shared.onProgress.add(this.downloadProgress, this);
    Loader.shared.onComplete.once(this.gameLoaded, this);

    Loader.shared.load();
  }

  private downloadProgress(loader: Loader): void {
    const progressRatio = loader.progress / 100;
    this.loaderBarFill.scale.x = progressRatio;
  }

  // eslint-disable-next-line class-methods-use-this
  private gameLoaded(): void {
    Manager.changeScene(new Scene());
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  public update(_framesPassed: number): void {
  }
}
