import './styles/main.scss'

let x = 0.5;
let y = 0.5;
let z = 2.5;

let rx = 0;
let ry = 15;

const scene = document.querySelector<HTMLDivElement>('#scene')!;

function createCube(xx: number, yy: number, zz: number) {
  const cube = document.createElement('div');

  cube.classList.add('cube');

  cube.innerHTML = `
  <div class="front"></div>
  <div class="left"></div>
  <div class="back"></div>
  <div class="right"></div>
  <div class="top"></div>
  <div class="bottom"></div>
  `;

  cube.style.transform = `
    translateX(${xx}rem)
    translateY(${-yy}rem)
    translateZ(${zz}rem)
  `;

  scene.appendChild(cube);
}

createCube(0, 0, 0);
createCube(2, 0, 2);
createCube(0, 0, 4);
createCube(-2, 0, 2);

createCube(1, 1, 0);
createCube(2, 1, 1);

createCube(-2, 1, 4);

setInterval(() => {
  rx += 0.15;

  x = (Math.cos(rx / 15) * 0.25) + 0.5;
  y = (Math.sin(rx / 13) * 0.15) + 0.5;
  z = (Math.sin(rx / 10) * 0.4) + 2.5;

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