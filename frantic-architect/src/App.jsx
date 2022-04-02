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

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -10, 0),
    });

    // add ground
    const groundMaterial = new CANNON.Material('ground');
    groundMaterial.friction = 0.5;
    const groundShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.25, 1.5));
    const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.addShape(groundShape);
    groundBody.addShape(groundShape);
    // const groundBody = new CANNON.Body({
    //   type: CANNON.Body.STATIC,
    //   shape: groundShape,
    // });
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
    // compoundBody.addShape(shape, new CANNON.Vec3(-2 * size, size, 0));
    // compoundBody.addShape(shape, new CANNON.Vec3(-3 * size, size, 0));
    // compoundBody.addShape(shape, new CANNON.Vec3(-3 * size, 2 * size, 0));
    // compoundBody.addShape(shape, new CANNON.Vec3(-2 * size, 2 * size, 0));
    // compoundBody.addShape(shape, new CANNON.Vec3(-1 * size, 2 * size, 0));
    // compoundBody.addShape(shape, new CANNON.Vec3(0 * size, 2 * size, 0));
    // compoundBody.addShape(shape, new CANNON.Vec3(0 * size, 2 * size, size));
    // compoundBody.addShape(shape, new CANNON.Vec3(0 * size, 2 * size, 2 * size));
    // compoundBody.addShape(shape, new CANNON.Vec3(0 * size, 2 * size, 3 * size));
    // compoundBody.addShape(shape, new CANNON.Vec3(size, 0, 0));

    world.addBody(compoundBody);

    var updateCOM = function (body) {
      // first calculate the center of mass
      var com = new CANNON.Vec3();
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
      var worldCOM = new CANNON.Vec3();
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
    const onKeyDown = (event) => {
      if (event.code === 'Space') {
        // displayPhantomBlock(x, y, z);
        // world.removeBody(compoundBody);
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
        // compoundBody.addShape(shape, new CANNON.Vec3(0 * size, 2 * size, 0));
        updateCOM(compoundBody);
        // world.addBody(compoundBody);
        // y++;
        z++;
      }
    };

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshNormalMaterial({ wireframe: true });
    // const mesh = new THREE.Mesh(geometry, material);
    // let phantomBlock = mesh;
    // const displayPhantomBlock = (x, y, z) => {
    //   test.scene.remove(phantomBlock);
    //   const geometry = new THREE.BoxGeometry(1, 1, 1);
    //   const material = new THREE.MeshNormalMaterial({ wireframe: true });
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.x = x;
    //   mesh.position.y = y;
    //   mesh.position.z = z;
    //   phantomBlock = mesh;
    //   test.scene.add(phantomBlock);
    // };

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
