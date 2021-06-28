import Block from './Block'
import Air from './Blocks/Air'

export default class World {
  blocks: {[key: number]: {[key: number]: {[key: number]: Block}}} = {};
  scene: HTMLDivElement;

  constructor(scene: HTMLDivElement) {
    this.scene = scene;

    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.createBlock(i, 0, j);
      }
    }
    
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        this.getBlock(i, 0, j).update();
      }
    }
  }

  private createBlock(x: number, y: number, z: number): void {
    let block;

    if (Math.random() > 0.5) {
      block = new Block(x, y, z, this);
    } else {
      block = new Air(x, y, z, this)
    }

    if (!Object.keys(this.blocks).find(i => parseInt(i) === x)) {
      this.blocks[x] = {};
    }

    if (!Object.keys(this.blocks[x]).find(i => parseInt(i) === y)) {
      this.blocks[x][y] = {};
    }

    this.blocks[x][y][z] = block;

    this.scene.appendChild(block.element);
  }

  public getBlock(x: number, y: number, z: number): any {
    if (!Object.keys(this.blocks).find(i => parseInt(i) === x)) return null;
    if (!Object.keys(this.blocks[x]).find(i => parseInt(i) === y)) return null;
    if (!Object.keys(this.blocks[x][y]).find(i => parseInt(i) === z)) return null;
    if(!this.blocks[x][y][z]) return null;

    return this.blocks[x][y][z];
  }
}