import * as THREE from 'three';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Block from './Block';

export default class Wordle {
  constructor() {
    this.wordleGroup = new THREE.Group();
    this.wordleGroup.position.x = -20;
    this.createBlocks();
    this.loadLetters();
  }

  createBlocks() {
    this.blocks = [
      new Block('a', 0, 0),
      new Block('b', 10, 0),
      new Block('c', 20, 0),
      new Block('d', 30, 0),
      new Block('e', 40, 0),

      new Block('f', 0, 10),
      new Block('g', 10, 10),
      new Block('h', 20, 10),
      new Block('i', 30, 10),
      new Block('j', 40, 10),
    ];
    this.blocks.forEach((block) => this.wordleGroup.add(block.blockGroup));
  }

  loadLetters() {
    this.ttfLoader = new TTFLoader();
    this.fontLoader = new FontLoader();
    this.ttfLoader.load(
      './fonts/JetBrainsMonoExtraBold.ttf',
      (unparsedFont) => {
        console.log('unparsed font');
        this.parsedFont = this.fontLoader.parse(unparsedFont);
        this.blocks.forEach((block) => {
          block.addLetter(this.parsedFont);
        });
      }
    );
  }

  updateColor(event) {
    console.log('hi');
    this.wordleMesh.material.color.set('#ff0000');
  }
}
