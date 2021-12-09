import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import SnakeGame from "./lib/SnakeGame";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    const snakeGame = new SnakeGame(test.scene);

    const animate = (t) => {
      snakeGame.loop(t);
      requestAnimationFrame(animate);
    };
    animate();

    const initDatGui = async () => {
      const dat = await import("dat.gui");
      const gui = new dat.GUI();
      const snakeGameFolder = gui.addFolder("Snake Game");
      snakeGameFolder.add(snakeGame, "loopTimeStep", 256, 1024);
    };
    initDatGui();

    const onKeyDown = (e) => {
      snakeGame.prevPressedKey = snakeGame.lastPressedKey;
      snakeGame.lastPressedKey = e.key;
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* {!isPlaying && (
        <div className="absolute inset-0 z-10 text-white backdrop-blur-sm">
          <div className="flex h-full bg-black bg-opacity-50 place-items-center justify-center">
            <button
              className="text-6xl hover:text-purple-400"
              onClick={playGame}
            >
              Play Game
            </button>
          </div>
        </div>
      )} */}
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
