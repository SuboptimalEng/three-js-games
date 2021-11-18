import React, { useEffect, useState } from "react";
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
    const c = new THREE.Mesh(bg, bm);
    const d = new THREE.Mesh(bg, bm);
    b.position.x = 0;
    b.position.y = 32;

    c.position.x = -16;
    c.position.y = 32;

    d.position.x = 16;
    d.position.y = 32;

    test.scene.add(b);
    test.scene.add(c);
    test.scene.add(d);

    const animate = () => {
      b.rotation.x += 0.002;
      b.rotation.y += 0.002;
      c.rotation.x += 0.002;
      c.rotation.y += 0.002;
      d.rotation.x += 0.002;
      d.rotation.y += 0.002;
      window.requestAnimationFrame(animate);
    };

    animate();

    // const onMouseMove = (e) => {
    //   console.log(e.clientX, e.clientY);
    // };
    // window.addEventListener("mousemove", onMouseMove);
  }, []);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [initialX, setinitialX] = useState(-1);
  const [initialY, setinitialY] = useState(-1);
  const [showCustomEditor, setShowCustomEditor] = useState(false);

  // useEffect(() => {
  //   if (showCustomEditor) {
  //     // NOTE: If the editor is currently displayed and the user closes
  //     // it, then store the x,y coordinates of the editor to re-open in
  //     // the same part of the screen where the user previously dragged it.
  //     const el = document.getElementById("custom-editor");
  //     const rect = el.getBoundingClientRect();
  //     if (initialX === -1 && initialY === -1) {
  //       setinitialX(rect.x);
  //       setinitialY(rect.y);
  //       setX(rect.x - rect.x);
  //       setY(rect.y - rect.y);
  //     }
  //   } else {
  //     const el = document.getElementById("custom-editor");
  //     if (el) {
  //       const rect = el.getBoundingClientRect();
  //       setX(rect.x - initialX);
  //       setY(rect.y - initialY);
  //     }
  //   }
  // }, [showCustomEditor]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="absolute bg-white right-4 top-4 p-2 rounded-xl text-2xl">
        <button onClick={() => setShowCustomEditor(!showCustomEditor)}>
          {showCustomEditor ? <div>➡️ 💻</div> : <div>⬅️ 💻</div>}
        </button>
      </div>
      <canvas id="myThreeJsCanvas" />
      {showCustomEditor ? <CustomEditor x={x} y={y} /> : null}
    </div>
  );
}
