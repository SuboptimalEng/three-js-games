import { useEffect } from "react";
import * as THREE from "three";

import SceneInit from "./lib/SceneInit";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    const bg = new THREE.BoxGeometry(8, 8, 8);
    const bm = new THREE.MeshNormalMaterial();
    const b = new THREE.Mesh(bg, bm);
    test.scene.add(b);

    const animate = () => {
      b.rotation.x += 0.001;
      b.rotation.y += 0.001;
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="absolute top-4">
        <div className="w-40 h-40 bg-white rounded">hi</div>
      </div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
