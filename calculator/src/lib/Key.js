import * as THREE from 'three';

// import { keyVertexShader, keyFragmentShader } from './Shaders';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export default class Key {
  constructor(text, width, xOffset, yOffset) {
    this.text = text;
    this.width = width;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zOffset = 4;

    this.keyGroup = new THREE.Group();
    this.loadKeyMesh();
  }

  up() {
    this.keyGroup.position.z = 0;
  }

  down() {
    this.keyGroup.position.z = -2;
  }

  addText(parsedFont) {
    const textGeometry = new TextGeometry(this.text, {
      font: parsedFont,
      size: 8,
      height: 2.5,
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial);

    this.textMesh.position.x = this.xOffset - 4;
    this.textMesh.position.y = this.yOffset - 4;
    this.textMesh.position.z = this.zOffset;
    this.keyGroup.add(this.textMesh);
  }

  loadKeyMesh() {
    const geometry = new RoundedBoxGeometry(16, 16, 4, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: '#fafafa' });
    // TODO: Create fancy key.
    // const geometry = new THREE.BoxGeometry(64, 64, 32);
    // const material = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   vertexShader: keyVertexShader(),
    //   fragmentShader: keyFragmentShader(),
    // });
    // this.keyMesh.scale.set(0.25, 0.25, 0.25);
    this.keyMesh = new THREE.Mesh(geometry, material);
    this.keyMesh.position.x = this.xOffset;
    this.keyMesh.position.y = this.yOffset;
    this.keyMesh.position.z = this.zOffset;
    this.keyMesh.rotation.x = Math.PI;

    this.keyGroup.add(this.keyMesh);
  }
}
