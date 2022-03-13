/* eslint-disable no-underscore-dangle */
import { Application } from 'pixi.js';
import IScene from './IScene';

export default class Manager {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static app: Application;

  private static currentScene: IScene;

  private static _width: number;

  private static _height: number;

  public static get width(): number {
    return this._width;
  }

  public static get height(): number {
    return this._height;
  }

  public static initialize(width: number, height: number, background: number): void {
    Manager._width = width;
    Manager._height = height;

    Manager.app = new Application({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width,
      height,
    });

    Manager.app.ticker.add(Manager.update);
  }

  public static changeScene(newScene: IScene): void {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
  }

  public static update(delta: number): void {
    if (Manager.currentScene) {
      Manager.currentScene.update(delta);
    }
  }
}
