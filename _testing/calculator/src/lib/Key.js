import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

// import { keyVertexShader, keyFragmentShader } from './Shaders';

export default class Key {
  constructor(text, xOffset, yOffset) {
    this.text = text;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = 4;

    this.keyGroup = new THREE.Group();
    this.loadKeyMesh();
  }

  release() {
    this.keyGroup.position.z += 2;
    this.keyMesh.material.color.set('#fafafa');
  }

  press() {
    this.keyGroup.position.z -= 2;
    this.keyMesh.material.color.set('#f7df1e');
  }

  addText(parsedFont) {
    const textGeometry = new TextGeometry(this.text, {
      font: parsedFont,
      size: 8,
      // height: 2.5,
      height: 4,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000' });
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial);

    this.textMesh.position.x = this.xOffset - 4;
    this.textMesh.position.y = this.yOffset - 4;
    this.textMesh.position.z = this.zOffset;
    this.keyGroup.add(this.textMesh);
  }

  loadKeyMesh() {
    const geometry = new RoundedBoxGeometry(16, 16, 4, 2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: '#fafafa',
    });

    // Note: Create fancy key.
    // const geometry = new THREE.BoxGeometry(64, 64, 32);
    // const material = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   vertexShader: keyVertexShader(),
    //   fragmentShader: keyFragmentShader(),
    // });
    // this.keyMesh.scale.set(0.1, 0.1, 0.1);

    this.keyMesh = new THREE.Mesh(geometry, material);
    this.keyMesh.position.x = this.xOffset;
    this.keyMesh.position.y = this.yOffset;
    this.keyMesh.position.z = this.zOffset;
    this.keyMesh.rotation.x = Math.PI;
    this.keyGroup.add(this.keyMesh);
  }
}
