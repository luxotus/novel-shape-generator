// import * as THREE from 'three';
/* global THREE */
import ShapeCreator from './shape-creator';
import MaterialCreator from './material-creator';
import threeHelper from './threeHelper';

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(35, aspectRatio, 300, 10000);
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
    geometry: [1000, 1000, 100, 100],
    materialCreator: new MaterialCreator(false, { color: 0xF3FFE2 }, 'Lambert'),
  },
};
const model = new ShapeCreator(shapeDetails.model).shape; // Creating a shape
const ground = new ShapeCreator(shapeDetails.ground).shape;
const dist = -1000;


// Camera
camera.position.y = 160;
camera.position.z = 400;
scene.add(camera);

// Lighting
pointLight.position.set(0, 300, 200);
scene.add(pointLight);
scene.add(ambientLight);

// Rendering
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Model
model.position.z = dist;
model.position.x = -100;
model.position.y = 0;
scene.add(model);
// camera.lookAt(model.position);

// Ground
ground.rotation.x = -90 * Math.PI / 180;
ground.position.z = dist;
scene.add(ground);

// console.log(ground);
// console.log(threeHelper.isModelVisible(camera, model));
threeHelper.randomModelPositioning(ground);

// Rendering the scene
function render() {
  requestAnimationFrame(render);
  model.rotation.x -= 0.02;
  model.rotation.y -= clock.getDelta();
  model.rotation.z += 0.02;
  renderer.render(scene, camera);
}

render();
