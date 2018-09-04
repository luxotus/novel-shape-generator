/* global THREE */

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

  get meshMaterial() {
    return new THREE[`Mesh${this.type}Material`](this.material);
  }

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

  static isFlat(type) {
    const flat = [
      'Plane',
      'Circle',
      'Ring',
    ];

    return flat.includes(type);
  }

  static supportedMaterialProps(prop) {
    const supportedProps = [
      'color',
    ];

    return supportedProps.includes(prop);
  }

  static hasKnownType(type) {
    return this.constructor.materialTypes().includes(type);
  }

  updateFlatShape(type) {
    if (this.constructor.isFlat(type)) {
      this.material.side = THREE.DoubleSide;
    }
  }

  randomizeColor() {
    this.material.color = (Math.random() * 0xFFFFFF << 0);
  }

  randomizeType() {
    const knownTypes = this.constructor.materialTypes();
    this.type = knownTypes[Math.floor((Math.random() * knownTypes.length))];
  }
}
