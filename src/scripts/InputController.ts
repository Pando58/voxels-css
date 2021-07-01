export default class InputController {
  mouseLocked: boolean = false;
  mouseSensitivity: number;

  mouseEvents: ( (x: number, y: number) => void )[] = [];
  keyboardEvents: ( (key: string, pressed: boolean) => void )[] = [];
  keyboardLoopEvents: { key: string, pressed: boolean, fn: () => void }[] = [];

  keys: {[key: string]: boolean} = {};

  keyMaps: {[key: string]: string};
  
  constructor(viewport: HTMLDivElement, keyMaps: {[key: string]: string}, config: { mouseSensitivity?: number } = {}) {
    this.mouseSensitivity = config.mouseSensitivity || 0.2;
    this.keyMaps = keyMaps;

    Object.keys(keyMaps).forEach(i => {
      this.keys[i] = false;
    });
    
    viewport.addEventListener('click', () => viewport.requestPointerLock());
    document.addEventListener('pointerlockchange', () => this.mouseLocked = document.pointerLockElement === viewport);

    // Prevent Ctrl shortcuts
    document.body.addEventListener('keydown', event => {
      if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
        event.preventDefault()
      }
    })
    
    // Mouse
    document.addEventListener('mousemove', e => {
      if (!this.mouseLocked) return;
    
      this.mouseEvents.forEach(i => i(e.movementX * this.mouseSensitivity, e.movementY * this.mouseSensitivity));
    });
    
    // Keyboard down
    document.addEventListener('keydown', e => {
      if (e.repeat) return;

      for (let k in this.keyMaps) {
        if (e.code === (this.keyMaps as any)[k]) {
          (this.keys as any)[k] = true;
        }
      }

      this.keyboardEvents.forEach(i => i((Object.keys(this.keyMaps).find(key => (this.keyMaps as any)[key] === e.code) as string), true));
    });

    // Keyboard up
    document.addEventListener('keyup', e => {
      for (let k in this.keyMaps) {
        if (e.code === (this.keyMaps as any)[k]) {
          (this.keys as any)[k] = false;
        }
      }

      this.keyboardEvents.forEach(i => i((Object.keys(this.keyMaps).find(key => (this.keyMaps as any)[key] === e.code) as string), false));
    });
  }

  public loop() {
    this.keyboardLoopEvents.forEach(i => {
      if ((this.keys as any)[i.key] === i.pressed) {
        i.fn();
      }
    });
  }

  onMouse(fn: (x: number, y: number) => void): void {
    this.mouseEvents.push(fn);
  }

  onKeyboard(fn: (key: string, pressed: boolean) => void): void {
    this.keyboardEvents.push(fn);
  }

  onKeyboardLoop(key: string, pressed: boolean, fn: () => void): void {
    this.keyboardLoopEvents.push({
      key: key,
      pressed: pressed,
      fn: fn
    });
  }
}