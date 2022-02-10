import { useEffect } from 'react';

import { GUI } from 'dat.gui';

import SceneInit from './lib/SceneInit';
import SnakeGame from './lib/SnakeGame';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const snakeGame = new SnakeGame();
    test.scene.add(snakeGame.sgg);

    const animate = (t) => {
      snakeGame.loop(t);
      requestAnimationFrame(animate);
    };
    animate();

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      snakeGame.pressKey(event);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };

    // NOTE: Add board gui.
    // const gui = new GUI();
    // const boardFolder = gui.addFolder('Board');
    // boardFolder
    //   .add(snakeGame, 'gameScale', 4, 6)
    //   .onChange(() => snakeGame.updateScale());
    // boardFolder
    //   .add(snakeGame, 'boardSize', 6, 12)
    //   .step(2)
    //   .onChange(() => {
    //     snakeGame.resetBoard();
    //   });
    // boardFolder.open();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
