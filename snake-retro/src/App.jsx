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

    // NOTE: Add board gui.
    const gui = new GUI();
    const boardFolder = gui.addFolder('Board');
    boardFolder
      .add(snakeGame, 'boardScale', 4, 6)
      .onChange(() => snakeGame.resetBoardScale());
    boardFolder
      .add(snakeGame, 'boardSize', 8, 10)
      .step(1)
      .onChange(() => {
        snakeGame.resetBoard();
      });
    boardFolder.open();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
