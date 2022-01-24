import * as THREE from 'three';
import { keyFragmentShader, keyVertexShader } from './shaders';

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
    const geometry = new THREE.BoxGeometry(32, 32, 32);
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      vertexShader: keyVertexShader(),
      fragmentShader: keyFragmentShader(),
    });
    this.keyMesh = new THREE.Mesh(geometry, material);
    this.keyMesh.position.x = this.xOffset;
    this.keyMesh.position.y = this.yOffset;
    this.keyMesh.position.z = 16;
    this.keyMesh.rotation.x = Math.PI / 2;
    this.keyMesh.scale.set(0.25, 0.25, 0.25);

    this.keyGroup.add(this.keyMesh);
  }
}
