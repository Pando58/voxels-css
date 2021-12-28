import World from './World'

export default class Entity {
  protected world: World;
  protected position: {
    x: number,
    y: number,
    z: number
  };
  protected rotation = {
    yaw: 0,
    pitch: 0,
  };
  protected motion = {
    x: 0,
    y: 0,
    z: 0
  };

  protected bbox = {
    x: -0.5,
    y: -0.5,
    z: -0.5,
    w: 1,
    h: 1,
    d: 1
  };
  
  constructor (world: World, {x, y, z}: { x: number, y: number, z: number }) {
    this.world = world;
    this.position = {x, y, z};
  }

  // @ts-ignore
  public loop(delta: number): void {}

  public getPosition() {
    return this.position;
  }
}