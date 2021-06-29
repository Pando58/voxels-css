import Camera from '../Camera'
import Entity from '../Entity'

export default class Player extends Entity {
  private walkSpeed = 0.1;
  private runSpeed = 0.2;
  private onGround = false;
  private verticalFlySpeed = 0.15;
  
  keys = {
    up: false,
    left: false,
    down: false,
    right: false,
    jump: false,
    crouch: false
  }

  keyMaps = {
    up: 'KeyW',
    left: 'KeyA',
    down: 'KeyS',
    right: 'KeyD',
    jump: 'Space',
    crouch: 'ControlLeft'
  };

  private attachedCamera: Camera | null = null;
  
  constructor({x, y, z}: { x: number, y: number, z: number }) {
    super({x, y, z});
  }

  public loop(): void {
    // Rotate
    if (this.attachedCamera !== null) {
      const { yaw, pitch } = this.attachedCamera.getRotation();

      this.rotation.yaw = yaw;
      this.rotation.pitch = pitch;
    }

    // Move
    const xVal = (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0);
    const zVal = (this.keys.down ? 1 : 0) - (this.keys.up ? 1 : 0);
    
    this.position.x += Math.cos(this.rotation.yaw * Math.PI / 180) * xVal * this.walkSpeed;
    this.position.z += Math.sin(this.rotation.yaw * Math.PI / 180) * xVal * this.walkSpeed;

    this.position.x += Math.cos((this.rotation.yaw + 90) * Math.PI / 180) * zVal * this.walkSpeed;
    this.position.z += Math.sin((this.rotation.yaw + 90) * Math.PI / 180) * zVal * this.walkSpeed;

    const yVal = (this.keys.jump ? 1 : 0) - (this.keys.crouch ? 1 : 0);
    this.position.y += yVal * this.verticalFlySpeed;
  }

  public attachToCamera(camera: Camera): void {
    this.attachedCamera = camera;
  }

  public setKeyboardInput(key: string, pressed: boolean): void {    
    if (this.keys.hasOwnProperty(key)) {
      (this.keys as any)[key] = pressed;
    }
  }

  // public moveLocalX(val: number) {
  //   this.position.x += Math.cos(this.rotation.yaw * Math.PI / 180) * val;
  //   this.position.z += Math.sin(this.rotation.yaw * Math.PI / 180) * val;
  // }

  // public moveLocalZ(val: number) {
  //   this.position.x += Math.cos((this.rotation.yaw + 90) * Math.PI / 180) * val;
  //   this.position.z += Math.sin((this.rotation.yaw + 90) * Math.PI / 180) * val;
  // }

  // public moveY(val: number) {
  //   this.position.y += val;
  // }
}