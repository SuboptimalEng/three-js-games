import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import Key from './Key';

export default class Keyboard {
  constructor() {
    this.keyboardGroup = new THREE.Group();

    this.loadKeyboardMesh();
    this.loadKeyMeshes();
  }

  loadKeyboardMesh() {
    const geometry = new RoundedBoxGeometry(100, 8, 100, 4, 0.5);
    const material = new THREE.MeshNormalMaterial();
    this.keyboardMesh = new THREE.Mesh(geometry, material);
    this.keyboardMesh.position.y = -16;
    this.keyboardGroup.add(this.keyboardMesh);
  }

  pressKey(event) {
    const validKey = this.keys.find((key) => key.text === event.key);
    console.log(validKey);
    if (validKey) {
      validKey.down();
    }
  }

  releaseKey(event) {
    const validKey = this.keys.find((key) => key.text === event.key);
    if (validKey) {
      validKey.up();
    }
  }

  loadKeyMeshes() {
    const w = new Key('w', 1.5, -9, -11);
    const a = new Key('a', 1.5, -22, 11);
    const s = new Key('s', 1.5, 0, 11);
    const d = new Key('d', 1.5, 22, 11);
    this.keys = [w, a, s, d];
    this.keys.forEach((k) => this.keyboardGroup.add(k.keyGroup));
  }
}
