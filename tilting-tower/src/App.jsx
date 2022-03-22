import { useEffect } from 'react';

import Highrise from './lib/Highrise';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    let currentTime;
    const highriseGame = new Highrise();
    test.scene.add(highriseGame.group);

    const animate = (t) => {
      currentTime = t;
      highriseGame.loop(t);
      requestAnimationFrame(animate);
    };

    const onKeyDown = (event) => {
      console.log(event.key);
      if (event.key === 'Enter') {
        highriseGame.acceptPhantomBlock(currentTime);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    animate();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
