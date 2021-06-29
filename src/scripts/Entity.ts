export default class Entity {
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
  
  constructor ({x, y, z}: { x: number, y: number, z: number }) {
    this.position = {x, y, z};
  }

  public loop(): void {}

  public getPosition() {
    return this.position;
  }
}