import './styles/main.scss'
import World from './scripts/World'
import Camera from './scripts/Camera'
import InputController from './scripts/InputController'
import Player from './scripts/entities/Player';

const viewport = document.querySelector<HTMLDivElement>('#game-viewport')!;
const scene = document.querySelector<HTMLDivElement>('#scene')!;

const world = new World(scene);
const camera = new Camera(scene, {
  rotation: {
    yaw: 0,
    pitch: 70
  }
});

const input = new InputController(viewport, {
  mouseSensitivity: 0.1
});


const player = new Player({ x: 8, y: 6, z: 16 });

world.addEntity(player);
camera.bindPosition(player);
player.attachToCamera(camera);


input.onMouse((x, y, sensitivity) => {
  camera.rotate(x * sensitivity, y * sensitivity);
});

input.onKeyboard((key, pressed) => {
  player.setKeyboardInput(key, pressed);
});

// input.onKeyboardLoop('left',   true, () => player.moveLocalX(-0.1));
// input.onKeyboardLoop('right',  true, () => player.moveLocalX(0.1));
// input.onKeyboardLoop('up',     true, () => player.moveLocalZ(-0.1));
// input.onKeyboardLoop('down',   true, () => player.moveLocalZ(0.1));
// input.onKeyboardLoop('jump',   true, () => player.moveY(0.1));
// input.onKeyboardLoop('crouch', true, () => player.moveY(-0.1));

function loop() {
  input.loop();
  camera.loop();
  world.loop();
  
  requestAnimationFrame(loop);
}

loop();