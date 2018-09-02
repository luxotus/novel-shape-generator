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
      'Icosahedron',
      'Octahedron',
      'Tetrahedron',
    ];

    return radiusOnlyShapes.includes(type);
  }

  static isGeometryOnly(type) {
    const geometryOnlyShapes = [
      'Box',
      'Circle',
      'Cone',
      'Cylinder',
      'Plane',
      'Ring',
      'Sphere',
      'Torus',
      'TorusKnot',
    ];

    return geometryOnlyShapes.includes(type);
  }

  createShape() {
    const shape = {
      material: new THREE.MeshLambertMaterial(this.details.material),
    };

    if (this.constructor.isRadiusOnly(this.details.type)) {
      shape.geometry = new THREE[`${this.details.type}BufferGeometry`](this.details.radius);
    }

    if (this.constructor.isGeometryOnly(this.details.type)) {
      shape.geometry = new THREE[`${this.details.type}BufferGeometry`](...this.details.geometry);
    }

    if (typeof shape.geometry !== 'undefined') {
      shape.mesh = new THREE.Mesh(shape.geometry, shape.material);
      this.shapes.push(shape);
    }
  }
}
