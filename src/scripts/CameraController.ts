export default class CameraController {
  x: number = 8;
  y: number = 3.5;
  z: number = 8;
  rx: number = 0;
  ry: number = 48;
  scene: HTMLDivElement;

  keys = {
    up: false,
    left: false,
    down: false,
    right: false,
    jump: false,
    crouch: false
  }

  constructor(scene: HTMLDivElement) {
    this.scene = scene;
  }
  
  public loop(): void {    
    this.scene.style.transform = `
    rotateX(${-this.ry}deg)
    rotateY(${this.rx}deg)
    translateX(0.5rem)
    translateY(0.5rem)
    translateZ(0.5rem)
    translateX(${-this.x}rem)
    translateY(${this.y}rem)
    translateZ(${-this.z}rem)
    `;
  }

  public rotate(x: number, y: number): void {
    this.rx += x;

    if (this.rx > 360) this.rx -= 360;
    if (this.rx < 0) this.rx += 360;

    this.ry = Math.min(Math.max(this.ry + y, -90), 90);
  }

  public moveLocalX(val: number) {
    this.x += Math.cos(this.rx * Math.PI / 180) * val;
    this.z += Math.sin(this.rx * Math.PI / 180) * val;
  }

  public moveLocalZ(val: number) {
    this.x += Math.cos((this.rx + 90) * Math.PI / 180) * val;
    this.z += Math.sin((this.rx + 90) * Math.PI / 180) * val;
  }

  public moveY(val: number) {
    this.y += val;
  }
}