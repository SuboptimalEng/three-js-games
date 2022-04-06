import * as Three from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

export default class FranticArchitect {
  constructor(scene) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.scene = scene;
    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -10, 0) });

    this.currentTime = 0;

    this._addGround();
    this._addCompoundBody();

    // this.gg = new Three.Group();
    // this._initGame();
  }

  update(dt) {
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
    groundBody.position.set(0, -1, 0);
    this.world.addBody(groundBody);
  }

  _updateCenterOfMass(body) {
    // first calculate the center of mass
    const com = new CANNON.Vec3();
    // console.log(com);
    // debugger;
    body.shapeOffsets.forEach(function (offset) {
      com.vadd(offset, com);
    });
    // console.log(com);
    com.scale(1 / body.shapes.length, com);
    // console.log(com);
    // move the shapes so the body origin is at the COM
    body.shapeOffsets.forEach(function (offset) {
      console.log(offset);
      offset.vsub(com, offset);
    });
    // now move the body so the shapes' net displacement is 0
    const worldCOM = new CANNON.Vec3();
    body.vectorToWorldFrame(com, worldCOM);
    body.position.vadd(worldCOM, body.position);
  }

  _addCompoundBody() {
    const size = 1;
    const mass = 10;
    const shape = new CANNON.Box(
      new CANNON.Vec3(size * 0.5, size * 0.5, size * 0.5)
    );
    const slipperyMaterial = new CANNON.Material('slippery');
    slipperyMaterial.friction = 0.01;

    this.compoundBody = new CANNON.Body({ mass, material: slipperyMaterial });
    this.compoundBody.position.set(0, 0, 0);
    this.compoundBody.quaternion.setFromEuler(0, 0, 0);

    this.compoundBody.addShape(shape, new CANNON.Vec3(this.x, this.y, this.z));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(-size, 0, 0));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -size));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -2 * size));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -3 * size));
    // this.compoundBody.addShape(shape, new CANNON.Vec3(0, 0, -4 * size));

    this.world.addBody(this.compoundBody);
  }

  onKeyDown(event) {
    if (event.code === 'Space') {
      console.log('Space');
    }
  }

  _initGame() {
    const boxGeometry = new Three.BoxGeometry(16, 16, 16);
    const boxMaterial = new Three.MeshNormalMaterial();
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
    this.gg.add(boxMesh);
  }
}
