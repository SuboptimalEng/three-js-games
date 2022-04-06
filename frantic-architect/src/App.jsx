import { useEffect } from 'react';

import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // instantiate gravity
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -10, 0),
    });

    // add ground
    const groundMaterial = new CANNON.Material('ground');
    groundMaterial.friction = 0.5;
    const groundShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.25, 1.5));
    const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(0, 0, 0);
    groundBody.position.set(0, -2, 0);
    world.addBody(groundBody);

    const size = 1;
    const mass = 10;
    const slipperyMaterial = new CANNON.Material('slippery');
    slipperyMaterial.friction = 0.01;
    const compoundBody = new CANNON.Body({ mass, material: slipperyMaterial });
    compoundBody.position.set(0, 0, 0);
    compoundBody.quaternion.setFromEuler(0, 0, 0);

    const shape = new CANNON.Box(
      new CANNON.Vec3(size * 0.5, size * 0.5, size * 0.5)
    );

    compoundBody.addShape(shape, new CANNON.Vec3(0, 0, 0));
    compoundBody.addShape(shape, new CANNON.Vec3(-size, 0, 0));
    compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -size));
    compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -2 * size));
    compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -3 * size));
    compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -4 * size));

    world.addBody(compoundBody);

    const updateCOM = function (body) {
      // first calculate the center of mass
      const com = new CANNON.Vec3();
      // console.log(com);
      // debugger;
      body.shapeOffsets.forEach(function (offset) {
        com.vadd(offset, com);
      });
      // console.log(com);
      com.scale(1 / body.shapes.length, com);
      // console.log(com);

      // move the shapes so the body origin is at the COM
      body.shapeOffsets.forEach(function (offset) {
        console.log(offset);
        offset.vsub(com, offset);
      });

      // now move the body so the shapes' net displacement is 0
      const worldCOM = new CANNON.Vec3();
      body.vectorToWorldFrame(com, worldCOM);
      body.position.vadd(worldCOM, body.position);
    };

    // updateCOM(compoundBody);

    const cannonDebugger = new CannonDebugger(test.scene, world);

    // let delta = test.clock.getDelta();
    const animate = () => {
      // delta = test.clock.getDelta();
      world.fixedStep();
      cannonDebugger.update();
      requestAnimationFrame(animate);
    };

    animate();

    let x = 0;
    let y = 1;
    let z = 1;

    const randomizePhantomBlock = () => {
      const axis = Math.floor(Math.random() * 3);
      const direction = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
      displayPhantomBlock(x, y, z);
      if (axis === 0) {
        x = x + direction;
      } else if (axis === 1) {
        y = y + direction;
      } else {
        z = z + direction;
      }
    };

    const onKeyDown = (event) => {
      if (event.code === 'Space') {
        let xOffset = compoundBody.shapeOffsets[0].x;
        let yOffset = compoundBody.shapeOffsets[0].y;
        let zOffset = compoundBody.shapeOffsets[0].z;
        compoundBody.addShape(
          shape,
          new CANNON.Vec3(
            x * size + xOffset,
            y * size + yOffset,
            z * size + zOffset
          )
        );
        updateCOM(compoundBody);
        randomizePhantomBlock(x, y, z);
      }
    };

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    let phantomBlock = mesh;
    const displayPhantomBlock = (x, y, z) => {
      test.scene.remove(phantomBlock);
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = x;
      mesh.position.y = y - 1.25;
      mesh.position.z = z;
      phantomBlock = mesh;
      test.scene.add(phantomBlock);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
