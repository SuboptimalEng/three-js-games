const planeVertexShader = () => {
  return `
uniform float time;
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix
		* modelViewMatrix
		* vec4(
			position.x,
			position.y,
			2.0 * cos((abs(position.x) + abs(position.y)) / 16.0),
			1.0
		);
}
	`;
};

const planeFragmentShader = () => {
  return `
uniform sampler2D uTexture;
varying vec2 vUv;
void main() {
	vec3 t = texture2D(uTexture, vUv).rgb;
	gl_FragColor = vec4( t, 1.0 );
}
	`;
};

const customVignetteVertexShader = () => {
  return `
uniform float time;
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix
	* modelViewMatrix
	* vec4(
		position.x,
		position.y,
		position.z,
		1.0
	);
}
  `;
};

const customVignetteFragmentShader = () => {
  return `
uniform float time;
uniform float offset;
uniform float darkness;
uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
	// Eskil's vignette
	vec4 texel = texture2D( tDiffuse, vUv );
	vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );
	gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );
}
  `;
};

export {
  planeVertexShader,
  planeFragmentShader,
  customVignetteVertexShader,
  customVignetteFragmentShader,
};
