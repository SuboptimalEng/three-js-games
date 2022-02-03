import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export default class Display {
  constructor() {
    this.displayGroup = new THREE.Group();
    this.displayGroup.position.z = 4;
    this.displayGroup.position.y = 36;
    this.loadDisplayMesh();
  }

  showExpression(text, parsedFont) {
    if (this.expMesh) {
      this.displayGroup.remove(this.expMesh);
    }
    const expGeometry = new TextGeometry(text, {
      font: parsedFont,
      size: 8,
      // height: 2.5,
      height: 4,
    });
    const expMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.expMesh = new THREE.Mesh(expGeometry, expMaterial);
    this.expMesh.position.x = 40 - text.length * 6.5;
    this.expMesh.position.y = -5;
    this.displayGroup.add(this.expMesh);
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
