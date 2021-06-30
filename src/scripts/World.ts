import Block from './Block'
import Air from './blocks/Air'
import Entity from './Entity';

export default class World {
  blocks: {[key: number]: {[key: number]: {[key: number]: Block}}} = {};
  entities: Entity[] = [];
  scene: HTMLDivElement;

  constructor(scene: HTMLDivElement) {
    this.scene = scene;

    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 16; k++) {
          this.createBlock(i, j, k);
        }
      }
    }
    
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 16; k++) {
          (this.getBlock(i, j, k) as Block).update();
        }
      }
    }
  }

  public loop(): void {
    this.entities.forEach(i => i.loop());
  }

  private createBlock(x: number, y: number, z: number): void {
    let block;

    if (Math.random() > 0.8) {
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

    if (block.id !== 'air') {
      this.scene.appendChild((block.element as HTMLDivElement));
    }
  }

  public getBlock(x: number, y: number, z: number): Block | null {
    if (!Object.keys(this.blocks).find(i => parseInt(i) === x)) return null;
    if (!Object.keys(this.blocks[x]).find(i => parseInt(i) === y)) return null;
    if (!Object.keys(this.blocks[x][y]).find(i => parseInt(i) === z)) return null;
    if(!this.blocks[x][y][z]) return null;

    return this.blocks[x][y][z];
  }

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }
}