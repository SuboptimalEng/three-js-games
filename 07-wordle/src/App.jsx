import { useEffect } from 'react';

import SceneInit from './lib/SceneInit';
import Wordle from './lib/Wordle';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const w = new Wordle();
    test.scene.add(w.wordleGroup);

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      w.addLetter(event);
    };

    window.addEventListener('keydown', onKeyDown);
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
