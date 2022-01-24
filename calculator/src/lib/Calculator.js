import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import Key from './Key';

export default class Calculator {
  constructor() {
    this.calculatorGroup = new THREE.Group();

    this.loadCalculatorMesh();
    this.loadKeyMeshes();
  }

  loadCalculatorMesh() {
    const geometry = new RoundedBoxGeometry(100, 100, 8, 4, 0.5);
    const material = new THREE.MeshNormalMaterial();
    this.calculatorMesh = new THREE.Mesh(geometry, material);
    this.calculatorMesh.position.y = -8;
    this.calculatorGroup.add(this.calculatorMesh);
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
    const k1 = new Key('1', 1.5, -20, 0);
    const k2 = new Key('2', 1.5, 0, 0);
    const k3 = new Key('3', 1.5, 20, 0);
    this.keys = [k1, k2, k3];
    this.keys.forEach((k) => this.calculatorGroup.add(k.keyGroup));
  }
}
