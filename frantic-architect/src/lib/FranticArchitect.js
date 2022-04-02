import * as Three from 'three';
import * as Cannon from 'cannon-es';

export default class FranticArchitect {
  constructor() {
    this.gg = new Three.Group();

    this._initGame();

    // this.world = new Cannon.World({
    //   gravity: new Cannon.Vec3(0, -10, 0),
    // });
    // // add ground
    // const groundBody = new Cannon.Body({
    //   type: Cannon.Body.STATIC,
    //   shape: new Cannon.Plane(),
    // });
    // groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
    // groundBody.position.set(0, -3, 0);
    // this.world.addBody(groundBody);
    // const size = 2;
    // const mass = 10;
    // const compoundBody = new Cannon.Body({ mass });
    // compoundBody.position.set(0, 0, 0);
    // compoundBody.quaternion.setFromEuler(0, 0, 0);
    // const shape = new Cannon.Box(
    //   new Cannon.Vec3(size * 0.5, size * 0.5, size * 0.5)
    // );
    // compoundBody.addShape(shape, new Cannon.Vec3(0, 0, 0));
    // compoundBody.addShape(shape, new Cannon.Vec3(-size, 0, 0));
    // compoundBody.addShape(shape, new Cannon.Vec3(size, 0, 0));
    // this.world.addBody(compoundBody);
  }

  _initGame() {
    const boxGeometry = new Three.BoxGeometry(16, 16, 16);
    const boxMaterial = new Three.MeshNormalMaterial();
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
    this.gg.add(boxMesh);
  }
}
