/* global THREE */

/**
 * Helps create basic shapes. Without any config it will create a random shape
 */
export default class ShapeCreator {
  constructor(details, shapes) {
    this.details = details;
    this.shapes = typeof shapes !== 'undefined' ? shapes : [];
    this.typeExits = (this.constructor.isRadiusOnly(this.details.type)
      || this.isGeometryOnly(this.details.type));

    if (!this.typeExits) {
      this.details.type = this.constructor.randomShapeType();
    }

    this.createShape();
  }

  /**
   * Picks a random shape type
   * @returns {str}
   */
  static randomShapeType() {
    const knownTypes = [
      'Dodecahedron',
      'Icosahedron',
      'Octahedron',
      'Tetrahedron',
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
    return knownTypes[Math.floor((Math.random() * knownTypes.length))];
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
   * Creates an array of a given length with values in a given range
   * @param {int} max
   * @param {int} min
   * @returns {array}
   */
  fillGeometry(max, min) {
    const fillSize = this.constructor.geometrySideLengths(this.details.type);
    let geometry = this.details.geometry.length > 0 ? this.details.geometry : [];

    if (fillSize > this.details.geometry.length) {
      const geoLen = fillSize - this.details.geometry.length;
      const arr = Array(geoLen).fill(0).map(() => Math.floor(Math.random() * (max - min)) + min);
      geometry = geometry.concat(arr);
    }

    return geometry;
  }

  /**
   * Check for basic supported shapes
   * @param {string} type
   * @returns {boolean}
   */
  isGeometryOnly(type) {
    return typeof this.constructor.geometrySideLengths(type) !== 'undefined';
  }

  /**
   * Creates a shape and adds it to the list of shapes
   */
  createShape() {
    const shape = {};

    this.details.materialCreator.updateFlatShape(this.details.type);
    shape.material = new THREE.MeshLambertMaterial(this.details.materialCreator.material);

    if (this.constructor.isRadiusOnly(this.details.type)) {
      shape.geometry = new THREE[`${this.details.type}BufferGeometry`](this.details.radius);
    }

    if (this.isGeometryOnly(this.details.type)) {
      const sideLengths = this.constructor.geometrySideLengths(this.details.type);
      const geometry = (sideLengths !== this.details.geometry.length)
        ? this.fillGeometry(this.details.size.max, this.details.size.min) : this.details.geometry;
      shape.geometry = new THREE[`${this.details.type}BufferGeometry`](...geometry);
    }

    if (typeof shape.geometry !== 'undefined') {
      shape.mesh = new THREE.Mesh(shape.geometry, shape.material);
      this.shapes.push(shape);
    }
  }
}
