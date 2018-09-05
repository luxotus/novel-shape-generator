/**
 * Helps create animations. Without any config it will create a random animation.
 */
export default class AnimationCreator {
  constructor(renderer, scene, camera, mesh, options) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.mesh = mesh;
    this.options = options;

    if (typeof options === 'undefined' || Object.keys(options).length === 0) {
      this.randomAnimation();
    }
  }

  randomAnimation() {
    this.mesh.rotation.x -= Math.round(100 * (Math.random() * (0.5 - 0.01) + 0.01)) / 100;
    this.mesh.rotation.y -= Math.round(100 * (Math.random() * (0.5 - 0.01) + 0.01)) / 100;
    this.mesh.rotation.z -= Math.round(100 * (Math.random() * (0.5 - 0.01) + 0.01)) / 100;

    console.log(this.mesh.rotation);
  }

  render() {
    // console.log(this.render);
    requestAnimationFrame(this.render);
    this.randomAnimation();
    this.renderer.render(this.scene, this.camera);
  }
}
