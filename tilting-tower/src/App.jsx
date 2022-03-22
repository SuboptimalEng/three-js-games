import { useEffect } from 'react';

import Highrise from './lib/Highrise';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const highriseGame = new Highrise();
    test.scene.add(highriseGame.group);

    const animate = (t) => {
      highriseGame.loop(t);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
