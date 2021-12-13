import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import { vertexShader, fragmentShader } from "./lib/Shaders";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    const sphereGeometry = new THREE.SphereGeometry(8);
    const sphereMaterial = new THREE.MeshToonMaterial();
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    test.scene.add(sphereMesh);

    const sg = new THREE.SphereGeometry(40, 20, 20);
    const sm = new THREE.MeshNormalMaterial({
      // wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const sm2 = new THREE.Mesh(sg, sm);
    test.scene.add(sm2);

    const boxGeometry = new THREE.BoxGeometry(4, 4, 72, 1, 1, 16);
    const boxMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      wireframe: true,
    });
    const bm = new THREE.Mesh(boxGeometry, boxMaterial);
    bm.rotation.x = Math.PI / 16;
    test.scene.add(bm);

    // const bg = new THREE.BoxGeometry(8, 8, 80, 1, 1, 20);
    // const bm = new THREE.ShaderMaterial({
    //   vertexShader: vertexShader(),
    //   fragmentShader: fragmentShader(),
    //   wireframe: true,
    // });
    const bm2 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm2.rotation.x = Math.PI / 8;
    bm2.rotation.y = Math.PI / 8;
    test.scene.add(bm2);

    const bm3 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm3.rotation.x = Math.PI / 2;
    bm3.rotation.y = Math.PI / 2;
    test.scene.add(bm3);

    const bm4 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm4.rotation.x = Math.PI / 4;
    bm4.rotation.y = Math.PI / 4;
    test.scene.add(bm4);

    const bm5 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm5.rotation.x = Math.PI / 6;
    test.scene.add(bm5);

    const bm6 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm6.rotation.x = Math.PI / 3;
    test.scene.add(bm6);

    const render = () => {
      bm.rotation.y += 0.02;
      bm2.rotation.y += 0.024;
      bm3.rotation.y += 0.028;
      bm4.rotation.y += 0.032;
      bm5.rotation.y += 0.036;
      bm6.rotation.y += 0.04;
      // sm2.rotation.y += 0.01;

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
