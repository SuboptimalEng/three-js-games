import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export default class Block {
  constructor(letter, xOffset, yOffset) {
    this.animate = false;
    this.letter = letter;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.blockGroup = new THREE.Group();
    this.blockGroup.position.x = xOffset;
    this.blockGroup.position.y = yOffset;
    this.addBlock();

    const animate = (t) => {
      if (this.animate) {
        this.blockGroup.rotation.z =
          (Math.sin(Date.now() * 0.01) * Math.PI) / 32;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  setFont(parsedFont) {
    this.parsedFont = parsedFont;
  }

  checkLetter(word, letter) {
    if (this.letter === letter) {
      this.block.material.color.set('#008000');
      this.animate = true;
    } else if (word.includes(this.letter)) {
      this.block.material.color.set('#f7df1e');
    }
  }

  addBlock() {
    const geometry = new RoundedBoxGeometry(8, 8, 8, 4, 1);
    const material = new THREE.MeshPhongMaterial({
      color: '#fafafa',
      transparent: true,
      opacity: 0.25,
    });
    this.block = new THREE.Mesh(geometry, material);
    this.blockGroup.add(this.block);
  }

  removeLetter() {
    this.blockGroup.remove(this.letterMesh);
    this.block.material.opacity = 0.25;
  }

  addLetter(letter) {
    this.letter = letter;
    const letterGeometry = new TextGeometry(letter, {
      font: this.parsedFont,
      size: 5,
      height: 2,
    });
    const letterMaterial = new THREE.MeshNormalMaterial({});
    this.letterMesh = new THREE.Mesh(letterGeometry, letterMaterial);
    this.letterMesh.position.x = -2;
    this.letterMesh.position.y = -2;
    this.letterMesh.position.z = -1;
    this.blockGroup.add(this.letterMesh);
    this.block.material.opacity = 0.5;
  }
}
