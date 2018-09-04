/* global THREE */

/**
 * Helps create materials. Also provides randomized materials
 */
export default class MaterialCreator {
  constructor(randomize, material, type) {
    this.material = {};

    Object.keys(material).forEach((value) => {
      if (this.constructor.supportedMaterialProps(value)) {
        this.material[value] = material[value];
      }
    });

    if (randomize) {
      this.randomizeColor();
      this.randomizeType();
    } else if (!this.constructor.hasKnownType(type)) {
      this.randomizeType();
    }
  }

  /**
   * Get finished material for rendering
   */
  get meshMaterial() {
    return new THREE[`Mesh${this.type}Material`](this.material);
  }

  /**
   * Keeps known types in 1 location
   * @returns {[...string]}
   */
  static materialTypes() {
    const knownTypes = [
      'Basic',
      // 'Depth',
      'Lambert',
      'Normal',
      'Phong',
      'Physical',
      'Standard',
    ];

    return knownTypes;
  }

  /**
   * Detects mesh types that are 2D
   * @param {string} type
   * @returns {boolean}
   */
  static isFlat(type) {
    const flat = [
      'Plane',
      'Circle',
      'Ring',
    ];

    return flat.includes(type);
  }

  /**
   * Check to see if material prop is an acceptable parameter
   * @param {string} prop
   * @returns {boolean}
   */
  static supportedMaterialProps(prop) {
    const supportedProps = [
      'color',
    ];

    return supportedProps.includes(prop);
  }

  /**
   * Check to see if material type is supported
   * @param {string} type
   * @returns {boolean}
   */
  static hasKnownType(type) {
    return this.constructor.materialTypes().includes(type);
  }

  /**
   * Adds prop to material for 2D shapes
   * @param {string} type
   */
  updateFlatShape(type) {
    if (this.constructor.isFlat(type)) {
      this.material.side = THREE.DoubleSide;
    }
  }

  /**
   * Provides a random hex color
   */
  randomizeColor() {
    this.material.color = (Math.random() * 0xFFFFFF << 0);
  }

  /**
   * Provides a random material type
   */
  randomizeType() {
    const knownTypes = this.constructor.materialTypes();
    this.type = knownTypes[Math.floor((Math.random() * knownTypes.length))];
  }
}
