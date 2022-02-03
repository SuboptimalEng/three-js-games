import * as THREE from 'three';

import { vertexShader, fragmentShader } from './Shaders';

export default class Cubelet {
  constructor(xOffset, yOffset, zOffset) {
    this.cubeletGroup = new THREE.Group();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
    });
    this.cubeletMesh = new THREE.Mesh(geometry, material);

    const lineEdges = new THREE.EdgesGeometry(this.cubeletMesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000' });
    this.lineMesh = new THREE.LineSegments(lineEdges, lineMaterial);

    this.cubeletGroup.add(this.cubeletMesh);
    this.cubeletGroup.add(this.lineMesh);
    this.cubeletGroup.position.x = xOffset;
    this.cubeletGroup.position.y = yOffset;
    this.cubeletGroup.position.z = zOffset;
  }
}
