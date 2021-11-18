import { useEffect, useState } from "react";
import * as THREE from "three";
import Draggable from "react-draggable";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

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

  const codeArray = [
    `// 🐦 twitter.com/SuboptimalEng
// 💻 github.com/SuboptimalEng/GameDev

const bg = new THREE.BoxGeometry(8, 8, 8);
const bm = new THREE.MeshNormalMaterial();
const b = new THREE.Mesh(bg, bm);
test.scene.add(b);

const animate = () => {
  b.rotation.x += 0.001;
  b.rotation.y += 0.001;
  window.requestAnimationFrame(animate);
};
  `,
  ];
  const [code, setCode] = useState(codeArray[0]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="absolute inset-x-64 inset-y-32">
        <Draggable>
          <div className="w-full h-full text-2xl bg-white rounded-xl">
            <div className="flex flex-col place-items-center px-4">
              <div className="text-xl">hi there</div>
              <div className="w-full h-full">
                <CodeMirror
                  value={code}
                  height="100%"
                  theme="light"
                  extensions={[javascript()]}
                  onChange={(value, viewUpdate) => {
                    console.log("value:", value);
                    setCode(value);
                  }}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </Draggable>
      </div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
