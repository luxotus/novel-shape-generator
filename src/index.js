// import * as THREE from 'three';
/* global THREE */
import ShapeCreator from './shape-creator';

// Creating the scene
const scene = new THREE.Scene();
const fieldOfView = 75;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating a cube
const details = {
  type: 'dodecahedron',
  geometry: [2, 2, 2],
  material: {
    color: 0x00ffff,
  },
  radius: 1,
};
const model = new ShapeCreator(details);
scene.add(model.shapes[0].mesh);

camera.position.z = 5;

// Rendering the scene
function animate() {
  requestAnimationFrame(animate);

  model.shapes[0].mesh.rotation.x += 0.01;
  model.shapes[0].mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
