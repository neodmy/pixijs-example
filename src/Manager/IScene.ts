import { DisplayObject } from 'pixi.js';

export default interface IScene extends DisplayObject {
  update(framesPassed: number): void;
}
