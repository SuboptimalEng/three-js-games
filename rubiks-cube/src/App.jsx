import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';
import { vertexShader, fragmentShader } from './lib/Shaders';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const scale = 32;
    const group = new THREE.Group();
    test.scene.add(group);
    group.scale.x = scale;
    group.scale.y = scale;
    group.scale.z = scale;
    group.rotateX(Math.PI / 8);
    group.rotateY(-Math.PI / 4);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const lineEdges = new THREE.EdgesGeometry(mesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000' });
    const lineMesh = new THREE.LineSegments(lineEdges, lineMaterial);
    group.add(lineMesh);
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
