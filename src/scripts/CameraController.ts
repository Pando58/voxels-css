export default class CameraController {
  x: number = 0;
  y: number = 3.5;
  z: number = 0;
  rx: number = 135;
  ry: number = 48;
  scene: HTMLDivElement;

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
}