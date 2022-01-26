import * as THREE from 'three';

export default class Block {
  constructor(letter, xOffset, yOffset) {
    this.letter = letter;
    const geometry = new THREE.BoxGeometry(8, 8, 8);
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.75,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = xOffset;
    this.mesh.position.y = yOffset;
  }
}
