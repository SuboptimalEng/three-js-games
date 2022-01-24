import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import Key from './Key';

export default class Calculator {
  constructor() {
    this.calculatorGroup = new THREE.Group();
    this.loadCalculatorMesh();
    this.loadKeyMeshes();
    this.loadTextMeshes();
  }

  loadTextMeshes() {
    this.ttfLoader = new TTFLoader();
    this.fontLoader = new FontLoader();
    this.ttfLoader.load('./fonts/jbm-regular.ttf', (unparsedFont) => {
      const font = this.fontLoader.parse(unparsedFont);
      this.keys.forEach((key) => {
        const textGeo = new TextGeometry(key.text, {
          font: font,
          size: 8,
          height: 2.5,
        });
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.position.x = key.xOffset - 4;
        textMesh.position.y = key.yOffset - 4;
        textMesh.position.z = 10;
        key.keyGroup.add(textMesh);
      });
    });
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
    const k1 = new Key('1', 1.5, -36, 0);
    const k2 = new Key('2', 1.5, -12, 0);
    const k3 = new Key('3', 1.5, 12, 0);
    const k4 = new Key('+', 1.5, 36, 0);
    this.keys = [k1, k2, k3, k4];
    this.keys.forEach((k) => this.calculatorGroup.add(k.keyGroup));
  }
}
