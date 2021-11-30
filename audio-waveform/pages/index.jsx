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

  let planeGeometry, planeMaterial, planeMesh;

  const play = () => {
    audioContext = new window.AudioContext();
    audioElement = document.getElementById("myAudio");
    source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 128;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      // console.log(dataArray);
      // for (let i = 0; i < 64; i += 1) {
      //   str += dataArray[i] + ",";
      // }
      // console.log(str);
      // str = "";
      const size = dataArray[0] / 50 + 10;
      console.log(size);
      planeMesh.scale.x = size;
      planeMesh.scale.y = size;
      planeMesh.scale.z = size;

      requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initScene();
    test.animate();

    planeGeometry = new THREE.PlaneGeometry(10, 10, 64, 64);
    planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.scale.x = 10;
    planeMesh.scale.y = 10;
    planeMesh.scale.z = 10;
    planeMesh.rotation.x = -Math.PI / 2 + 0.4;
    test.scene.add(planeMesh);
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
