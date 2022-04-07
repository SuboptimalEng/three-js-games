import * as Three from 'three';
import * as CANNON from 'cannon-es';

export default class FranticArchitect {
  constructor() {
    // cube coordinates
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.phantomX = 0;
    this.phantomY = 0;
    this.phantomZ = 0;

    // compound body settings
    this.size = 1;
    this.mass = 10;
    this.existingBlocks = [];
    this.phantomBlockAccepted = false;

    // game loop settings
    this.gameLoopLength = 0.5;
    this.currentLoopLength = 0;

    this.world = new CANNON.World({ gravity: new CANNON.Vec3(0, -10, 0) });
    this._addGround();
    this._addCompoundBody();

    // this.gg = new Three.Group();
    // this._initGame();
  }

  update(dt) {
    this.world.fixedStep();
    this.currentLoopLength += dt;
    if (this.currentLoopLength > this.gameLoopLength) {
      this.currentLoopLength = 0;
      this._displayPhantomBlock();
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

  _updateCenterOfMass() {
    // first calculate the center of mass
    const com = new CANNON.Vec3();
    // console.log(com);
    // debugger;
    this.compoundBody.shapeOffsets.forEach(function (offset) {
      com.vadd(offset, com);
    });
    // console.log(com);
    com.scale(1 / this.compoundBody.shapes.length, com);
    // console.log(com);
    // move the shapes so the body origin is at the COM
    this.compoundBody.shapeOffsets.forEach(function (offset) {
      console.log(offset);
      offset.vsub(com, offset);
    });
    // now move the body so the shapes' net displacement is 0
    const worldCOM = new CANNON.Vec3();
    this.compoundBody.vectorToWorldFrame(com, worldCOM);
    this.compoundBody.position.vadd(worldCOM, this.compoundBody.position);
  }

  _randomizePhantomXYZ() {
    this._resetPhantomXYZ();
    const r = () => {
      const axis = Math.floor(Math.random() * 3);
      const direction = Math.floor(Math.random() * 2);
      const delta = direction === 0 ? 1 : -1;
      if (axis === 0) {
        this.phantomX += delta;
      } else if (axis === 1) {
        if (this.y <= 0.1) {
          this.phantomY = 1;
        } else {
          this.phantomY += delta;
        }
      } else {
        this.phantomZ += delta;
      }
    };
    r();
    const blockAlreadyExists = () => {
      return this.existingBlocks.some((block) => {
        return (
          block.x === this.phantomX &&
          block.y === this.phantomY &&
          block.z === this.phantomZ
        );
      });
    };
    while (blockAlreadyExists()) {
      this._resetPhantomXYZ();
      r();
    }
  }

  _displayPhantomBlock() {
    this._randomizePhantomXYZ();
    this._addShapeToCompoundBody();
  }

  _addShapeToCompoundBody() {
    if (this.phantomBlockAccepted) {
      this.phantomBlockAccepted = false;
      console.log(this.existingBlocks);
    } else {
      // NOTE: This fails with a warning on the first run.
      this.compoundBody.removeShape(this.phantomShape);
    }
    this.phantomShape = new CANNON.Box(
      new CANNON.Vec3(this.size * 0.5, this.size * 0.5, this.size * 0.5)
    );
    const xOffset = this.compoundBody.shapeOffsets[0].x;
    const yOffset = this.compoundBody.shapeOffsets[0].y;
    const zOffset = this.compoundBody.shapeOffsets[0].z;
    this.compoundBody.addShape(
      this.phantomShape,
      new CANNON.Vec3(
        this.phantomX * this.size + xOffset,
        this.phantomY * this.size + yOffset,
        this.phantomZ * this.size + zOffset
      )
    );
  }

  _resetPhantomXYZ() {
    this.phantomX = this.x;
    this.phantomY = this.y;
    this.phantomZ = this.z;
  }

  _updateXYZ() {
    this.x = this.phantomX;
    this.y = this.phantomY;
    this.z = this.phantomZ;
  }

  _addExistingBlock() {
    this.existingBlocks.push({ x: this.x, y: this.y, z: this.z });
  }

  acceptPhantomBlock() {
    this._updateXYZ();
    this._addExistingBlock();
    this._updateCenterOfMass();
    this.phantomBlockAccepted = true;
    this.currentLoopLength = this.gameLoopLength + 1;
  }

  _addCompoundBody() {
    const shape = new CANNON.Box(
      new CANNON.Vec3(this.size * 0.5, this.size * 0.5, this.size * 0.5)
    );
    const slipperyMaterial = new CANNON.Material('slippery');
    slipperyMaterial.friction = 0.01;

    this.compoundBody = new CANNON.Body({
      mass: this.mass,
      material: slipperyMaterial,
    });
    this.compoundBody.position.set(0, 0, 0);
    this.compoundBody.quaternion.setFromEuler(0, 0, 0);

    this.compoundBody.addShape(shape, new CANNON.Vec3(this.x, this.y, this.z));
    this._addExistingBlock();
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
      this._acceptPhantomBlock();
    }
  }

  _initGame() {
    const boxGeometry = new Three.BoxGeometry(16, 16, 16);
    const boxMaterial = new Three.MeshNormalMaterial();
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
    this.gg.add(boxMesh);
  }
}
