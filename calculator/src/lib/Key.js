import * as THREE from 'three';
import { keyFragmentShader, keyVertexShader } from './shaders';

export default class Key {
  constructor(text, width, xOffset, zOffset) {
    this.text = text;
    this.width = width;
    this.xOffset = xOffset;
    this.zOffset = zOffset;
    this.keyGroup = new THREE.Group();

    this.loadKeyMesh();
  }

  up() {
    this.keyGroup.position.y = 0;
  }

  down() {
    this.keyGroup.position.y = -4;
  }

  loadKeyMesh() {
    const geometry = new THREE.BoxGeometry(32, 32, 32);
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      vertexShader: keyVertexShader(),
      fragmentShader: keyFragmentShader(),
    });
    this.keyMesh = new THREE.Mesh(geometry, material);
    this.keyMesh.position.y = 2;
    this.keyMesh.position.x = this.xOffset;
    this.keyMesh.position.z = this.zOffset;
    this.keyMesh.scale.set(0.25, 0.25, 0.25);

    this.keyGroup.add(this.keyMesh);
  }
}
