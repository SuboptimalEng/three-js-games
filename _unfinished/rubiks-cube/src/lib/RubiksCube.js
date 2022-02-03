import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import Cube from './Cube';

export default class RubiksCube {
  constructor() {
    this.scale = 16;
    this.rubiksCubeGroup = new THREE.Group();
    this.rubiksCubeGroup.scale.x = this.scale;
    this.rubiksCubeGroup.scale.y = this.scale;
    this.rubiksCubeGroup.scale.z = this.scale;

    this.rubiksCubeGroup.rotation.x = Math.PI / 8;
    this.rubiksCubeGroup.rotation.y = Math.PI / 4;

    this.initializeRubiksCube();

    const anim = (t) => {
      TWEEN.update(t);
      requestAnimationFrame(anim);
    };
    anim();
  }

  rotateAroundWorldAxis(cubeGroup, axis) {
    const start = { rotation: 0 };
    const prev = { rotation: 0 };
    const end = { rotation: Math.PI / 2 };

    const tween = new TWEEN.Tween(start)
      .to(end, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(({ rotation }) => {
        // NOTE: Move the position of a cube.
        // cubeGroup.position.applyAxisAngle(axis, theta * direction);
        cubeGroup.position.applyAxisAngle(axis, rotation - prev.rotation);

        // NOTE: INCORRECT - Rotate the cube on it's own axis.
        // cubeGroup.rotateOnAxis(axis, theta * direction);

        // NOTE: CORRECT - Rotate the cube on the world axis.
        cubeGroup.rotateOnWorldAxis(axis, rotation - prev.rotation);

        // NOTE: Keep track of the previous rotation for tweening.
        prev.rotation = rotation;
      });

    tween.start();
  }

  onKeyDown(event) {
    if (event.key === 'w') {
      const axis = new THREE.Vector3(-1, 0, 0);
      this.cubes.forEach((cube) => {
        if (cube.cubeGroup.position.x < 0.5)
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 'a') {
      const axis = new THREE.Vector3(0, -1, 0);
      this.cubes.forEach((cube) => {
        if (cube.cubeGroup.position.y < 0.5)
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 's') {
      const axis = new THREE.Vector3(1, 0, 0);
      this.cubes.forEach((cube) => {
        if (cube.cubeGroup.position.x < 0.5)
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    } else if (event.key === 'd') {
      const axis = new THREE.Vector3(0, 1, 0);
      this.cubes.forEach((cube) => {
        if (cube.cubeGroup.position.y < 0.5)
          this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    }
  }

  // NOTE: Test function to rotate the entire Rubik's cube.
  rotateCube(event) {
    if (event.key === 'a') {
      const axis = new THREE.Vector3(0, 1, 0);
      this.cubes.forEach((cube, i) => {
        this.rotateAroundWorldAxis(cube.cubeGroup, axis);
      });
    }
  }

  highlightCubes(cubeToHighlight) {
    const c = this.cubes.find((c) => c.cubeMesh.uuid === cubeToHighlight.uuid);
    // console.log(this.cubes[0]);
    console.log(c);
    c.uniforms.opacity.value = 0.5;

    // console.log(cubeToHighlight.material);
    // console.log(cubeToHighlight);
    // cubeToHighlight.uniforms.opacity.value = 0.5;
    // cubeToHighlight.material.transparent = true;
    // cubeToHighlight.material.opacity = 0.5;
    // const v = this.cubes.find((c) => {
    //   console.log(c);
    //   // console.log(c.cubeMesh.uuid === intersectingCube.uuid);
    //   // c.cubeGroup.uuid === intersectingCube.uuid;
    // });
    // v.highlight();
  }

  initializeRubiksCube() {
    this.cubes = [
      // Front 2x2.
      // new Cube(-1, 1, 1),
      // new Cube(1, 1, 1),
      // new Cube(-1, -1, 1),
      // new Cube(1, -1, 1),

      // Back 2x2.
      // new Cube(-1, 1, -1),
      // new Cube(1, 1, -1),
      // new Cube(-1, -1, -1),
      // new Cube(1, -1, -1),

      // Front face.
      new Cube(-1, 1, 1),
      new Cube(0, 1, 1),
      new Cube(1, 1, 1),
      new Cube(-1, 0, 1),
      new Cube(0, 0, 1),
      new Cube(1, 0, 1),
      new Cube(-1, -1, 1),
      new Cube(0, -1, 1),
      new Cube(1, -1, 1),

      // Middle face.
      new Cube(-1, 1, 0),
      new Cube(0, 1, 0),
      new Cube(1, 1, 0),
      new Cube(-1, 0, 0),
      new Cube(0, 0, 0),
      new Cube(1, 0, 0),
      new Cube(-1, -1, 0),
      new Cube(0, -1, 0),
      new Cube(1, -1, 0),

      // Back face.
      new Cube(-1, 1, -1),
      new Cube(0, 1, -1),
      new Cube(1, 1, -1),
      new Cube(-1, 0, -1),
      new Cube(0, 0, -1),
      new Cube(1, 0, -1),
      new Cube(-1, -1, -1),
      new Cube(0, -1, -1),
      new Cube(1, -1, -1),
    ];

    this.cubes.forEach((cube) => {
      this.rubiksCubeGroup.add(cube.cubeGroup);
    });
  }
}
