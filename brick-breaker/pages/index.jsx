import React, { useEffect, useState } from "react";
import * as THREE from "three";

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
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
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
        colorB: { type: "vec3", value: new THREE.Color(0xacb6e5) },
        colorA: { type: "vec3", value: new THREE.Color(0x74ebd5) },
      };

      const geometry = new THREE.BoxGeometry(8, 8, 8);
      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 8;
      mesh.rotation.y = Math.PI / 8;
      mesh.scale.x = 0.1;
      mesh.scale.y = 0.1;
      mesh.scale.z = 0.1;
      test.scene.add(mesh);
    }
    addExperimentalCube();

    const easeInOutCubic = (x) => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    const easeInOutSine = (x) => {
      return -(Math.cos(Math.PI * x) - 1) / 2;
    };

    const easeInOutQuint = (x) => {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    };

    const scaleUp = (obj) => {
      if (obj.scale.x < 1) {
        obj.scale.x += easeInOutSine(obj.scale.x);
      }
      if (obj.scale.y < 1) {
        obj.scale.y += easeInOutSine(obj.scale.y);
      }
      if (obj.scale.z < 1) {
        obj.scale.z += easeInOutSine(obj.scale.z);
      }
    };

    const animate = (t) => {
      // console.log(clock.getElapsedTime());
      test.scene.children.forEach(scaleUp);
      window.requestAnimationFrame(animate);
    };

    const clock = new THREE.Clock(true);
    clock.start();

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
