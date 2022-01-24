import * as THREE from 'three';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import Key from './Key';

export default class Calculator {
  constructor() {
    this.calculatorGroup = new THREE.Group();
    this.loadCalculatorMesh();
    this.loadKeyMeshes();
    this.loadKeyText();
  }

  loadKeyText() {
    this.ttfLoader = new TTFLoader();
    this.fontLoader = new FontLoader();
    this.ttfLoader.load(
      './fonts/JetBrainsMonoExtraBold.ttf',
      (unparsedFont) => {
        const parsedFont = this.fontLoader.parse(unparsedFont);
        this.keys.forEach((key) => {
          key.addText(parsedFont);
        });
      }
    );
  }

  loadKeyMeshes() {
    const k1 = new Key('1', 1.5, -36, 0);
    const k2 = new Key('2', 1.5, -12, 0);
    const k3 = new Key('3', 1.5, 12, 0);
    const k4 = new Key('+', 1.5, 36, 0);
    this.keys = [k1, k2, k3, k4];
    this.keys.forEach((k) => this.calculatorGroup.add(k.keyGroup));
  }

  loadCalculatorMesh() {
    const geometry = new RoundedBoxGeometry(100, 100, 4, 4, 0.5);
    const material = new THREE.MeshStandardMaterial({
      wireframe: true,
      color: '#007acc',
      refractionRatio: 0.1,
    });
    this.calculatorMesh = new THREE.Mesh(geometry, material);
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
}
