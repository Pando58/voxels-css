import './styles/main.scss'
import World from './scripts/World'
import CameraController from './scripts/CameraController';

const scene = document.querySelector<HTMLDivElement>('#scene')!;

const world = new World(scene);
const camera = new CameraController(scene);

function loop() {
  camera.loop();
  
  requestAnimationFrame(loop);
}

loop();