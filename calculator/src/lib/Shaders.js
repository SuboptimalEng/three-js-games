const keyVertexShader = () => {
  return `
	varying vec3 n;
	varying vec3 vUv;

	void main() {
		n = normal;
		vUv = position;

		float h = 32.0;

		float xOffset = (h - vUv.y) * vUv.x / 32.0;
		float yOffset = -6.0 * cos(abs(vUv.x / 16.0));
		float zOffset = (h - vUv.y) * vUv.z / 32.0;

		gl_Position = projectionMatrix
			* modelViewMatrix
			* vec4(vUv.x + xOffset, vUv.y + yOffset, vUv.z + zOffset, 1.0 );
	}
  `;
};

const keyFragmentShader = () => {
  return `
	varying vec3 n;
	varying vec3 vUv;

	void main() {
      gl_FragColor = vec4(0.5, 0.0, 0.0, 0.5);
	}
  `;
};

const calculatorVertexShader = () => {
  return `
	uniform float u_time;
	uniform float u_x_offset;
	uniform float u_y_offset;

	varying vec3 n;
	varying vec3 vUv;

	void main() {
		n = normal;
		vUv = position;

		gl_Position = projectionMatrix
			* modelViewMatrix
			* vec4(vUv.x , vUv.y , vUv.z + sin(u_time) , 1.0 );
	}
  `;
};

const calculatorFragmentShader = () => {
  return `
	uniform float u_time;
	uniform float u_x_offset;
	uniform float u_y_offset;

	varying vec3 n;
	varying vec3 vUv;

	void main() {
      gl_FragColor = vec4(0.5, 0.5, 0.0, 0.5);
	}
  `;
};

export {
  keyVertexShader,
  keyFragmentShader,
  calculatorVertexShader,
  calculatorFragmentShader,
};
