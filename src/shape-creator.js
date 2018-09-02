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

  /**
   * Certain shapes only have radius for sizing
   * @param {string} type
   * @returns {boolean}
   */
  static isRadiusOnly(type) {
    const radiusOnlyShapes = [
      'Dodecahedron',
      'Icosahedron',
      'Octahedron',
      'Tetrahedron',
    ];

    return radiusOnlyShapes.includes(type);
  }

  /**
   * Geometry args count for shape sizing
   * @param {string} type
   * @returns {int}
   */
  static geometrySideLengths(type) {
    const shapeWithSize = {
      Box: 3,
      Circle: 2,
      Cone: 3,
      Cylinder: 4,
      Plane: 3,
      Ring: 3,
      Sphere: 3,
      Torus: 4,
      TorusKnot: 4,
    };

    return shapeWithSize[type];
  }

  /**
   * Check for basic supported shapes
   * @param {string} type
   * @returns {boolean}
   */
  static isGeometryOnly(type) {
    return typeof this.geometrySideLengths(type) !== 'undefined';
  }

  /**
   * Creates a shape and adds it to the list of shapes
   */
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
