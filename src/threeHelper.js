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
};

export default threeHelper;
