import * as THREE from 'three';
import Cubelet from './Cubelet';

export default class RubiksCube {
  constructor() {
    this.scale = 16;
    this.rubiksCubeGroup = new THREE.Group();
    this.rubiksCubeGroup.scale.x = this.scale;
    this.rubiksCubeGroup.scale.y = this.scale;
    this.rubiksCubeGroup.scale.z = this.scale;

    this.initCubelets();
  }

  rotateAroundWorldAxis(cubelet, axis, theta, direction) {
    // remove the offset
    // cubelet.position.sub(point);

    // rotate the POSITION
    cubelet.position.applyAxisAngle(axis, theta * direction);

    // re-add the offset
    // cubelet.position.add(point);

    // rotate the OBJECT
    cubelet.rotateOnAxis(axis, theta * direction);
  }

  rotateCube(event) {
    if (event.key === 'a') {
      const axis = new THREE.Vector3(0, 1, 0);
      // const point = new THREE.Vector3(0, 0, 0);
      this.cubelets.forEach((cubelet) => {
        this.rotateAroundWorldAxis(cubelet.cubeletGroup, axis, Math.PI / 8, 1);
      });
    }
  }
  initCubelets() {
    this.cubelets = [
      // Front row.
      new Cubelet(-1, 1, 1),
      new Cubelet(1, 1, 1),
      new Cubelet(-1, -1, 1),
      new Cubelet(1, -1, 1),

      // Back row.
      new Cubelet(-1, 1, -1),
      new Cubelet(1, 1, -1),
      new Cubelet(-1, -1, -1),
      new Cubelet(1, -1, -1),
    ];
    this.cubelets.forEach((cubelet) =>
      this.rubiksCubeGroup.add(cubelet.cubeletGroup)
    );
  }
}
