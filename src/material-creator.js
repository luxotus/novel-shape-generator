/* global THREE */

/**
 * Helps create materials. Also provides randomized materials.
 */
export default class MaterialCreator {
  constructor(randomize, material, type) {
    this.material = material;
    this.type = type;
    this.knownTypes = [
      'Basic',
      'Lambert',
      'Normal',
      'Phong',
      'Physical',
      'Standard',
    ];

    if (randomize) {
      this.randomizeColor();
      this.randomizeType();
    } else if (!this.hasKnownType(type)) {
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

  addWireFrame() {
    this.material.wireframe = true;
    this.material.wireframeLineWidth = 5;
    this.material.wireframeLineJoin = 'round';
    this.material.wireframeLineCap = 'round';
  }

  addTransparency() {
    this.material.transparent = true;
    this.material.opacity = 0.5;
  }

  addEmissive() {
    this.material.emissive = 0xFF0000;
    this.material.emissiveIntensity = 0.2;
  }

  addTexture() {
    if (typeof this.material.texture !== 'undefined') {
      this.material.map = new THREE.TextureLoader().load(this.material.texture);
    }
  }

  addNormalMap() {
    if (typeof this.material.normal !== 'undefined') {
      this.material.normalMap = new THREE.TextureLoader().load(this.material.normal);
    }
  }

  addShine() { // Phong
    this.material.specular = 0x999999;
    this.material.shininess = 100;
  }

  addMetalness() { // Standard
    this.material.roughness = 0.5;
    this.material.metalness = 0.5;
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
