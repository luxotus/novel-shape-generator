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
    console.log(this.type);
    return new THREE[`Mesh${this.type}Material`](this.material);
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
    const knownTypes = [
      'Basic',
      // 'Depth',
      'Lambert',
      'Normal',
      'Phong',
      'Physical',
      'Standard',
    ];
    return knownTypes.includes(type);
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
    const types = [
      'Basic',
      // 'Depth',
      'Lambert',
      'Normal',
      'Phong',
      'Physical',
      'Standard',
    ];
    this.type = types[Math.floor((Math.random() * types.length))];
  }
}
