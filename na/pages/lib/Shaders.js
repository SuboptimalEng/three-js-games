const vertexShader = () => {
  return `
    varying vec3 vUv;

    void main() {
      vUv = position;

      gl_Position = projectionMatrix
        * modelViewMatrix
        * vec4(
          sin(position.z / 16.0) * 16.0 + position.x * 4.0 / position.z,
          position.y * 4.0 / position.z,
          position.z,
          1.0
        );
    }
  `;
};

const fragmentShader = () => {
  return `
    varying vec3 vUv;

    void main() {
      gl_FragColor = vec4(max(0.5, abs(sin(vUv.z / 40.0))), max(0.75, abs(sin(vUv.z / 40.0))), 1.0, 1.0);
    }
  `;
};

export { vertexShader, fragmentShader };
