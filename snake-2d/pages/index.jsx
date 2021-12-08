import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import SnakeGame from "./lib/SnakeGame";

export default function Home() {
  let snakeGame;
  let options = {};

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    snakeGame = new SnakeGame(test.scene);

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 87) {
        snakeGame.lastPressedKey = "w";
        console.log("w");
      } else if (e.keyCode === 65) {
        snakeGame.lastPressedKey = "a";
        console.log("a");
      } else if (e.keyCode === 83) {
        snakeGame.lastPressedKey = "s";
        console.log("s");
      } else if (e.keyCode === 68) {
        snakeGame.lastPressedKey = "d";
        console.log("d");
      }
    });

    const animate = () => {
      snakeGame.loop(options);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("keydown");
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
