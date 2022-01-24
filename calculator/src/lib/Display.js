import * as THREE from 'three';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export default class Display {
  constructor() {
    this.displayGroup = new THREE.Group();
    this.displayGroup.position.z = 4;
    this.displayGroup.position.y = 36;
    this.loadDisplayMesh();
  }

  loadDisplayMesh() {
    const displayGeometry = new RoundedBoxGeometry(88, 16, 4, 2, 1);
    const displayMaterial = new THREE.MeshStandardMaterial({
      color: '#fafafa',
    });

    this.displayMesh = new THREE.Mesh(displayGeometry, displayMaterial);
    this.displayGroup.add(this.displayMesh);
  }
}
