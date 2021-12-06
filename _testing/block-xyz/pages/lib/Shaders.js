const vertexShader = () => {
  return `
    uniform float u_time;

    varying vec3 v_normal;

    void main() {
      v_normal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
    }
  `;
};

const fragmentShader = () => {
  return `
    varying vec3 v_normal;

    void main() {
      gl_FragColor = vec4(abs(v_normal.x), abs(v_normal.y), abs(v_normal.z), 1.0);
    }
  `;
};

export { vertexShader, fragmentShader };
