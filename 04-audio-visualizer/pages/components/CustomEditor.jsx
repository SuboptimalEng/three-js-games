import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function CustomEditor() {
  const codeArray = [
    `
// setup next.js + tailwind css + three.js
// npx create-next-app -e with-tailwindcss audio-waveform

// remove default code and add canvas
return (
  <div>
    <canvas id='myThreeJsCanvas'></canvas>
  </div>
)

useEffect(() => {
  test = new SceneInit("myThreeJsCanvas");
  test.initScene();
  test.animate();
}, []);

const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
const planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2 + Math.PI / 4;
planeMesh.scale.x = 2;
planeMesh.scale.y = 2;
planeMesh.scale.z = 2;
planeMesh.position.y = 8;
test.scene.add(planeMesh);
  `,
    `
<div className="absolute bottom-2 right-2">
  <audio
    id="myAudio"
    src="./fur_elise.mp3"
    className="w-80"
    controls
    autoPlay
    onPlay={play}
  />
</div>

const setupAudioContext = () => {
  audioContext = new window.AudioContext();
  audioElement = document.getElementById("myAudio");
  source = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 1024;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
};

const render = () => {
  // note: update audio data
  analyser.getByteFrequencyData(dataArray);

  // note: call render function on every animation frame
  requestAnimationFrame(render);
};

render();
  `,
    `

// const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
// const planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
// const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
const planeCustomMaterial = new THREE.ShaderMaterial({
  // note: this is where the magic happens
  uniforms: uniforms, // dataArray, time
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader(),
  wireframe: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeCustomMaterial);
  `,
    `
// vertex shader 1
// void main() {
//   gl_Position = projectionMatrix
//     * modelViewMatrix
//     * vec4(position.x, position.y, position.z, 1.0);
// }

// vertex shader 2
// void main() {
//   float z = abs(position.x) + abs(position.y);
//   gl_Position = projectionMatrix
//     * modelViewMatrix
//     * vec4(position.x, position.y, z, 1.0);
// }

// vertex shader 3
// void main() {
//   float z = sin(abs(position.x) + abs(position.y));
//   gl_Position = projectionMatrix
//     * modelViewMatrix
//     * vec4(position.x, position.y, z, 1.0);
// }

// vertex shader 4
void main() {
  float z = sin(abs(position.x) + abs(position.y) + u_time * .005);
  gl_Position = projectionMatrix
    * modelViewMatrix
    * vec4(position.x, position.y, z, 1.0);
}
  `,
    `
// vertex shader
varying float x;
varying float y;
varying float z;
varying vec3 vUv;

uniform float u_time;
uniform float u_amplitude;
uniform float[64] u_data_arr;

void main() {
  vUv = position;

  x = abs(position.x);
  y = abs(position.y);

  float floor_x = round(x);
  float floor_y = round(y);

  float x_multiplier = (32.0 - x) / 8.0;
  float y_multiplier = (32.0 - y) / 8.0;

  z = sin(u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * u_amplitude;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
}
  `,
    `
// fragment shader 1
void main() {
  // red color
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

// fragment shader 2
void main() {
  if (position.x < 0.0) {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  } else {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
}

// fragment shader 3
uniform float u_time;
void main() {
  gl_FragColor = vec4(sin(u_time * .0001), 0.0, 0.0, 1.0);
}
  `,
    `
// fragment shader
varying float x;
varying float y;
varying float z;
varying vec3 vUv;

uniform float u_time;

void main() {
  gl_FragColor = vec4((32.0 - abs(x)) / 32.0, (32.0 - abs(y)) / 32.0, (abs(x + y) / 2.0) / 32.0, 1.0);
}
  `,
  ];

  const [index, setIndex] = useState(0);
  const [code, setCode] = useState(codeArray[index]);

  const nextCodeBlock = () => {
    if (index < codeArray.length - 1) {
      setCode(codeArray[index + 1]);
      setIndex(index + 1);
    }
  };

  const prevCodeBlock = () => {
    if (index >= 1) {
      setCode(codeArray[index - 1]);
      setIndex(index - 1);
    }
  };

  return (
    <div className="absolute inset-x-32 inset-y-16">
      <div
        id="custom-editor"
        className="w-full h-full text-2xl bg-white rounded-xl"
      >
        <div className="w-full h-full p-2">
          <CodeMirror
            value={code}
            height="100%"
            theme="light"
            extensions={[javascript()]}
            onChange={(value, viewUpdate) => {
              setCode(value);
            }}
            className="h-full w-11/12"
          />
          <div className="absolute border top-2 bottom-2 right-2 w-1/12">
            <div className="flex text-4xl h-full place-items-center justify-center space-x-2">
              <button onClick={prevCodeBlock}>⏮</button>
              <button onClick={nextCodeBlock}>️⏭</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
