import World from './World'

export default class Block {
  private x: number;
  private y: number;
  private z: number;
  private world: World;
  
  public id: string = 'solid';
  protected properties = {
    isSolid: true
  };
  
  public element: HTMLDivElement | null = null;
  private faces: {
    front: HTMLDivElement | null,
    left: HTMLDivElement | null,
    right: HTMLDivElement | null,
    back: HTMLDivElement | null,
    top: HTMLDivElement | null,
    bottom: HTMLDivElement | null
  } = {
    front: null,
    left: null,
    right: null,
    back: null,
    top: null,
    bottom: null
  };
  private showFaces = {
    front: false,
    left: false,
    right: false,
    back: false,
    top: false,
    bottom: false
  };

  private faceDirections = {
    front: [0, 0, 1],
    left: [-1, 0, 0],
    right: [1, 0, 0],
    back: [0, 0, -1],
    top: [0, 1, 0],
    bottom: [0, -1, 0]
  };
  
  constructor(x: number, y: number, z: number, world: World) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.world = world;

    this.initialize();
  }

  protected initialize(): void {
    this.element = document.createElement('div');
    this.element.classList.add('cube');
    
    this.element.style.transform = `
      translateX(${this.x}rem)
      translateY(${-this.y}rem)
      translateZ(${this.z}rem)
    `;
    // this.update();
  }

  public update(): void {
    // Check if faces should be rendered
    for (let key in this.faceDirections) {
      const f = (this.faceDirections as any)[key];
      const neighbor = this.world.getBlock(this.x + f[0], this.y + f[1], this.z + f[2]);

      (this.showFaces as any)[key] = true;
      
      if (neighbor) {
        if (neighbor.id !== 'air') {
          (this.showFaces as any)[key] = false;
        }
      }
    }
    
    // Create face elements
    Object.keys(this.showFaces).forEach(key => {
      const showFaces = (this.showFaces as any);
      const faces = (this.faces as any);

      if (showFaces[key]) {
        if (faces[key] === null) {
          faces[key] = document.createElement('div');
          faces[key].classList.add(key);

          (this.element as HTMLDivElement).appendChild(faces[key]);
        }
      } else {
        if (faces[key] !== null) {
          faces[key].remove();
        }
      }
    });
  }

  public getPosition(): { x: number, y: number, z: number } {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }

  public isSolid(): boolean {
    return this.properties.isSolid;
  }
}