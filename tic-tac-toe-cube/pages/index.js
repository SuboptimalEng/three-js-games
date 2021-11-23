import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import TicTacToeCube from "./lib/TicTacToeCube";

export default function Home() {
  const canvasId = "myThreeCanvas";

  useEffect(() => {
    const test = new SceneInit(canvasId);
    test.initScene();
    test.animate();

    const game = new TicTacToeCube();
    test.scene.add(game.board);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id={canvasId} />
    </div>
  );
}
