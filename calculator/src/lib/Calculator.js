import * as THREE from 'three';
import { evaluate } from 'mathjs';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import Key from './Key';
import Display from './Display';

export default class Calculator {
  constructor() {
    this.expression = '';
    this.calculatorGroup = new THREE.Group();
    this.loadCalculatorMesh();
    this.loadKeyMeshes();
    this.loadKeyText();
    this.loadDisplay();
  }

  loadDisplay() {
    this.display = new Display();
    this.calculatorGroup.add(this.display.displayGroup);
  }

  loadKeyText() {
    this.ttfLoader = new TTFLoader();
    this.fontLoader = new FontLoader();
    this.ttfLoader.load(
      './fonts/JetBrainsMonoExtraBold.ttf',
      (unparsedFont) => {
        this.parsedFont = this.fontLoader.parse(unparsedFont);
        this.keys.forEach((key) => {
          key.addText(this.parsedFont);
        });
      }
    );
  }

  loadKeyMeshes() {
    const k7 = new Key('7', -36, 15);
    const k8 = new Key('8', -12, 15);
    const k9 = new Key('9', 12, 15);
    const kDivide = new Key('/', 36, 15);

    const k4 = new Key('4', -36, -2);
    const k5 = new Key('5', -12, -2);
    const k6 = new Key('6', 12, -2);
    const kMultiply = new Key('*', 36, -2);

    const k1 = new Key('1', -36, -19);
    const k2 = new Key('2', -12, -19);
    const k3 = new Key('3', 12, -19);
    const kMinus = new Key('-', 36, -19);

    const k0 = new Key('0', -36, -36);
    const kDot = new Key('.', -12, -36);
    const kPlus = new Key('+', 12, -36);
    const kEquals = new Key('=', 36, -36);

    this.keys = [
      k1,
      k2,
      k3,
      k4,
      k5,
      k6,
      k7,
      k8,
      k9,
      k0,
      kDivide,
      kMultiply,
      kMinus,
      kDot,
      kPlus,
      kEquals,
    ];
    this.keys.forEach((k) => this.calculatorGroup.add(k.keyGroup));
  }

  loadCalculatorMesh() {
    const geometry = new RoundedBoxGeometry(100, 100, 4, 4, 1);
    const material = new THREE.MeshStandardMaterial({
      // wireframe: true,
      // NOTE: TypeScript blue.
      color: '#007acc',
      refractionRatio: 0.9,
    });
    this.calculatorMesh = new THREE.Mesh(geometry, material);
    this.calculatorGroup.add(this.calculatorMesh);
  }

  pressKey(event) {
    const validKey = this.keys.find((key) => key.text === event.key);
    if (validKey) {
      if (validKey.text === '=') {
        this.expression = evaluate(this.expression).toString();
        console.log(this.expression);
        this.display.showExpression(this.expression, this.parsedFont);
      } else {
        this.expression = this.expression + validKey.text;
        this.display.showExpression(this.expression, this.parsedFont);
      }
      validKey.press();
    }
  }

  releaseKey(event) {
    const validKey = this.keys.find((key) => key.text === event.key);
    if (validKey) {
      validKey.release();
    }
  }
}
