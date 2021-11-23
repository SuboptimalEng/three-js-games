import * as THREE from "three";

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

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    function onMouseDown(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, test.camera);
      const intersects = raycaster.intersectObjects(game.hiddenCubes.children);
      console.log(intersects);
      if (intersects.length > 0) {
        const index = game.hiddenCubes.children.findIndex(
          (c) => c.uuid === intersects[0].object.uuid
        );
        game.hiddenCubes.children.splice(index, 1);
        const x = intersects[0].object.position.x;
        const y = intersects[0].object.position.y;
        const z = intersects[0].object.position.z;
        game.addSphereOrAsterisk({ x, y, z });
        game.checkWinConditions();
      }
    }

    window.addEventListener("mousedown", onMouseDown, false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id={canvasId} />
    </div>
  );
}
