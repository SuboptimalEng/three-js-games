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
    b.position.y = 24;

    c.position.x = -16;
    c.position.y = 24;

    d.position.x = 16;
    d.position.y = 24;

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

  let xOffset = 9999;
  let yOffset = 9999;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showCustomEditor, setShowCustomEditor] = useState(false);

  useEffect(() => {
    // NOTE: When the editor is first displayed on the screen, we want
    // to instantly grab the x, y offsets and store them.
    if (showCustomEditor && xOffset === 9999 && yOffset === 9999) {
      const el = document.getElementById("custom-editor");
      const rect = el.getBoundingClientRect();
      xOffset = rect.x;
      yOffset = rect.y;
    }
  }, [showCustomEditor]);

  const toggleCustomEditor = () => {
    if (showCustomEditor) {
      // NOTE: This will run the second time that the editor is open.
      const el = document.getElementById("custom-editor");
      const rect = el.getBoundingClientRect();
      setX(rect.x - xOffset);
      setY(rect.y - yOffset);
    }

    setShowCustomEditor(!showCustomEditor);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="absolute bg-white right-4 top-4 p-2 rounded-xl text-2xl">
        <button onClick={toggleCustomEditor}>
          {showCustomEditor ? <div>➡️ 💻</div> : <div>⬅️ 💻</div>}
        </button>
      </div>
      <canvas id="myThreeJsCanvas" />
      {showCustomEditor ? <CustomEditor x={x} y={y} /> : null}
    </div>
  );
}
