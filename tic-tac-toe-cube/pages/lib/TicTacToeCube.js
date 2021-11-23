import * as THREE from "three";

export default class TicTacToeCube {
  constructor() {
    this.board = new THREE.Group();
    this.spheres = new THREE.Group();
    this.asterisks = new THREE.Group();
    this.boardLines = new THREE.Group();

    this.board.add(this.spheres);
    this.board.add(this.asterisks);
    this.board.add(this.boardLines);

    this._createBoard();
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

    // testing spheres
    // this.spheres.add(this._sphere());

    // testing asterisks
    // this.asterisks.add(this._asterisk());
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

  _sphere() {
    const sphereGeometry = new THREE.SphereGeometry(8);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    return sphere;
  }

  _asterisk() {
    const asteriskGroup = new THREE.Group();
    const asteriskGeometry = new THREE.BoxGeometry(4, 16, 4);
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
    return asteriskGroup;
  }
}
