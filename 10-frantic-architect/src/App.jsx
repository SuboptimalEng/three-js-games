import { useEffect } from 'react';

import { GUI } from 'dat.gui';
import * as THREE from 'three';
import CannonDebugger from 'cannon-es-debugger';

import SceneInit from './lib/SceneInit';
import FranticArchitect from './lib/FranticArchitect';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();

    const franticArchitect = new FranticArchitect();
    test.scene.add(franticArchitect.gg);
    const cannonDebugger = new CannonDebugger(
      test.scene,
      franticArchitect.world
    );

    const gui = new GUI();
    gui
      .add(test, 'cameraRotationDepth', 5, 100)
      .name('Camera Distance')
      .onChange((value) => {
        // TODO: Change camera position every 10 units.
        // const newY = Math.round((value / 10) % 5) + 5;
        // if (test.camera.position.y !== newY) {
        //   test.camera.lookAt(new THREE.Vector3(0, newY, 0));
        //   test.camera.position.y = newY;
        // }
      });

    const animate = () => {
      const dt = test.clock.getDelta();

      test.render();
      test.stats.update();
      cannonDebugger.update();
      franticArchitect.update(dt);
      franticArchitect.animatePhantomGroup();
      franticArchitect.animateCompoundShapeGroup();

      // NOTE: Don't allow user to control camera.
      // test.controls.update();
      test.udpateCameraPosition();

      requestAnimationFrame(animate);
    };
    animate();

    const onClick = (event) => {
      franticArchitect.acceptPhantomBlock();
    };

    const onKeyDown = (event) => {
      if (event.code === 'Space') {
        franticArchitect.acceptPhantomBlock();
      }
    };

    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('click', onClick);
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
