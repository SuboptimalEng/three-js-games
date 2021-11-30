import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";

export default function Home() {
  let audioContext,
    audioElement,
    dataArray,
    analyser,
    source,
    str = "";

  let test;
  let planeGeometry, planeMaterial, planeCustomMaterial, uniforms, planeMesh;

  const play = () => {
    audioContext = new window.AudioContext();
    audioElement = document.getElementById("myAudio");
    source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 128;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    uniforms = {
      u_time: { value: 1.0 },
      u_arr: {
        type: "vec3",
        value: new THREE.Vector3(dataArray[0], dataArray[1], dataArray[2]),
      },
      u_data_arr: {
        type: "int[64]",
        value: dataArray,
      },
      colorB: { type: "vec3", value: new THREE.Color(0xfff000) },
      colorA: { type: "vec3", value: new THREE.Color(0x000fff) },
    };

    planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    // planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeCustomMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader(),
      wireframe: true,
    });
    planeMesh = new THREE.Mesh(planeGeometry, planeCustomMaterial);
    planeMesh.scale.x = 10;
    planeMesh.scale.y = 10;
    planeMesh.scale.z = 10;
    planeMesh.rotation.x = -Math.PI / 2 + 0.4;
    planeMesh.position.y = -20;
    test.scene.add(planeMesh);

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      console.log(dataArray);
      uniforms.u_arr.value = new THREE.Vector3(
        dataArray[0],
        dataArray[1],
        dataArray[2]
      );
      uniforms.u_data_arr.value = dataArray;
      // console.log(dataArray);
      // for (let i = 0; i < 64; i += 1) {
      //   str += dataArray[i] + ",";
      // }
      // console.log(str);
      // str = "";
      // const size = dataArray[0] / 50 + 10;
      // console.log(size);
      // planeMesh.scale.x = size;
      // planeMesh.scale.y = size;
      // planeMesh.scale.z = size;
      requestAnimationFrame(render);
    };

    render();
  };

  const vertexShader = () => {
    return `
      varying float x;
      varying float y;
      varying float z;
      varying vec3 vUv;
      uniform vec3 u_arr;
      uniform float u_time;
      uniform float[64] u_data_arr;

      void main() {
        vUv = position;
        // z = 0.0;
        // z = abs(round(position.x));
        x = position.x + 5.0;
        y = position.y + 5.0;
        if (x >= 0.0) {
          if (y >= 0.0) {
            z = u_data_arr[0] / 100.0;
          }
          if (y >= 1.0) {
            z = u_data_arr[0] / 100.0 / 2.0;
          }
        }
        if (x >= 1.0) {
          z = u_data_arr[1] / 100.0;
        }
        if (x >= 2.0) {
          z = u_data_arr[2] / 100.0;
        }
        if (x >= 3.0) {
          z = u_data_arr[3] / 100.0;
        }
        if (x >= 4.0) {
          z = u_data_arr[4] / 100.0;
        }
        if (x >= 5.0) {
          z = u_data_arr[5] / 100.0;
        }
        if (x >= 6.0) {
          z = u_data_arr[6] / 100.0;
        }
        if (x >= 7.0) {
          z = u_data_arr[7] / 100.0;
        }
        if (x >= 8.0) {
          z = u_data_arr[8] / 100.0;
        }
        if (x >= 9.0) {
          z = u_data_arr[9] / 100.0;
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
      }
    `;
  };

  useEffect(() => {
    test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <audio
          id="myAudio"
          src="./blue_boi.mp3"
          className="w-80"
          controls
          autoPlay
          onPlay={play}
        />
      </div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
