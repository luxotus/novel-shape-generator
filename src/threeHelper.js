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
   * @param {obj} ground
   */
  randomModelPositioning: (ground) => {
    const max = {
      x: ground.geometry.parameters.width / 2 + ground.position.x,
      y: 1000,
      z: ground.geometry.parameters.height / 2 + ground.position.z,
    }; console.log(max);
    const newPos = {
      x: Math.floor(Math.random() * (max.x + max.x)) - max.x,
      y: Math.floor(Math.random() * (max.y - ground.position.y)) + ground.position.y,
      z: Math.floor(Math.random() * (max.z + max.z)) - max.z,
    }; console.log(newPos);

    return newPos;
  },
};

export default threeHelper;
