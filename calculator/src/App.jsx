import { useEffect } from 'react';

import Calculator from './lib/Calculator';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const c = new Calculator(test.uniforms);
    test.scene.add(c.calculatorGroup);

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      c.pressKey(event);
    };
    const onKeyUp = (event) => {
      c.releaseKey(event);
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
