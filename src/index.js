// import * as THREE from 'three';
/* global THREE */
import ShapeCreator from './shape-creator';

// Creating the scene
const scene = new THREE.Scene();

// Setting up clock
const clock = new THREE.Clock();

// Setup Camera
const fieldOfView = 45;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
camera.position.y = 160;
camera.position.z = 400;
scene.add(camera);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);
scene.add(pointLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating a cube
const details = {
  type: 'Box',
  geometry: [100, 100, 100],
  material: {
    color: 0x00ffff,
  },
  radius: 100,
};
const model = new ShapeCreator(details);
scene.add(model.shapes[0].mesh);
camera.lookAt(model.shapes[0].mesh.position);

// Rendering the scene
function render() {
  requestAnimationFrame(render);
  model.shapes[0].mesh.rotation.x -= 0.01;
  model.shapes[0].mesh.rotation.y -= clock.getDelta();
  renderer.render(scene, camera);
}

render();
