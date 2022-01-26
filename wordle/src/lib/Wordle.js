import * as THREE from 'three';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Block from './Block';
import { validKeys } from './Utils';

export default class Wordle {
  constructor() {
    this.letters = [];
    this.letterIndex = 0;
    this.currentWord = '';
    this.word = 'hello';

    this.wordleGroup = new THREE.Group();
    this.wordleGroup.position.x = -20;
    this.wordleGroup.position.y = -20;
    this.createBoard();
    this.setUpFont();
  }

  createBoard() {
    this.blocks = [
      new Block('', 0, 40),
      new Block('', 10, 40),
      new Block('', 20, 40),
      new Block('', 30, 40),
      new Block('', 40, 40),

      new Block('', 0, 30),
      new Block('', 10, 30),
      new Block('', 20, 30),
      new Block('', 30, 30),
      new Block('', 40, 30),

      new Block('', 0, 20),
      new Block('', 10, 20),
      new Block('', 20, 20),
      new Block('', 30, 20),
      new Block('', 40, 20),

      new Block('', 0, 10),
      new Block('', 10, 10),
      new Block('', 20, 10),
      new Block('', 30, 10),
      new Block('', 40, 10),

      new Block('', 0, 0),
      new Block('', 10, 0),
      new Block('', 20, 0),
      new Block('', 30, 0),
      new Block('', 40, 0),
    ];

    this.blocks.forEach((block) => this.wordleGroup.add(block.blockGroup));
  }

  addLetter(event) {
    if (event.key === 'Enter') {
      for (let i = 0; i < this.word.length; i++) {
        const letter = this.word[i];
        const block = this.blocks[i];
        // console.log(letter, block);
        block.checkLetter(letter);
      }
      // this.word.f((letter, i) => {
      //   const block = this.blocks[i];
      //   console.log(letter, block.letter);
      //   block.checkLetter(letter);
      // });
    } else if (event.key === 'Backspace') {
      this.letterIndex -= 1;
      const block = this.blocks[this.letterIndex];
      block.removeLetter();
    } else if (validKeys.includes(event.key)) {
      const block = this.blocks[this.letterIndex];
      block.addLetter(event.key);
      // this.currentWord += event.key;
      this.letterIndex += 1;
    }
  }

  setUpFont() {
    this.ttfLoader = new TTFLoader();
    this.fontLoader = new FontLoader();
    this.ttfLoader.load(
      './fonts/JetBrainsMonoExtraBold.ttf',
      (unparsedFont) => {
        this.parsedFont = this.fontLoader.parse(unparsedFont);
        this.blocks.forEach((block) => block.setFont(this.parsedFont));
      }
    );
  }
}
