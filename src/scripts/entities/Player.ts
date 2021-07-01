import Camera from '../Camera'
import Entity from '../Entity'
import Block from '../Block'
import World from '../World';

export default class Player extends Entity {
  private walkSpeed = 0.05;
  private runSpeed = 0.1;
  private onGround = false;
  private jumpForce = 0.11;
  private verticalFlySpeed = 0.15;

  private viewOffset = {
    x: 0,
    y: 1.625,
    z: 0
  };

  protected bbox = {
    x: -0.3125,
    y: 0,
    z: -0.3125,
    w: 0.625,
    h: 1.8125,
    d: 0.625
  };
  
  private keys = {
    up: false,
    left: false,
    down: false,
    right: false,
    jump: false,
    crouch: false
  }

  private attachedCamera: Camera | null = null;
  
  constructor(world: World, {x, y, z}: { x: number, y: number, z: number }) {
    super(world, {x, y, z});
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
    // const yVal = (this.keys.jump ? 1 : 0) - (this.keys.crouch ? 1 : 0);

    this.motion.x = (Math.cos(this.rotation.yaw * Math.PI / 180) * xVal * this.walkSpeed) + (Math.cos((this.rotation.yaw + 90) * Math.PI / 180) * zVal * this.walkSpeed);
    this.motion.z = (Math.sin(this.rotation.yaw * Math.PI / 180) * xVal * this.walkSpeed) + (Math.sin((this.rotation.yaw + 90) * Math.PI / 180) * zVal * this.walkSpeed);
    // this.motion.y = yVal * this.verticalFlySpeed;

    if (this.onGround) {
      if (!this.keys.jump) {
        this.motion.y = 0;
      }
    } else {
      this.motion.y -= (10 / 1800);
    }

    this.move(this.motion.x, this.motion.y, this.motion.z);
  }

  private move(x: number, y: number, z: number): void {
    // X
    this.position.x += x;

    if (x > 0) {
      this.intersection((block: Block) => {
        const bPos = block.getPosition();

        if (this.position.x + this.bbox.x + this.bbox.w > bPos.x) { // this.r > block.l
          this.position.x = bPos.x - this.bbox.x - this.bbox.w; // this.r = block.l
        }
      });
    }

    if (x < 0) {
      this.intersection((block: Block) => {
        const bPos = block.getPosition();

        if (this.position.x + this.bbox.x < bPos.x + 1) { // this.l < block.r
          this.position.x = bPos.x + 1 - this.bbox.x; // this.l = block.r
        }
      });
    }

    // Y
    this.onGround = false;
    this.position.y += y;

    if (y > 0) {
      this.intersection((block: Block) => {
        const bPos = block.getPosition();

        if (this.position.y + this.bbox.y + this.bbox.h > bPos.y) { // this.r > block.l
          this.position.y = bPos.y - this.bbox.y - this.bbox.h; // this.r = block.l
        }
      });
    }

    if (y < 0) {
      this.intersection((block: Block) => {
        const bPos = block.getPosition();
        
        if (this.position.y + this.bbox.y < bPos.y + 1) { // this.l < block.r
          this.position.y = bPos.y + 1 - this.bbox.y; // this.l = block.r
          this.onGround = true;
        }
      });
    }
    
    // Z
    this.position.z += z;

    if (z > 0) {
      this.intersection((block: Block) => {
        const bPos = block.getPosition();

        if (this.position.z + this.bbox.z + this.bbox.d > bPos.z) { // this.r > block.l
          this.position.z = bPos.z - this.bbox.z - this.bbox.d; // this.r = block.l
        }
      });
    }

    if (z < 0) {
      this.intersection((block: Block) => {
        const bPos = block.getPosition();

        if (this.position.z + this.bbox.z < bPos.z + 1) { // this.l < block.r
          this.position.z = bPos.z + 1 - this.bbox.z; // this.l = block.r
        }
      });
    }
  }

  private intersection(fn: (block: Block) => void): void {
    const floor = {
      x: Math.floor(this.position.x + this.bbox.x),
      y: Math.floor(this.position.y + this.bbox.y),
      z: Math.floor(this.position.z + this.bbox.z)
    }

    const ceil = {
      x: Math.ceil(this.position.x + this.bbox.x + this.bbox.w),
      y: Math.ceil(this.position.y + this.bbox.y + this.bbox.h),
      z: Math.ceil(this.position.z + this.bbox.z + this.bbox.d)
    }

    for (let i = floor.x; i <= ceil.x; i++) {
      for (let j = floor.y; j <= ceil.y; j++) {
        for (let k = floor.z; k <= ceil.z; k++) {
          const cube = this.world.getBlock(i, j, k);

          if (cube?.isSolid()) {
            if (this.checkCollision(cube)) {
              fn(cube);
            }
          }
        }
      }
    }
  }

  private checkCollision(block: Block): boolean {
    const bPos = block.getPosition();

    const me = {
      left:   this.position.x + this.bbox.x,
      right:  this.position.x + this.bbox.x + this.bbox.w,
      bottom: this.position.y + this.bbox.y,
      top:    this.position.y + this.bbox.y + this.bbox.h,
      back:   this.position.z + this.bbox.z,
      front:  this.position.z + this.bbox.z + this.bbox.d
    };
    
    const cube = {
      left:   bPos.x,
      right:  bPos.x + 1,
      bottom: bPos.y,
      top:    bPos.y + 1,
      back:   bPos.z,
      front:  bPos.z + 1,
    }

    // console.log(me);
    // console.log(cube);
    
    return (
      me.right  > cube.left &&
      me.left   < cube.right &&
      me.top    > cube.bottom &&
      me.bottom < cube.top &&
      me.front  > cube.back &&
      me.back   < cube.front
    );
  }

  public attachToCamera(camera: Camera): void {
    this.attachedCamera = camera;
  }

  public getCameraOffset() {
    return this.viewOffset;
  };
  
  public setKeyboardInput(key: string, pressed: boolean): void {    
    if (this.keys.hasOwnProperty(key)) {
      (this.keys as any)[key] = pressed;
    }

    if (key == 'jump' && pressed) {
      this.motion.y = this.jumpForce;
    }
  }
}