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
   * Generates a set of new positions based on a ground plane
   * @param {obj} ground
   */
  randomModelPositioning: (ground) => {
    const max = {
      x: (ground.geometry.parameters.width / 2 + Math.abs(ground.position.x)),
      y: 300,
      z: (ground.geometry.parameters.height / 2 + Math.abs(ground.position.z)),
    };
    const min = {
      x: ground.geometry.parameters.width - Math.abs(ground.position.x),
      y: ground.position.y,
      z: ground.geometry.parameters.height - Math.abs(ground.position.z),
    };

    if (ground.position.x !== 0) {
      max.x *= (ground.position.x / Math.abs(ground.position.x));
    }

    if (ground.position.z !== 0) {
      max.z *= (ground.position.z / Math.abs(ground.position.z));
    }

    const newPos = {
      x: Math.floor(Math.random() * (max.x + max.x)) - max.x,
      y: Math.floor(Math.random() * (max.y - ground.position.y)) + ground.position.y,
      z: Math.floor(Math.random() * (max.z - min.z)) + min.z,
    };

    return newPos;
  },
};

export default threeHelper;
