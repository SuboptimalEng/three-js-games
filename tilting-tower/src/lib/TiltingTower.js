import * as THREE from 'three';

export default class Highrise {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    const baseGeometry = new THREE.BoxGeometry(3, 1, 3);
    const baseMaterial = new THREE.MeshNormalMaterial({
      opacity: 0.5,
      transparent: true,
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -1;

    this.timeStep = 500;
    this.prevBlock = mesh;

    // TODO: What happens when this value is larger than int size?
    // Need to reset time to 0, Jon Blow mentions this in "A Shader Trick".
    // cos(freq * 1000 * 2 * pi) for shader fix.
    this.lastTimeStep = 0;

    this.group = new THREE.Group();
    this.group.add(mesh);
    this.group.add(baseMesh);
  }

  _generateBlock() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = this.phantomPosition.x;
    mesh.position.y = this.phantomPosition.y;
    mesh.position.z = this.phantomPosition.z;
    this.prevBlock = mesh;
    this.group.add(mesh);
  }

  acceptPhantomBlock(currentTime) {
    this.lastTimeStep = currentTime;

    this._generateBlock();
  }

  loop(t) {
    const dt = t - this.lastTimeStep;
    if (dt > this.timeStep) {
      this.lastTimeStep = t;
      this.phantomPosition = this._generatePhantomBlockPosition();
      this._displayPhantomBlock(this.phantomPosition);
    }
  }

  _displayPhantomBlock({ x, y, z }) {
    this.group.remove(this.phantomBlock);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    this.phantomBlock = mesh;
    this.group.add(this.phantomBlock);
  }

  // TODO: Always place the phantom block in a different position.
  _generatePhantomBlockPosition() {
    let x = this.prevBlock.position.x;
    let y = this.prevBlock.position.y;
    let z = this.prevBlock.position.z;

    // choose between x, y, or z axes
    const axis = Math.round(Math.random() * 3);
    // move in positive or negative direction
    const direction = Math.round(Math.random() * 2);

    if (axis === 0) {
      x = direction === 0 ? x - 1 : x + 1;
    } else if (axis === 1) {
      y = direction === 0 ? y - 1 : y + 1;
    } else {
      z = direction === 0 ? z - 1 : z + 1;
    }

    return { x, y, z };
  }
}
