import * as Three from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

export default class FranticArchitect {
  constructor(scene) {
    this.scene = scene;
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -10, 0) });

    this.size = 1;
    this.sizeVec = new CANNON.Vec3(
      this.size * 0.5,
      this.size * 0.5,
      this.size * 0.5
    );
    this.shape = new CANNON.Box(this.sizeVec);
    this.currentTime = 0;

    this._addGround();

    // this.gg = new Three.Group();
    // this._initGame();
  }

  loop(dt) {
    this.world.fixedStep();
    this.currentTime += dt;
    if (this.currentTime > 1) {
      // run update
    }
  }

  _addGround() {
    const groundMaterial = new CANNON.Material('ground');
    groundMaterial.friction = 0.5;
    const groundShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.5, 1.5));
    const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(0, 0, 0);
    groundBody.position.set(0, -2, 0);
    this.world.addBody(groundBody);
  }

  _initGame() {
    const boxGeometry = new Three.BoxGeometry(16, 16, 16);
    const boxMaterial = new Three.MeshNormalMaterial();
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
    this.gg.add(boxMesh);
  }
}
