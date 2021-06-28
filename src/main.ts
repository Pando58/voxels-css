import './styles/main.scss'
import World from './scripts/World'
import CameraController from './scripts/CameraController'
import InputController from './scripts/InputController'

const viewport = document.querySelector<HTMLDivElement>('#game-viewport')!;
const scene = document.querySelector<HTMLDivElement>('#scene')!;

const world = new World(scene);
const camera = new CameraController(scene);
const input = new InputController(viewport, {
  mouseSensitivity: 0.1
});

input.onMouse((x, y, sensitivity) => {
  camera.rotate(x * sensitivity, y * sensitivity);
});

input.onKeyboardLoop('left',  true, () => camera.moveLocalX(-0.1));
input.onKeyboardLoop('right', true, () => camera.moveLocalX(0.1));
input.onKeyboardLoop('up',    true, () => camera.moveLocalZ(-0.1));
input.onKeyboardLoop('down',  true, () => camera.moveLocalZ(0.1));
input.onKeyboardLoop('jump',    true, () => camera.moveY(0.1));
input.onKeyboardLoop('crouch',  true, () => camera.moveY(-0.1));

function loop() {
  input.loop();
  camera.loop();
  
  requestAnimationFrame(loop);
}

loop();