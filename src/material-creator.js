/* global THREE */

export default class MaterialCreator {
  constructor(randomize, material) {
    this.material = {};

    Object.keys(material).forEach((value) => {
      if (this.constructor.supportedMaterialProps(value)) {
        this.material[value] = material[value];
      }
    });

    if (randomize) {
      this.randomizeColor();
    }
  }

  static isFlat(type) {
    const flat = [
      'Plane',
      'Circle',
      'Ring',
    ];

    return flat.includes(type);
  }

  updateFlatShape(type) {
    if (this.constructor.isFlat(type)) {
      this.material.side = THREE.DoubleSide;
    }
  }

  static supportedMaterialProps(prop) {
    const supportedProps = [
      'color',
    ];

    return supportedProps.includes(prop);
  }

  randomizeColor() {
    this.material.color = (Math.random() * 0xFFFFFF << 0);
  }
}
