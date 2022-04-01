import { useEffect } from 'react';

import FranticArchitect from './lib/FranticArchitect';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const franticArchitect = new FranticArchitect();

    test.scene.add(franticArchitect.gg);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
