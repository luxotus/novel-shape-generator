/* global THREE */

/**
 * Helps create basic shapes. Without any config it will create a random shape
 */
export default class ShapeCreator {
  constructor(type, geometry, material, shapes) {
    this.type = type;
    this.geometry = geometry;
    this.material = material;
    this.shapes = typeof shapes !== 'undefined' ? shapes : [];
    this.createShape();
  }

  get currentShape() {
    return this.shape.mesh;
  }

  createShape() {
    const shape = {
      material: new THREE.MeshBasicMaterial(this.material),
    };

    switch (this.type) {
      case 'cube':
        shape.geometry = new THREE.BoxBufferGeometry(...this.geometry);
        break;
      case 'circle':
        shape.geometry = new THREE.CircleBufferGeometry(...this.geometry);
        break;
      case 'cone':
        shape.geometry = new THREE.ConeBufferGeometry(...this.geometry);
        break;
      case 'cylinder':
        shape.geometry = new THREE.CylinderBufferGeometry(...this.geometry);
        break;
      case 'plane':
        shape.geometry = new THREE.PlaneBufferGeometry(...this.geometry);
        break;
      default:
        shape.geometry = new THREE.BoxGeometry(...this.geometry);
    }

    if (typeof shape.geometry !== 'undefined') {
      shape.mesh = new THREE.Mesh(shape.geometry, shape.material);
      this.shapes.push(shape);
    }
  }
}
