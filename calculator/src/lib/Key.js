import * as THREE from 'three';

export default class Key {
  constructor(text, width, xOffset, yOffset) {
    this.text = text;
    this.width = width;
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    this.keyGroup = new THREE.Group();
    this.loadKeyMesh();
  }

  up() {
    this.keyGroup.position.z = 0;
  }

  down() {
    this.keyGroup.position.z = -4;
  }

  loadKeyMesh() {
    const geometry = new THREE.BoxGeometry(64, 64, 32);
    const material = new THREE.MeshStandardMaterial({ color: '#fafafa' });
    // TODO: Create fancy key.
    // const material = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   vertexShader: keyVertexShader(),
    //   fragmentShader: keyFragmentShader(),
    // });
    this.keyMesh = new THREE.Mesh(geometry, material);
    this.keyMesh.position.x = this.xOffset;
    this.keyMesh.position.y = this.yOffset;
    this.keyMesh.position.z = 8;
    this.keyMesh.rotation.x = Math.PI;
    this.keyMesh.scale.set(0.25, 0.25, 0.25);

    this.keyGroup.add(this.keyMesh);
  }
}
