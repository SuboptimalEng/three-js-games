import * as THREE from 'three';

export default class FranticArchitect {
  constructor() {
    this.gg = new THREE.Group();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    this.gg.add(boxMesh);
  }
}
