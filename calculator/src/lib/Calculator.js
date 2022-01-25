import * as THREE from 'three';
import { evaluate } from 'mathjs';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import Key from './Key';
import Display from './Display';
// import { calculatorFragmentShader, calculatorVertexShader } from './Shaders';

export default class Calculator {
  constructor(uniforms) {
    this.expression = '';
    this.uniforms = uniforms;
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
    this.keys = [
      new Key('7', -36, 15),
      new Key('8', -12, 15),
      new Key('9', 12, 15),
      new Key('/', 36, 15),

      new Key('4', -36, -2),
      new Key('5', -12, -2),
      new Key('6', 12, -2),
      new Key('*', 36, -2),

      new Key('1', -36, -19),
      new Key('2', -12, -19),
      new Key('3', 12, -19),
      new Key('-', 36, -19),

      new Key('0', -36, -36),
      new Key('.', -12, -36),
      new Key('+', 12, -36),
      new Key('=', 36, -36),
    ];
    this.keys.forEach((k) => this.calculatorGroup.add(k.keyGroup));
  }

  loadCalculatorMesh() {
    // NOTE: Add shader effects to calculator.
    // const geometry = new THREE.BoxGeometry(100, 100, 4, 20, 20, 1);
    // const material = new THREE.ShaderMaterial({
    //   // wireframe: true,
    //   // depthPacking: THREE.RGBADepthPacking,
    //   uniforms: this.uniforms,
    //   vertexShader: calculatorVertexShader(),
    //   fragmentShader: calculatorFragmentShader(),
    // });

    const geometry = new RoundedBoxGeometry(100, 100, 4, 4, 1);
    const material = new THREE.MeshStandardMaterial({
      // NOTE: TypeScript blue.
      color: '#007acc',
    });
    this.calculatorMesh = new THREE.Mesh(geometry, material);
    this.calculatorGroup.add(this.calculatorMesh);
  }

  pressKey(event) {
    const validKey = this.keys.find((key) => key.text === event.key);
    if (validKey) {
      if (validKey.text !== '=') {
        this.expression = this.expression + validKey.text;
        this.display.showExpression(this.expression, this.parsedFont);
      }
      validKey.press();
    }
  }

  releaseKey(event) {
    const validKey = this.keys.find((key) => key.text === event.key);
    if (validKey) {
      if (validKey.text === '=') {
        this.expression = evaluate(this.expression).toString();
        this.display.showExpression(this.expression, this.parsedFont);
      }
      validKey.release();
    }
  }
}
