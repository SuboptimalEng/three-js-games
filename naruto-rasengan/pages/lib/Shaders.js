const vertexShader = () => {
  return `
    varying vec3 vUv;

    void main() {
      vUv = position;

      // gl_Position = projectionMatrix
      //   * modelViewMatrix
      //   * vec4(
      //     sin(position.z / 16.0) * 16.0 + position.x * 4.0 / abs(position.z) ,
      //     position.y * 4.0 / position.z,
      //     position.z,
      //     1.0
      //   );

      if (position.z == 0.0) {
        gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(
            position.x * 0.5,
            position.y * 0.5,
            position.z,
            1.0
          );
      } else {
        // position.x / position.z,
        gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(
            sin(position.z / 16.0) * 16.0 + position.x * 0.5 / abs(position.z) ,
            position.y * 0.5 / abs(position.z),
            position.z,
            1.0
          );
      }
    }
  `;
};

const fragmentShader = () => {
  return `
    varying vec3 vUv;

    void main() {
      gl_FragColor = vec4(max(0.6, abs(sin(vUv.z / 20.0))), max(0.8, abs(sin(vUv.z / 20.0))), 1.0, 1.0);
    }
  `;
};

const vs = () => {
  return `
    varying vec2 vertexUv;
    varying vec3 vertexNormal;

    void main() {
      vertexUv = uv;
      vertexNormal = normalize(normalMatrix * normal);

      gl_Position = projectionMatrix
          * modelViewMatrix
          * vec4(position.x, position.y, position.z, 1.0);
    }
  `;
};

const fs = () => {
  return `
    varying vec2 vertexUv;
    varying vec3 vertexNormal;

    void main() {
      float intensity = pow(0.5 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.5, 0.75, 1.0, 1.0) * intensity;
    }
  `;
};

const fs2 = () => {
  return `
    varying vec2 vertexUv;
    varying vec3 vertexNormal;

    void main() {
      float intensity = pow(0.9 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.5, 0.75, 1.0, 1.0) * intensity;
    }
  `;
};

export { vertexShader, fragmentShader, vs, fs, fs2 };
