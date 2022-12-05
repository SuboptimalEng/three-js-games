import { useEffect } from 'react';

import { GUI } from 'dat.gui';
import * as THREE from 'three';

import SceneInit from './lib/SceneInit';
import RubiksCube from './lib/RubiksCube';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const r = new RubiksCube();
    test.scene.add(r.rubiksCubeGroup);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    function onMouseDown(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, test.camera);
      const objects = raycaster.intersectObjects(r.rubiksCubeGroup.children);
      const cubeObjects = objects.filter((c) => {
        return c.object.type === 'Mesh';
      });
      if (cubeObjects.length > 0) {
        r.highlightCubes(cubeObjects[0].object);
      }
    }

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      r.onKeyDown(event);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);

    // const planeGeometry = new THREE.PlaneGeometry(2, 2);
    // const planeMaterial = new THREE.MeshPhongMaterial({ color: '#ff0000' });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // planeMesh.position.z = -2;
    // group.add(planeMesh);

    const gui = new GUI();
    const folder = gui.addFolder("Rubik's Cube");
    folder.add(r, 'epsilon', 0.5, 3.5, 0.5);
    folder.add(r, 'consoleDebug');
    folder.open();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
