import { useEffect } from 'react';

import Keyboard from './lib/Keyboard';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const k = new Keyboard();
    test.scene.add(k.keyboardGroup);

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      k.pressKey(event);
    };
    const onKeyUp = (event) => {
      k.releaseKey(event);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
