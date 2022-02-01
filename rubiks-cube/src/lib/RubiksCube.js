import * as THREE from 'three';
import Cubelet from './Cubelet';

export default class RubiksCube {
  constructor() {
    this.scale = 8;
    this.rubiksCubeGroup = new THREE.Group();
    this.rubiksCubeGroup.scale.x = this.scale;
    this.rubiksCubeGroup.scale.y = this.scale;
    this.rubiksCubeGroup.scale.z = this.scale;

    this.initCubelets();
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
