import './styles/main.scss'
import World from './scripts/World'

let x = 0;
let y = 3.5;
let z = 0;

let rx = 135;
let ry = 48;

const scene = document.querySelector<HTMLDivElement>('#scene')!;

const world = new World(scene);

// world.createBlock(0, 0, 0);
// world.createBlock(2, 0, 2);
// world.createBlock(0, 0, 4);
// world.createBlock(-2, 0, 2);
// world.createBlock(1, 1, 0);
// world.createBlock(2, 1, 1);
// world.createBlock(-2, 1, 4);

setInterval(() => {
  // x = (Math.cos(rx / 15) * 0.25) + 0.5;
  // y = (Math.sin(rx / 13) * 0.15) + 2.5;
  // z = (Math.sin(rx / 10) * 0.4) + 2.5;

  scene.style.transform = `
  rotateX(${-ry}deg)
  rotateY(${rx}deg)
  translateX(0.5rem)
  translateY(0.5rem)
  translateZ(0.5rem)
  translateX(${-x}rem)
  translateY(${y}rem)
  translateZ(${-z}rem)
  `;
}, 1/60);

// const app = document.querySelector<HTMLDivElement>('#app')!