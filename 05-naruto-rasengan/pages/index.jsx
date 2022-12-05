import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import {
  sinWaveVertexShader2,
  sinWaveVertexShader,
  fragmentShader,
  sphereVertexShader,
  auraFragmentShader,
  rasenganFragmentShader,
} from "./lib/Shaders";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    // test.scene.scale.x = 2.0;
    // test.scene.scale.y = 2.0;
    // test.scene.scale.z = 2.0;

    const loader = new OBJLoader();
    loader.load(
      "./hand.obj",
      function (obj) {
        obj.scale.x = 4;
        obj.scale.y = 4;
        obj.scale.z = 4;
        obj.rotation.x = -Math.PI / 2;
        obj.position.z = -28;
        obj.position.y = -50;
        obj.position.x = 6;
        test.scene.position.y = 20;
        test.scene.add(obj);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );

    const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 36, 4, 4, 16);
    // const boxGeometry = new THREE.BoxGeometry(4, 4, 36, 1, 1, 16);
    const boxMaterial = new THREE.ShaderMaterial({
      vertexShader: sinWaveVertexShader(),
      fragmentShader: fragmentShader(),
      // wireframe: true,
    });
    const bm = new THREE.Mesh(boxGeometry, boxMaterial);
    bm.rotation.x = Math.PI / 16;
    bm.rotation.y = Math.PI / 16;
    test.scene.add(bm);

    const bm2 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm2.rotation.x = Math.PI / 8;
    const bm3 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm3.rotation.x = Math.PI / 2;
    const bm4 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm4.rotation.x = Math.PI / 4;
    const bm5 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm5.rotation.x = Math.PI / 6;
    const bm6 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm6.rotation.x = Math.PI / 3;
    const bm7 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm7.rotation.x = Math.PI / 5;
    const bm8 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm8.rotation.x = Math.PI / 7;
    const bm9 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm9.rotation.x = Math.PI / 2.5;
    const bm10 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm10.rotation.x = Math.PI / 3.5;
    const bm11 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm11.rotation.x = Math.PI / 4.5;
    const bm12 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm12.rotation.x = Math.PI / 5.5;
    test.scene.add(bm2, bm3, bm4, bm5, bm6, bm7, bm8, bm9, bm10, bm11, bm12);

    const sphereGeometry = new THREE.SphereGeometry(20, 80, 80);
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: sphereVertexShader(),
      fragmentShader: rasenganFragmentShader(),
      transparent: true,
      opacity: 0.5,
    });
    const sm = new THREE.Mesh(sphereGeometry, sphereMaterial);
    test.scene.add(sm);

    const sphereGeometry2 = new THREE.SphereGeometry(20, 20, 20);
    const sphereMaterial2 = new THREE.ShaderMaterial({
      vertexShader: sphereVertexShader(),
      fragmentShader: auraFragmentShader(),
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const sm2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    sm2.scale.x = 1.25;
    sm2.scale.y = 1.25;
    sm2.scale.z = 1.25;
    test.scene.add(sm2);

    const render = () => {
      bm.rotation.y += 0.02;
      bm2.rotation.y += 0.024;
      bm3.rotation.y += 0.028;
      bm4.rotation.y += 0.032;
      bm5.rotation.y += 0.036;
      bm6.rotation.y += 0.04;
      bm7.rotation.y += 0.044;
      bm8.rotation.y += 0.048;
      bm9.rotation.y += 0.052;
      bm10.rotation.y += 0.056;
      bm11.rotation.y += 0.056;
      bm12.rotation.y += 0.056;
      window.requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
