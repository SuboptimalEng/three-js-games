import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import Cubelet from './Cubelet';

export default class RubiksCube {
  constructor() {
    this.scale = 16;
    this.rubiksCubeGroup = new THREE.Group();
    this.rubiksCubeGroup.scale.x = this.scale;
    this.rubiksCubeGroup.scale.y = this.scale;
    this.rubiksCubeGroup.scale.z = this.scale;

    this.initializeRubiksCube();

    const anim = (t) => {
      TWEEN.update(t);
      requestAnimationFrame(anim);
    };
    anim();
  }

  rotateAroundWorldAxis(cubeletGroup, axis) {
    console.log(cubeletGroup);
    // debugger;

    const start = { rotation: 0 };
    const prev = { rotation: 0 };
    const end = { rotation: Math.PI / 2 };

    const tween = new TWEEN.Tween(start)
      .to(end, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(({ rotation }) => {
        // NOTE: Move the position of a cubelet.
        // cubeletGroup.position.applyAxisAngle(axis, theta * direction);
        cubeletGroup.position.applyAxisAngle(axis, rotation - prev.rotation);

        // NOTE: Rotate the cubelet on it's own axis.
        // cubeletGroup.rotateOnAxis(axis, theta * direction);
        cubeletGroup.rotateOnAxis(axis, rotation - prev.rotation);

        // NOTE: Keep track of the previous
        prev.rotation = rotation;
      });

    tween.start();
  }

  onKeyDown(event) {
    if (event.key === 'w') {
      const axis = new THREE.Vector3(-1, 0, 0);
      this.cubelets.forEach((cubelet) => {
        if (cubelet.cubeletGroup.position.x < 5)
          this.rotateAroundWorldAxis(cubelet.cubeletGroup, axis);
      });
    } else if (event.key === 'a') {
      const axis = new THREE.Vector3(0, -1, 0);
      this.cubelets.forEach((cubelet) => {
        if (cubelet.cubeletGroup.position.y < 5)
          this.rotateAroundWorldAxis(cubelet.cubeletGroup, axis);
      });
    } else if (event.key === 's') {
      const axis = new THREE.Vector3(1, 0, 0);
      this.cubelets.forEach((cubelet) => {
        if (cubelet.cubeletGroup.position.x < 5)
          this.rotateAroundWorldAxis(cubelet.cubeletGroup, axis);
      });
    } else if (event.key === 'd') {
      const axis = new THREE.Vector3(0, 1, 0);
      this.cubelets.forEach((cubelet) => {
        if (cubelet.cubeletGroup.position.y < 5)
          this.rotateAroundWorldAxis(cubelet.cubeletGroup, axis);
      });
    }
  }

  // NOTE: Test function to rotate the entire Rubik's cube.
  rotateCube(event) {
    if (event.key === 'a') {
      const axis = new THREE.Vector3(0, 1, 0);
      this.cubelets.forEach((cubelet, i) => {
        this.rotateAroundWorldAxis(cubelet.cubeletGroup, axis);
      });
    }
  }

  initializeRubiksCube() {
    this.cubelets = [
      // Front face.
      new Cubelet(-1, 1, 1),
      new Cubelet(0, 1, 1),
      new Cubelet(1, 1, 1),
      new Cubelet(-1, 0, 1),
      new Cubelet(0, 0, 1),
      new Cubelet(1, 0, 1),
      new Cubelet(-1, -1, 1),
      new Cubelet(0, -1, 1),
      new Cubelet(1, -1, 1),

      // Middle face.
      new Cubelet(-1, 1, 0),
      new Cubelet(0, 1, 0),
      new Cubelet(1, 1, 0),
      new Cubelet(-1, 0, 0),
      new Cubelet(0, 0, 0),
      new Cubelet(1, 0, 0),
      new Cubelet(-1, -1, 0),
      new Cubelet(0, -1, 0),
      new Cubelet(1, -1, 0),

      // Back face.
      new Cubelet(-1, 1, -1),
      new Cubelet(0, 1, -1),
      new Cubelet(1, 1, -1),
      new Cubelet(-1, 0, -1),
      new Cubelet(0, 0, -1),
      new Cubelet(1, 0, -1),
      new Cubelet(-1, -1, -1),
      new Cubelet(0, -1, -1),
      new Cubelet(1, -1, -1),
    ];

    this.cubelets.forEach((cubelet) => {
      this.rubiksCubeGroup.add(cubelet.cubeletGroup);
    });
  }
}
