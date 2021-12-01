const vertexShader = () => {
  return `
      varying float x;
      varying float y;
      varying float z;
      varying float floor_x;
      varying float floor_y;
      varying float x_multiplier;
      varying float y_multiplier;

      varying vec3 vUv;

      uniform float u_time;
      uniform float[64] u_data_arr;

      void main() {
        vUv = position;

        x = abs(position.x);
	      y = abs(position.y);

        floor_x = round(x);
	      floor_y = round(y);

        x_multiplier = (32.0 - x) / 16.0;
        y_multiplier = (32.0 - y) / 16.0;

        z = cos(u_data_arr[int(floor_x)] * x_multiplier / 50.0 + u_data_arr[int(floor_y)] * y_multiplier / 50.0);

        // if (x >= 0.0) {
        //   z = u_data_arr[0] / 100.0;
        // }
        // if (x >= 1.0) {
        //   z = u_data_arr[1] / 100.0;
        // }
        // if (x >= 2.0) {
        //   z = u_data_arr[2] / 100.0;
        // }
        // if (x >= 3.0) {
        //   z = u_data_arr[3] / 100.0;
        // }
        // if (x >= 4.0) {
        //   z = u_data_arr[4] / 100.0;
        // }
        // if (x >= 5.0) {
        //   z = u_data_arr[5] / 100.0;
        // }
        // if (x >= 6.0) {
        //   z = u_data_arr[6] / 100.0;
        // }
        // if (x >= 7.0) {
        //   z = u_data_arr[7] / 100.0;
        // }
        // if (x >= 8.0) {
        //   z = u_data_arr[8] / 100.0;
        // }
        // if (x >= 9.0) {
        //   z = u_data_arr[9] / 100.0;
        // }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
      }
    `;
};

export default vertexShader;
