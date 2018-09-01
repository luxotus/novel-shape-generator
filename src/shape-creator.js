/* global THREE */

/**
 * Helps create basic shapes. Without any config it will create a random shape
 */
export default class ShapeCreator {
  constructor(details, shapes) {
    this.details = details;
    this.shapes = typeof shapes !== 'undefined' ? shapes : [];
    this.createShape();
  }

  createShape() {
    const shape = {
      material: new THREE.MeshBasicMaterial(this.details.material),
    };

    switch (this.details.type) {
      case 'cube':
        shape.geometry = new THREE.BoxBufferGeometry(...this.details.geometry);
        break;
      case 'circle':
        shape.geometry = new THREE.CircleBufferGeometry(...this.details.geometry);
        break;
      case 'cone':
        shape.geometry = new THREE.ConeBufferGeometry(...this.details.geometry);
        break;
      case 'cylinder':
        shape.geometry = new THREE.CylinderBufferGeometry(...this.details.geometry);
        break;
      case 'dodecahedron':
        shape.geometry = new THREE.DodecahedronBufferGeometry(this.details.radius);
        break;
      case 'plane':
        shape.geometry = new THREE.PlaneBufferGeometry(...this.details.geometry);
        break;
      default:
        shape.geometry = new THREE.BoxGeometry(...this.details.geometry);
    }

    if (typeof shape.geometry !== 'undefined') {
      shape.mesh = new THREE.Mesh(shape.geometry, shape.material);
      this.shapes.push(shape);
    }
  }
}
