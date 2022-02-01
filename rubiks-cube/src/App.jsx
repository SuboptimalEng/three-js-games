import { useEffect } from 'react';

// import { GUI } from 'dat.gui';
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

    // const lineEdges = new THREE.EdgesGeometry(mesh.geometry);
    // const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000' });
    // const lineMesh = new THREE.LineSegments(lineEdges, lineMaterial);
    // group.add(lineMesh);

    // const planeGeometry = new THREE.PlaneGeometry(2, 2);
    // const planeMaterial = new THREE.MeshPhongMaterial({ color: '#ff0000' });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // planeMesh.position.z = -2;
    // group.add(planeMesh);

    // const gui = new GUI();
    // const folder = gui.addFolder("Rubik's Cube");
    // folder.add(mesh.material, 'opacity', 0.0, 1.0);
    // folder.addColor(planeMaterial, 'color');
    // folder.open();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
