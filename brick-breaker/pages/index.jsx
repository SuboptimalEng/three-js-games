import { useEffect, useState } from "react";
import * as THREE from "three";

import SceneInit from "./lib/SceneInit";
import CustomEditor from "./components/CustomEditor";

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

  const [showCustomEditor, setShowCustomEditor] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="absolute bg-white right-4 top-4 p-2 rounded text-2xl">
        <button onClick={() => setShowCustomEditor(!showCustomEditor)}>
          {showCustomEditor ? <div>➡️ 💻</div> : <div>⬅️ 💻</div>}
        </button>
      </div>
      <canvas id="myThreeJsCanvas" />
      {showCustomEditor ? <CustomEditor /> : null}
    </div>
  );
}
