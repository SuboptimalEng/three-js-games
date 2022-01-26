import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export default class Block {
  constructor(letter, xOffset, yOffset) {
    this.letter = letter;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.blockGroup = new THREE.Group();
    const geometry = new RoundedBoxGeometry(8, 8, 8, 4, 1);
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.25,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.blockGroup.add(this.mesh);
    this.blockGroup.position.x = xOffset;
    this.blockGroup.position.y = yOffset;
  }

  addLetter(parsedFont) {
    console.log('hi there');

    const letterGeometry = new TextGeometry(this.letter, {
      font: parsedFont,
      size: 5,
      height: 2,
    });
    const letterMaterial = new THREE.MeshNormalMaterial({});
    this.letterMesh = new THREE.Mesh(letterGeometry, letterMaterial);
    this.letterMesh.position.x = -2;
    this.letterMesh.position.y = -2;
    this.letterMesh.position.z = -1;
    this.blockGroup.add(this.letterMesh);
  }
}
