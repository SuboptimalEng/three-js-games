import { useEffect } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import SceneInit from "./lib/SceneInit";
import { fragmentShader, vertexShader } from "./lib/Shaders";

export default function Home() {
  useEffect(async () => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    // const uniforms = {
    //   u_time: {
    //     type: "f",
    //     value: 1.0,
    //   },
    // };
    const g = new THREE.BoxGeometry(8, 8, 8, 8, 8, 8);
    const m = new THREE.MeshNormalMaterial({});
    // const m = new THREE.ShaderMaterial({
    //   uniforms: uniforms,
    //   vertexShader: vertexShader(),
    //   fragmentShader: fragmentShader(),
    //   // wireframe: true,
    // });
    const blockMesh = new THREE.Mesh(g, m);
    // group.add(blockMesh);
    test.scene.add(blockMesh);

    // blockMesh.scale.x = 2;
    // blockMesh.scale.y = 2;
    // blockMesh.scale.z = 2;
    blockMesh.rotation.x = Math.PI / 8;
    blockMesh.rotation.y = Math.PI / 8;
    // blockMesh.rotation.z = -Math.PI / 4;

    // const animate = (t) => {
    //   uniforms.u_time.value = t;
    //   requestAnimationFrame(animate);
    // };
    // animate();

    // const vertexArray = g.getAttribute("position");
    // for (var i = 0; i < vertexArray.count; i++) {
    //   g.attributes.position.needsUpdate = true;
    //   const vertex = new THREE.Vector3();
    //   vertex.fromBufferAttribute(vertexArray, i);
    //   // console.log(vertex.normalize());
    //   vertex.normalize().multiplyScalar(100);
    // }

    // const tween1 = new TWEEN.Tween({ x: 1, y: 1, z: 1 })
    //   .to({ x: 2, y: 2, z: 2 }, 1000)
    //   .easing(TWEEN.Easing.Quartic.InOut)
    //   .onUpdate(({ x, y, z }) => {
    //     test.scene.children.forEach((obj) => {
    //       obj.scale.x = x;
    //       obj.scale.y = y;
    //       obj.scale.z = z;
    //     });
    //   });
    // const tween2 = new TWEEN.Tween({ x: 2, y: 2, z: 2 })
    //   .to({ x: 1, y: 1, z: 1 }, 1000)
    //   .easing(TWEEN.Easing.Quartic.InOut)
    //   .onUpdate(({ x, y, z }) => {
    //     test.scene.children.forEach((obj) => {
    //       obj.scale.x = x;
    //       obj.scale.y = y;
    //       obj.scale.z = z;
    //     });
    //   });
    // tween1.chain(tween2);
    // tween2.chain(tween1);
    // tween1.start();

    const twistZ = (geometry, direction) => {
      // NOTE: Tell Three.js to re-render this mesh.
      // NOTE: Needs to be run after every previous update.
      geometry.attributes.position.needsUpdate = true;
      const twistSpeed = 0.2;
      const vertex = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const directionVector = new THREE.Vector3(0, 0, direction);
      const vertexArray = g.getAttribute("position");
      // NOTE: vertexArray.count === totalArrayLength / 3
      // NOTE: The count represents the x, y, z coordinates of a vertex
      for (let i = 0; i < vertexArray.count; i++) {
        vertex.fromBufferAttribute(vertexArray, i);
        const zPos = vertex.z;
        // NOTE: Wtf is going on here?
        quaternion.setFromAxisAngle(
          directionVector,
          (Math.PI * zPos * twistSpeed) / 60
        );
        vertex.applyQuaternion(quaternion);
        // NOTE: Update position array one value at a time.
        geometry.attributes.position.array[i * 3] = vertex.x;
        geometry.attributes.position.array[i * 3 + 1] = vertex.y;
        geometry.attributes.position.array[i * 3 + 2] = vertex.z;
      }
    };

    let i = 0;
    const animate = () => {
      i += 1;
      const iBy60 = Math.round(i / 40);
      console.log(iBy60);
      if (iBy60 % 4 === 0) {
        twistZ(g, 1);
      } else if (iBy60 % 4 === 2) {
        twistZ(g, -1);
      }
      window.requestAnimationFrame(animate);
      // TWEEN.update(t);
    };

    animate();
    // tween1.start();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
