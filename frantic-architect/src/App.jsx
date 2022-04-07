import { useEffect } from 'react';

import CannonDebugger from 'cannon-es-debugger';

import SceneInit from './lib/SceneInit';
import FranticArchitect from './lib/FranticArchitect';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();

    const franticArchitect = new FranticArchitect();
    const cannonDebugger = new CannonDebugger(
      test.scene,
      franticArchitect.world
    );

    const animate = () => {
      const dt = test.clock.getDelta();

      test.render();
      test.stats.update();
      test.controls.update();
      cannonDebugger.update();
      franticArchitect.update(dt);
      requestAnimationFrame(animate);
    };
    animate();

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshNormalMaterial({ wireframe: true });
    // const mesh = new THREE.Mesh(geometry, material);
    // let phantomBlock = mesh;
    // const displayPhantomBlock = (x, y, z) => {
    //   test.scene.remove(phantomBlock);
    //   const geometry = new THREE.BoxGeometry(1, 1, 1);
    //   const material = new THREE.MeshNormalMaterial();
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.x = x;
    //   mesh.position.y = y - 1.25;
    //   mesh.position.z = z;
    //   phantomBlock = mesh;
    //   test.scene.add(phantomBlock);
    // };

    const onKeyDown = (event) => {
      if (event.code === 'Space') {
        franticArchitect.acceptPhantomBlock();
      }
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
