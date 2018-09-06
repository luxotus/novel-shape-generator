/* global THREE */

/**
 * Helps create materials. Also provides randomized materials.
 */
export default class MaterialCreator {
  constructor(randomize, material, type) {
    this.material = {};
    this.type = type;
    this.knownTypes = [
      'Basic',
      'Lambert',
      'Normal',
      'Phong',
      'Physical',
      'Standard',
    ];

    Object.keys(material).forEach((value) => {
      if (this.constructor.supportedMaterialProps(value)) {
        this.material[value] = material[value];
      }
    });

    console.log(this.material);

    if (randomize) {
      console.log('a');
      this.randomizeColor();
      this.randomizeType();
    } else if (!this.hasKnownType(type)) {
      console.log('b');
      this.randomizeType();
    }
  }

  /**
   * Get finished material for rendering
   */
  get meshMaterial() {
    console.log(this.type);
    return new THREE[`Mesh${this.type}Material`](this.material);
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
      'transparent ',
      'opacity',
      'uniforms',
    ];

    return supportedProps.includes(prop);
  }

  /**
   * Check to see if material type is supported
   * @param {string} type
   * @returns {boolean}
   */
  hasKnownType(type) {
    return this.knownTypes.includes(type);
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
    this.type = this.knownTypes[Math.floor((Math.random() * this.knownTypes.length))];
  }
}
