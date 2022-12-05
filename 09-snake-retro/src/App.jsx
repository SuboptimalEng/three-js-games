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
    // test.scene.add(snakeGame.sgg);
    test.rtScene.add(snakeGame.sgg);

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

    // NOTE: Add board gui.
    const gui = new GUI();
    const gameDifficulty = gui.addFolder('Difficulty');
    gameDifficulty.add(snakeGame, 'loopTimeStep', 150, 500);
    gameDifficulty.add(snakeGame, 'tweenTimeStep', 150, 500);
    gameDifficulty.open();
    const boardFolder = gui.addFolder('Board');
    boardFolder
      .add(snakeGame, 'gameScale', 4, 6)
      .onChange(() => snakeGame.updateScale());
    boardFolder
      .add(snakeGame, 'boardSize', 6, 12)
      .step(2)
      .onChange(() => {
        snakeGame.resetBoard();
      });
    boardFolder.open();

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
