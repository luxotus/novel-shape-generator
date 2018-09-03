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
