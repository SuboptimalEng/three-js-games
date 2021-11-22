import React, { useEffect, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import SceneInit from "./lib/SceneInit";
import CustomEditor from "./components/CustomEditor";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    function addExperimentalCube() {
      function vertexShader() {
        return `
          varying vec3 vUv;
          void main() {
            vUv = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position * sin(2.0), 1.0);
          }
        `;
      }

      function fragmentShader() {
        return `
            uniform vec3 colorA;
            uniform vec3 colorB;
            varying vec3 vUv;

            void main() {
              gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
            }
        `;
      }

      let uniforms = {
        colorB: { type: "vec3", value: new THREE.Color(0xfff000) },
        colorA: { type: "vec3", value: new THREE.Color(0x000fff) },
      };

      const geometry = new THREE.BoxGeometry(8, 8, 8);
      // const material = new THREE.MeshNormalMaterial();
      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
        wireframe: true,
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 8;
      mesh.rotation.y = Math.PI / 8;
      test.scene.add(mesh);

      const tween1 = new TWEEN.Tween({ x: 2, y: 2, z: 2 })
        .to({ x: 4, y: 4, z: 4 }, 2000)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(({ x, y, z }) => {
          test.scene.children.forEach((obj) => {
            obj.scale.x = x;
            obj.scale.y = y;
            obj.scale.z = z;
          });
        });
      const tween2 = new TWEEN.Tween({ x: 4, y: 4, z: 4 })
        .to({ x: 2, y: 2, z: 2 }, 2000)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(({ x, y, z }) => {
          test.scene.children.forEach((obj) => {
            obj.scale.x = x;
            obj.scale.y = y;
            obj.scale.z = z;
          });
        });

      tween1.chain(tween2);
      tween2.chain(tween1);

      tween1.start();
    }

    addExperimentalCube();

    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [initialX, setInitialX] = useState(9999);
  const [initialY, setInitialY] = useState(9999);
  const [showCustomEditor, setShowCustomEditor] = useState(false);

  useEffect(() => {
    // NOTE: When the editor is first displayed on the screen, we want
    // to instantly grab the x, y offsets and store them.
    if (showCustomEditor && initialX === 9999 && initialY === 9999) {
      const el = document.getElementById("custom-editor");
      const rect = el.getBoundingClientRect();
      setInitialX(rect.x);
      setInitialY(rect.y);
    }
  }, [showCustomEditor]);

  const toggleCustomEditor = () => {
    if (showCustomEditor) {
      // NOTE: This will run the second time that the editor is open.
      const el = document.getElementById("custom-editor");
      const rect = el.getBoundingClientRect();
      setX(rect.x - initialX);
      setY(rect.y - initialY);
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
