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
    const geometry = new RoundedBoxGeometry(100, 8, 100, 4, 0.5);
    const material = new THREE.MeshNormalMaterial();
    this.calculatorMesh = new THREE.Mesh(geometry, material);
    this.calculatorMesh.position.y = -16;
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
    const k4 = new Key('4', 1.5, -20, -20);
    const k5 = new Key('5', 1.5, 0, -20);
    const k6 = new Key('6', 1.5, 20, -20);
    this.keys = [k1, k2, k3, k4, k5, k6];
    this.keys.forEach((k) => this.calculatorGroup.add(k.keyGroup));
  }
}
