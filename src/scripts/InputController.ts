export default class InputController {
  mouseLocked: boolean = false;
  mouseSensitivity: number;

  mouseEvents: ((x: number, y: number, sensitivity: number) => void)[] = [];
  keyboardLoopEvents: {
    key: string,
    pressed: boolean,
    fn: () => void
  }[] = [];

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
  
  constructor(viewport: HTMLDivElement, config: { mouseSensitivity?: number } = {}) {
    this.mouseSensitivity = config.mouseSensitivity || 0.2;
    
    viewport.addEventListener('click', () => viewport.requestPointerLock());
    document.addEventListener('pointerlockchange', () => this.mouseLocked = document.pointerLockElement === viewport);

    // Mouse
    document.addEventListener('mousemove', e => {
      if (!this.mouseLocked) return;
    
      this.mouseEvents.forEach(i => i(e.movementX, e.movementY, this.mouseSensitivity));
    });
    
    // Prevent Ctrl shortcuts
    document.body.addEventListener('keydown', event => {
      if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
        event.preventDefault()
      }
    })
    
    // Keyboard down
    document.addEventListener('keydown', e => {
      if (e.repeat) return;

      for (let k in this.keyMaps) {
        if (e.code === (this.keyMaps as any)[k]) {
          (this.keys as any)[k] = true;
        }
      }
    });

    // Keyboard up
    document.addEventListener('keyup', e => {
      for (let k in this.keyMaps) {
        if (e.code === (this.keyMaps as any)[k]) {
          (this.keys as any)[k] = false;
        }
      }
    });
  }

  public loop() {
    this.keyboardLoopEvents.forEach(i => {
      if ((this.keys as any)[i.key] === i.pressed) {
        i.fn();
      }
    });
  }

  onMouse(fn: (x: number, y: number, sensitivity: number) => void): void {
    this.mouseEvents.push(fn);
  }

  onKeyboardLoop(key: string, pressed: boolean, fn: () => void): void {
    this.keyboardLoopEvents.push({
      key: key,
      pressed: pressed,
      fn: fn
    });
  }
}