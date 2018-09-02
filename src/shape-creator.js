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

  static isRadiusOnly(type) {
    const radiusOnlyShapes = [
      'Dodecahedron',
    ];

    return radiusOnlyShapes.includes(type);
  }

  createShape() {
    const shape = {
      material: new THREE.MeshLambertMaterial(this.details.material),
    };

    if (typeof THREE[`${this.details.type}BufferGeometry`] === 'function') {
      if (this.constructor.isRadiusOnly(this.details.type)) {
        shape.geometry = new THREE[`${this.details.type}BufferGeometry`](this.details.radius);
      } else {
        shape.geometry = new THREE[`${this.details.type}BufferGeometry`](...this.details.geometry);
      }
    }

    if (typeof shape.geometry !== 'undefined') {
      shape.mesh = new THREE.Mesh(shape.geometry, shape.material);
      this.shapes.push(shape);
    }
  }
}
