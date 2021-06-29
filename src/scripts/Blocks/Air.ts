import Block from '../Block'
import World from '../World'

export default class Air extends Block {
  constructor(x: number, y: number, z: number, world: World) {
    super(x, y, z, world);

    this.id = 'air';
  }

  protected initialize(): void {}
  public update(): void {}
}