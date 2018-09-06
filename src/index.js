// import * as THREE from 'three';
/* global THREE */
import ShapeCreator from './shape-creator';
import MaterialCreator from './material-creator';

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 10000);
const pointLightTop = new THREE.PointLight(0x999999);
const ambientLight = new THREE.AmbientLight(0x555555);
const renderer = new THREE.WebGLRenderer();
const shapeDetails = {
  type: '',
  geometry: [],
  materialCreator: new MaterialCreator(true, { color: 0x00ffff }),
  size: {
    max: 100,
    min: 10,
  },
  radius: 100,
};
const model = new ShapeCreator(shapeDetails); // Creating a shape

// Camera
camera.position.y = 160;
camera.position.z = 400;
scene.add(camera);

// Lighting
pointLightTop.position.set(0, 300, 200);
scene.add(pointLightTop);
scene.add(ambientLight);

// Rendering
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Model
scene.add(model.shapes[0].mesh);
camera.lookAt(model.shapes[0].mesh.position);

// Rendering the scene
function render() {
  requestAnimationFrame(render);
  model.shapes[0].mesh.rotation.x -= 0.02;
  model.shapes[0].mesh.rotation.y -= clock.getDelta();
  model.shapes[0].mesh.rotation.z += 0.02;
  renderer.render(scene, camera);
}

render();
