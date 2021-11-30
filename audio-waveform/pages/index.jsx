import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";
import vertexShader from "./lib/Shaders";

export default function Home() {
  let test;
  let audioContext, audioElement, dataArray, analyser, source;
  let planeGeometry, planeMaterial, planeCustomMaterial, uniforms, planeMesh;

  const play = () => {
    if (audioContext === undefined) {
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
        u_data_arr: {
          type: "float[64]",
          value: dataArray,
        },
        colorB: { type: "vec3", value: new THREE.Color(0xfff000) },
        colorA: { type: "vec3", value: new THREE.Color(0x000fff) },
      };

      planeGeometry = new THREE.PlaneGeometry(16, 16, 32, 32);
      // planeGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
      // planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
      // planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      planeCustomMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader(),
        wireframe: true,
      });
      planeMesh = new THREE.Mesh(planeGeometry, planeCustomMaterial);
      planeMesh.rotation.x = -Math.PI / 2 + Math.PI / 4;
      planeMesh.scale.x = 6;
      planeMesh.scale.y = 6;
      planeMesh.scale.z = 6;
      test.scene.add(planeMesh);
      let planeMesh2 = new THREE.Mesh(planeGeometry, planeCustomMaterial);
      planeMesh2.rotation.x = Math.PI / 2 + Math.PI / 4;
      planeMesh2.rotation.z = Math.PI / 2;
      planeMesh2.scale.x = 6;
      planeMesh2.scale.y = 6;
      planeMesh2.scale.z = 6;
      test.scene.add(planeMesh2);

      const render = () => {
        analyser.getByteFrequencyData(dataArray);
        uniforms.u_data_arr.value = dataArray;
        // let str = "";
        // for (let i = 0; i < 64; i += 1) {
        //   str += dataArray[i] + ",";
        // }
        // console.log(str);
        requestAnimationFrame(render);
      };

      render();
    }
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
          src="./fur_elise.mp3"
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
