import * as THREE from "three";

import { useEffect } from "react";

import SceneInit from "./lib/SceneInit";
import TicTacToeCube from "./lib/TicTacToeCube";
import { WireframeGeometry } from "three";

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

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, test.camera);
      const intersects = raycaster.intersectObjects(game.hiddenCubes.children);

      // NOTE: Hide all previous cubes.
      const hideCube = (hiddenCube) => {
        hiddenCube.material.wireframe = true;
      };
      game.hiddenCubes.children.forEach((hiddenCube) => hideCube(hiddenCube));

      if (intersects.length > 0) {
        const index = game.hiddenCubes.children.findIndex(
          (c) => c.uuid === intersects[0].object.uuid
        );
        game.hiddenCubes.children[index].material.wireframe = false;
      }
    };

    const onMouseDown = (event) => {
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
    };

    const scaleUp = (obj) => {
      if (obj.scale.x < 1) {
        obj.scale.x += 0.04;
      }
      if (obj.scale.y < 1) {
        obj.scale.y += 0.04;
      }
      if (obj.scale.z < 1) {
        obj.scale.z += 0.04;
      }
    };

    const animate = () => {
      game.spheres.children.forEach((sphere) => scaleUp(sphere));
      game.asterisks.children.forEach((asterisk) => scaleUp(asterisk));
      game.winStrikes.children.forEach((strike) => scaleUp(strike));
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mousemove", onMouseMove, false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id={canvasId} />
    </div>
  );
}
