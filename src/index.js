// import * as THREE from 'three';
/* global THREE */
import ShapeCreator from './shape-creator';
import MaterialCreator from './material-creator';

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(35, aspectRatio, 300, 10000);
const controls = new THREE.OrbitControls(camera);
const pointLight = new THREE.PointLight(0xFFFFFF, 0.5);
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
const renderer = new THREE.WebGLRenderer();
const shapeDetails = {
  model: {
    type: '',
    geometry: [],
    materialCreator: new MaterialCreator(true, { color: 0x00ffff }, 'Basic'),
    size: {
      max: 100,
      min: 50,
    },
    radius: 100,
  },
  ground: {
    type: 'Plane',
    geometry: [10000, 10000, 100, 100],
    materialCreator: new MaterialCreator(false, { color: 0xF3FFE2 }, 'Lambert'),
  },
};
const model = new ShapeCreator(shapeDetails.model).shape; // Creating a shape
const ground = new ShapeCreator(shapeDetails.ground).shape;
const dist = -1000;

// Scene Details
scene.background = new THREE.Color(0x444c55);

// Camera
camera.position.x = 480;
camera.position.y = 1162;
camera.position.z = 3211;

scene.add(camera);

// Lighting
pointLight.position.set(0, 300, 200);
scene.add(pointLight);
scene.add(ambientLight);

// Rendering
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
ground.rotation.x = -90 * Math.PI / 180;
ground.position.z = dist;
scene.add(ground);

// Model
model.position.z = dist;
model.position.y = 160;

scene.add(model);
// camera.lookAt(model.position);
controls.update();

// Rendering the scene
function render() {
  requestAnimationFrame(render);
  model.rotation.x -= 0.02;
  model.rotation.y -= clock.getDelta();
  model.rotation.z += 0.02;
  controls.update();
  // console.log(`(${camera.position.x}, ${camera.position.y}, ${camera.position.z})`);
  renderer.render(scene, camera);
}

render();
