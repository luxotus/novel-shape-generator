/* global THREE */

const threeHelper = {
  isObjectVisible: (camera, model) => {
    camera.updateMatrix(); // make sure camera's local matrix is updated
    camera.updateMatrixWorld(); // make sure camera's world matrix is updated
    camera.matrixWorldInverse.getInverse(camera.matrixWorld);

    model.updateMatrix(); // make sure plane's local matrix is updated
    model.updateMatrixWorld(); // make sure plane's world matrix is updated

    const frustum = new THREE.Frustum();
    frustum.setFromMatrix(new THREE.Matrix4()
      .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    return frustum.intersectsObject(model);
  },
};

export default threeHelper;
