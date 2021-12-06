import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    test.scene.add(mesh);
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
