import { useEffect } from 'react';

import TiltingTower from './lib/TiltingTower';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    let currentTime;
    const tiltingTowerGame = new TiltingTower();
    test.scene.add(tiltingTowerGame.group);

    const animate = (t) => {
      currentTime = t;
      tiltingTowerGame.loop(t);
      requestAnimationFrame(animate);
    };

    const onKeyDown = (event) => {
      console.log(event.key);
      if (event.key === 'Enter') {
        tiltingTowerGame.acceptPhantomBlock(currentTime);
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
