import * as THREE from 'three';

export default class Highrise {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);

    this.timeStep = 500;
    this.prevBlock = mesh;

    // TODO: What happens when this value is larger than int size?
    this.lastTimeStep = 0;

    this.group = new THREE.Group();
    this.group.add(mesh);
  }

  addPhantomBlock({ x, y, z }) {
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

  getPhantomBlockXYZ() {
    let x = this.prevBlock.position.x;
    let y = this.prevBlock.position.y;
    let z = this.prevBlock.position.z;

    // choose between x, y, or z axes
    const axis = Math.round(Math.random() * 3);
    // move in positive or negative direction
    const direction = Math.round(Math.random() * 2);

    if (axis === 0) {
      if (direction === 0) {
        x--;
      } else {
        x++;
      }
    } else if (axis === 1) {
      if (direction === 0) {
        y--;
      } else {
        y++;
      }
    } else {
      if (direction === 0) {
        z--;
      } else {
        z++;
      }
    }

    return { x, y, z };
  }

  loop(t) {
    const dt = t - this.lastTimeStep;
    if (dt > this.timeStep) {
      // remove old phantom block
      this.lastTimeStep = t;
      const position = this.getPhantomBlockXYZ();
      this.addPhantomBlock(position);
      // console.log(Math.round(t / 1000));
      // console.log(this.lastTimeStep);
      // create new phantom block
    }
  }
}
