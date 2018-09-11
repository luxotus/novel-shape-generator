/* global THREE */

const threeHelper = {

  /**
   * Determines if model is visible in the camera view
   * @param {obj} camera
   * @param {obj} model
   */
  isModelVisible: (camera, model) => {
    const frustum = new THREE.Frustum();

    camera.updateMatrix(); // make sure camera's local matrix is updated
    camera.updateMatrixWorld(); // make sure camera's world matrix is updated
    camera.matrixWorldInverse.getInverse(camera.matrixWorld);

    model.updateMatrix(); // make sure plane's local matrix is updated
    model.updateMatrixWorld(); // make sure plane's world matrix is updated

    frustum.setFromMatrix(new THREE.Matrix4()
      .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    return frustum.intersectsObject(model);
  },
  /**
   * Generates a set of new positions, while keeping it visible
   * For now this is accurate as I can get it, will have to revisit in the future.
   * Use with isModelVisible() to get model that is visible but this will help
   * Est a boundary that limits the number of potential positions.
   * @param {obj} ground
   */
  randomModelPositioning: (ground, camera) => {
    const dist = ground.position.z;
    const vFOV = THREE.Math.degToRad(camera.fov); // convert vertical fov to radians
    const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(dist); // visible height
    const visibleWidth = visibleHeight * camera.aspect; // visible width
    const newPos = {
      x: Math.floor(Math.random() * (visibleWidth + visibleWidth)) - visibleWidth,
      y: Math.floor(Math.random() * (visibleHeight + visibleHeight)) - visibleHeight,
      z: Math.floor(Math.random() * (dist + camera.position.z)) - camera.position.z,
    };

    return newPos;
  },
};

export default threeHelper;
