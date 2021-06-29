import Entity from './Entity';

export default class Camera {
  private position: {
    x: number,
    y: number,
    z: number
  }
  private rotation = {
    yaw: 0,
    pitch: 0
  }
  private scene: HTMLDivElement;
  private bindedEntity: {
    position: Entity | null
  } = {
    position: null
  };

  // keys = {
  //   up: false,
  //   left: false,
  //   down: false,
  //   right: false,
  //   jump: false,
  //   crouch: false
  // }
  
  
  constructor(scene: HTMLDivElement, config?: { position?: { x: number, y: number, z: number }, rotation?: { yaw: number, pitch: number } }) {
    this.scene = scene;

    this.position = {
      x: ((config || {}).position || {}).x || 0,
      y: ((config || {}).position || {}).y || 0,
      z: ((config || {}).position || {}).z || 0
    };

    this.setYaw(((config || {}).rotation || {}).yaw || 0);
    this.setPitch(((config || {}).rotation || {}).pitch || 0);
  }
  
  public loop(): void {    
    // Move with entity if binded
    if (this.bindedEntity.position !== null) {
      const { x, y, z } = this.bindedEntity.position.getPosition();

      this.position.x = x;
      this.position.y = y;
      this.position.z = z;
    }
    
    // Move camera transforming CSS
    this.scene.style.transform = `
    rotateX(${-this.rotation.pitch}deg)
    rotateY(${ this.rotation.yaw}deg)
    translateX(0.5rem)
    translateY(0.5rem)
    translateZ(0.5rem)
    translateX(${-this.position.x}rem)
    translateY(${ this.position.y}rem)
    translateZ(${-this.position.z}rem)
    `;
  }

  public rotate(x: number, y: number): void {
    this.setYaw(this.rotation.yaw + x);
    this.setPitch(this.rotation.pitch + y);
  }

  private setYaw(yaw: number): void {
    if (yaw > 360) yaw -= 360;
    if (yaw < 0) yaw += 360;
    
    this.rotation.yaw = yaw;
  }

  private setPitch(pitch: number): void {
    this.rotation.pitch = Math.min(Math.max(pitch, -90), 90);
  }

  public bindPosition(entity: Entity): void {
    this.bindedEntity.position = entity;
  }

  public getRotation() {
    return this.rotation;
  }
}