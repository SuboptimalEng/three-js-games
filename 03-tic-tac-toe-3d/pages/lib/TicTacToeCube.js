import * as THREE from "three";
import { BoxGeometry, MeshNormalMaterial } from "three";

export default class TicTacToeCube {
  constructor() {
    this.board = new THREE.Group();
    this.spheres = new THREE.Group();
    this.asterisks = new THREE.Group();
    this.boardLines = new THREE.Group();
    this.hiddenCubes = new THREE.Group();
    this.winStrikes = new THREE.Group();

    this.board.add(this.spheres);
    this.board.add(this.asterisks);
    this.board.add(this.boardLines);
    this.board.add(this.hiddenCubes);
    this.board.add(this.winStrikes);

    this.currentPlayer = "sphere";
    this.boardCopy = [
      [
        // z = 24
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
      ],
      [
        // z = 0
        ["10", "11", "12"],
        ["13", "14", "15"],
        ["16", "17", "18"],
      ],
      [
        // z = -24
        ["19", "20", "21"],
        ["22", "23", "24"],
        ["25", "26", "27"],
      ],
    ];

    this._createBoard();
  }

  checkWinConditions() {
    // NOTE: check rows and columns
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this._checkXRow(i, j)) {
          this._addStrike(
            64,
            2,
            2,
            0,
            this._getYOffset(j),
            this._getZOffset(i),
            0,
            0,
            0
          );
        }
        if (this._checkZRow(i, j)) {
          this._addStrike(
            2,
            2,
            64,
            this._getXOffset(i),
            this._getYOffset(j),
            0,
            0,
            0,
            0
          );
        }
        if (this._checkYRow(i, j)) {
          this._addStrike(
            2,
            64,
            2,
            this._getXOffset(j),
            0,
            this._getZOffset(i),
            0,
            0,
            0
          );
        }
      }
    }

    // NOTE: check 2-axis diagonals
    const rad = Math.PI / 4;
    for (let i = 0; i < 3; i++) {
      if (this._checkDiagonalXYPos(i)) {
        this._addStrike(84, 2, 2, 0, 0, this._getZOffset(i), 0, 0, rad);
      }
      if (this._checkDiagonalXYNeg(i)) {
        this._addStrike(84, 2, 2, 0, 0, this._getZOffset(i), 0, 0, -1 * rad);
      }
      if (this._checkDiagonalXZPos(i)) {
        this._addStrike(2, 2, 84, 0, this._getYOffset(i), 0, 0, rad, 0);
      }
      if (this._checkDiagonalXZNeg(i)) {
        this._addStrike(2, 2, 84, 0, this._getYOffset(i), 0, 0, -1 * rad, 0);
      }
      if (this._checkDiagonalYZPos(i)) {
        this._addStrike(2, 84, 2, this._getXOffset(i), 0, 0, rad, 0, 0);
      }
      if (this._checkDiagonalYZNeg(i)) {
        this._addStrike(2, 84, 2, this._getXOffset(i), 0, 0, -1 * rad, 0, 0);
      }
    }

    // NOTE: check xyz diagonals
    const rot1 = Math.PI / 4;
    const rot2 = Math.PI / 5;
    if (this._fromTopLeftFrontToBottomRightBack()) {
      this._addStrike(2, 2, 100, 0, 0, 0, -1 * rot1, -1 * rot2, 0);
    }
    if (this._fromTopRightFrontToBottomLeftBack()) {
      this._addStrike(2, 2, 100, 0, 0, 0, -1 * rot1, 1 * rot2, 0);
    }
    if (this._fromTopLeftBackToBottomRightFront()) {
      this._addStrike(2, 2, 100, 0, 0, 0, 1 * rot1, 1 * rot2, 0);
    }
    if (this._fromTopRightBackToBottomLeftFront()) {
      this._addStrike(2, 2, 100, 0, 0, 0, 1 * rot1, -1 * rot2, 0);
    }
  }

  _fromTopRightBackToBottomLeftFront() {
    return (
      this.boardCopy[2][0][2] === this.boardCopy[1][1][1] &&
      this.boardCopy[1][1][1] === this.boardCopy[0][2][0]
    );
  }

  _fromTopLeftBackToBottomRightFront() {
    return (
      this.boardCopy[2][0][0] === this.boardCopy[1][1][1] &&
      this.boardCopy[1][1][1] === this.boardCopy[0][2][2]
    );
  }

  _fromTopRightFrontToBottomLeftBack() {
    return (
      this.boardCopy[0][0][2] === this.boardCopy[1][1][1] &&
      this.boardCopy[1][1][1] === this.boardCopy[2][2][0]
    );
  }

  _fromTopLeftFrontToBottomRightBack() {
    return (
      this.boardCopy[0][0][0] === this.boardCopy[1][1][1] &&
      this.boardCopy[1][1][1] === this.boardCopy[2][2][2]
    );
  }

  _checkDiagonalYZPos(i) {
    return (
      this.boardCopy[0][0][i] === this.boardCopy[1][1][i] &&
      this.boardCopy[1][1][i] === this.boardCopy[2][2][i]
    );
  }

  _checkDiagonalYZNeg(i) {
    return (
      this.boardCopy[2][0][i] === this.boardCopy[1][1][i] &&
      this.boardCopy[1][1][i] === this.boardCopy[0][2][i]
    );
  }

  _checkDiagonalXZPos(i) {
    return (
      this.boardCopy[2][i][0] === this.boardCopy[1][i][1] &&
      this.boardCopy[1][i][1] === this.boardCopy[0][i][2]
    );
  }

  _checkDiagonalXZNeg(i) {
    return (
      this.boardCopy[0][i][0] === this.boardCopy[1][i][1] &&
      this.boardCopy[1][i][1] === this.boardCopy[2][i][2]
    );
  }

  _checkDiagonalXZPos(i) {
    return (
      this.boardCopy[2][i][0] === this.boardCopy[1][i][1] &&
      this.boardCopy[1][i][1] === this.boardCopy[0][i][2]
    );
  }

  _checkDiagonalXZNeg(i) {
    return (
      this.boardCopy[0][i][0] === this.boardCopy[1][i][1] &&
      this.boardCopy[1][i][1] === this.boardCopy[2][i][2]
    );
  }

  _checkDiagonalXYPos(i) {
    return (
      this.boardCopy[i][2][0] === this.boardCopy[i][1][1] &&
      this.boardCopy[i][1][1] === this.boardCopy[i][0][2]
    );
  }

  _checkDiagonalXYNeg(i) {
    return (
      this.boardCopy[i][0][0] === this.boardCopy[i][1][1] &&
      this.boardCopy[i][1][1] === this.boardCopy[i][2][2]
    );
  }

  _addStrike(
    x,
    y,
    z,
    xOffset,
    yOffset,
    zOffset,
    xRotation,
    yRotation,
    zRotation
  ) {
    const strikeGeometry = new THREE.BoxGeometry(x, y, z);
    const strikeMaterial = new THREE.MeshNormalMaterial();
    const strike = new THREE.Mesh(strikeGeometry, strikeMaterial);
    strike.position.x = xOffset;
    strike.position.y = yOffset;
    strike.position.z = zOffset;
    strike.rotation.x = xRotation;
    strike.rotation.y = yRotation;
    strike.rotation.z = zRotation;
    strike.scale.x = 0;
    strike.scale.y = 0;
    strike.scale.z = 0;
    this.winStrikes.add(strike);
  }

  _checkXRow(i, j) {
    return (
      this.boardCopy[i][j][0] === this.boardCopy[i][j][1] &&
      this.boardCopy[i][j][1] === this.boardCopy[i][j][2]
    );
  }

  _checkYRow(i, j) {
    return (
      this.boardCopy[i][0][j] === this.boardCopy[i][1][j] &&
      this.boardCopy[i][1][j] === this.boardCopy[i][2][j]
    );
  }

  _checkZRow(i, j) {
    return (
      this.boardCopy[0][j][i] === this.boardCopy[1][j][i] &&
      this.boardCopy[1][j][i] === this.boardCopy[2][j][i]
    );
  }

  _createBoard() {
    // add vertical lines
    const verticalDimensions = { x: 4, y: 64, z: 4 };
    const verticalLeftFront = { x: -12, y: 0, z: 12 };
    const verticalLeftBack = { x: -12, y: 0, z: -12 };
    const verticalRightFront = { x: 12, y: 0, z: 12 };
    const verticalRightBack = { x: 12, y: 0, z: -12 };
    const verticalLineOffsets = [
      verticalLeftFront,
      verticalLeftBack,
      verticalRightFront,
      verticalRightBack,
    ];
    verticalLineOffsets.forEach((verticalLineOffset) => {
      const verticalBoardLine = this._boardLine({
        dimensions: verticalDimensions,
        offsets: verticalLineOffset,
      });
      this.boardLines.add(verticalBoardLine);
    });

    // add horizontal lines
    const horizontalDimensions = { x: 64, y: 4, z: 4 };
    const horizontalTopFront = { x: 0, y: 12, z: 12 };
    const horizontalTopBack = { x: 0, y: 12, z: -12 };
    const horizontalBottomFront = { x: 0, y: -12, z: 12 };
    const horizontalBottomBack = { x: 0, y: -12, z: -12 };
    const horizontalLineOffsets = [
      horizontalTopFront,
      horizontalTopBack,
      horizontalBottomFront,
      horizontalBottomBack,
    ];
    horizontalLineOffsets.forEach((horizontalLineOffset) => {
      const horizontalBoardLine = this._boardLine({
        dimensions: horizontalDimensions,
        offsets: horizontalLineOffset,
      });
      this.boardLines.add(horizontalBoardLine);
    });

    // add z-axis lines
    const zAxisDimensions = { x: 4, y: 4, z: 64 };
    const zAxisTopLeft = { x: -12, y: 12, z: 0 };
    const zAxisTopRight = { x: 12, y: 12, z: 0 };
    const zAxisBottomLeft = { x: -12, y: -12, z: 0 };
    const zAxisBottomRight = { x: 12, y: -12, z: 0 };
    const zAxisLineOffsets = [
      zAxisTopLeft,
      zAxisTopRight,
      zAxisBottomLeft,
      zAxisBottomRight,
    ];
    zAxisLineOffsets.forEach((zAxisLineOffset) => {
      const zAxisBoardLine = this._boardLine({
        dimensions: zAxisDimensions,
        offsets: zAxisLineOffset,
      });
      this.boardLines.add(zAxisBoardLine);
    });

    // add hidden cubes
    const topBackLeft = { x: -24, y: 24, z: -24 };
    const topBackMiddle = { x: 0, y: 24, z: -24 };
    const topBackRight = { x: 24, y: 24, z: -24 };
    const topMiddleLeft = { x: -24, y: 24, z: 0 };
    const topMiddleMiddle = { x: 0, y: 24, z: 0 };
    const topMiddleRight = { x: 24, y: 24, z: 0 };
    const topFrontLeft = { x: -24, y: 24, z: 24 };
    const topFrontMiddle = { x: 0, y: 24, z: 24 };
    const topFrontRight = { x: 24, y: 24, z: 24 };

    const middleBackLeft = { x: -24, y: 0, z: -24 };
    const middleBackMiddle = { x: 0, y: 0, z: -24 };
    const middleBackRight = { x: 24, y: 0, z: -24 };
    const middleMiddleLeft = { x: -24, y: 0, z: 0 };
    const middleMiddleMiddle = { x: 0, y: 0, z: 0 };
    const middleMiddleRight = { x: 24, y: 0, z: 0 };
    const middleFrontLeft = { x: -24, y: 0, z: 24 };
    const middleFrontMiddle = { x: 0, y: 0, z: 24 };
    const middleFrontRight = { x: 24, y: 0, z: 24 };

    const bottomBackLeft = { x: -24, y: -24, z: -24 };
    const bottomBackMiddle = { x: 0, y: -24, z: -24 };
    const bottomBackRight = { x: 24, y: -24, z: -24 };
    const bottomMiddleLeft = { x: -24, y: -24, z: 0 };
    const bottomMiddleMiddle = { x: 0, y: -24, z: 0 };
    const bottomMiddleRight = { x: 24, y: -24, z: 0 };
    const bottomFrontLeft = { x: -24, y: -24, z: 24 };
    const bottomFrontMiddle = { x: 0, y: -24, z: 24 };
    const bottomFrontRight = { x: 24, y: -24, z: 24 };

    const hiddenCubeOffsets = [
      topBackLeft,
      topBackMiddle,
      topBackRight,
      topMiddleLeft,
      topMiddleMiddle,
      topMiddleRight,
      topFrontLeft,
      topFrontMiddle,
      topFrontRight,

      middleBackLeft,
      middleBackMiddle,
      middleBackRight,
      middleMiddleLeft,
      middleMiddleMiddle,
      middleMiddleRight,
      middleFrontLeft,
      middleFrontMiddle,
      middleFrontRight,

      bottomBackLeft,
      bottomBackMiddle,
      bottomBackRight,
      bottomMiddleLeft,
      bottomMiddleMiddle,
      bottomMiddleRight,
      bottomFrontLeft,
      bottomFrontMiddle,
      bottomFrontRight,
    ];
    hiddenCubeOffsets.forEach((hiddenCubeOffset) => {
      const hiddenCube = this._hiddenCube({
        offsets: hiddenCubeOffset,
      });
      this.hiddenCubes.add(hiddenCube);
    });
  }

  _boardLine({ dimensions, offsets }) {
    const boardLineGeometry = new THREE.BoxGeometry(
      dimensions.x,
      dimensions.y,
      dimensions.z
    );
    const boardLineMaterial = new THREE.MeshNormalMaterial();
    const boardLine = new THREE.Mesh(boardLineGeometry, boardLineMaterial);
    boardLine.position.x = offsets.x;
    boardLine.position.y = offsets.y;
    boardLine.position.z = offsets.z;
    return boardLine;
  }

  _hiddenCube({ offsets }) {
    const cubeGeometry = new THREE.BoxGeometry(8, 8, 8);
    const cubeMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const cubeMaterial = new THREE.MeshPhongMaterial({
    //   color: "red",
    //   // wireframe: true,
    // });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = offsets.x;
    cube.position.y = offsets.y;
    cube.position.z = offsets.z;
    return cube;
  }

  _getX(x) {
    if (x === -24) {
      return 0;
    } else if (x === 0) {
      return 1;
    } else {
      return 2;
    }
  }

  _getXOffset(x) {
    if (x === 0) {
      return -24;
    } else if (x === 1) {
      return 0;
    } else {
      return 24;
    }
  }

  _getY(y) {
    if (y === 24) {
      return 0;
    } else if (y === 0) {
      return 1;
    } else {
      return 2;
    }
  }

  _getYOffset(y) {
    if (y === 0) {
      return 24;
    } else if (y === 1) {
      return 0;
    } else {
      return -24;
    }
  }

  _getZ(z) {
    if (z === 24) {
      return 0;
    } else if (z === 0) {
      return 1;
    } else {
      return 2;
    }
  }

  _getZOffset(z) {
    if (z === 0) {
      return 24;
    } else if (z === 1) {
      return 0;
    } else {
      return -24;
    }
  }

  _updateBoardCopy(offset, move) {
    const x = this._getX(offset.x);
    const y = this._getY(offset.y);
    const z = this._getZ(offset.z);

    this.boardCopy[z][y][x] = move;
  }

  addSphereOrAsterisk(offset) {
    if (this.currentPlayer === "sphere") {
      this._updateBoardCopy(offset, "o");
      const sphere = this._sphere(offset);
      this.spheres.add(sphere);
      this.currentPlayer = "asterisk";
    } else if (this.currentPlayer === "asterisk") {
      this._updateBoardCopy(offset, "x");
      const asterisk = this._asterisk(offset);
      this.asterisks.add(asterisk);
      this.currentPlayer = "sphere";
    }
  }

  _sphere(offset) {
    const sphereGeometry = new THREE.SphereGeometry(6);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = offset.x;
    sphere.position.y = offset.y;
    sphere.position.z = offset.z;
    sphere.scale.x = 0;
    sphere.scale.y = 0;
    sphere.scale.z = 0;
    return sphere;
  }

  _asterisk(offset) {
    const asteriskGroup = new THREE.Group();
    const asteriskGeometry = new THREE.BoxGeometry(4, 14, 4);
    const asteriskMaterial = new THREE.MeshNormalMaterial();
    const a1 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a2 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a3 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a4 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    const a5 = new THREE.Mesh(asteriskGeometry, asteriskMaterial);
    a2.rotation.z = Math.PI / 3;
    a2.rotation.y = Math.PI / 4;
    a3.rotation.z = -Math.PI / 3;
    a3.rotation.y = -Math.PI / 4;
    a4.rotation.z = -Math.PI / 3;
    a4.rotation.y = Math.PI / 4;
    a5.rotation.z = Math.PI / 3;
    a5.rotation.y = -Math.PI / 4;
    asteriskGroup.add(a1, a2, a3, a4, a5);
    asteriskGroup.position.x = offset.x;
    asteriskGroup.position.y = offset.y;
    asteriskGroup.position.z = offset.z;
    asteriskGroup.scale.x = 0;
    asteriskGroup.scale.y = 0;
    asteriskGroup.scale.z = 0;
    return asteriskGroup;
  }
}
