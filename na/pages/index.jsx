import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import { vertexShader, fragmentShader, vs, fs } from "./lib/Shaders";

export default function Home() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    const sphereGeometry = new THREE.SphereGeometry(40, 20, 20);
    const sphereMaterial = new THREE.MeshNormalMaterial({
      // wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const sm = new THREE.Mesh(sphereGeometry, sphereMaterial);
    test.scene.add(sm);

    const g = new THREE.Group();

    const boxGeometry = new THREE.BoxGeometry(4, 4, 120, 1, 1, 16);
    const boxMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      // wireframe: true,
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

    const bm7 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm7.rotation.x = Math.PI / 5;
    test.scene.add(bm7);

    const bm8 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm8.rotation.x = Math.PI / 7;
    test.scene.add(bm8);

    const bm9 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm9.rotation.x = Math.PI / 2.5;
    test.scene.add(bm9);

    const bm10 = new THREE.Mesh(boxGeometry, boxMaterial);
    bm10.rotation.x = Math.PI / 3.5;
    test.scene.add(bm10);

    g.add(bm, bm2, bm3, bm4, bm5, bm6, bm7, bm8, bm9, bm10);
    test.scene.add(g);

    const sphereGeometry2 = new THREE.SphereGeometry(40, 40, 40);
    const sphereMaterial2 = new THREE.ShaderMaterial({
      vertexShader: vs(),
      fragmentShader: fs(),
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      // transparent: true,
      // opacity: 0.5,
      // wireframe: true,
    });
    const sm2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    console.log(sm2);
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
      g.rotation.y += 0.01;

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
