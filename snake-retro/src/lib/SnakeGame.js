import * as THREE from 'three';

export default class SnakeGame {
  constructor() {
    // Board info.
    this.boardSize = 8;
    this.boardScale = 5;

    // NOTE: This group 'g' will contain the entire snake game.
    this.g = new THREE.Group();

    this.resetBoard();
    // const geometry = new THREE.BoxGeometry(16, 16, 16);
    // const material = new THREE.MeshNormalMaterial();
    // const mesh = new THREE.Mesh(geometry, material);
    // this.g.add(mesh);
  }

  resetBoardScale() {
    this.boardGroup.scale.set(
      this.boardScale,
      this.boardScale,
      this.boardScale
    );
  }

  resetBoard() {
    if (this.boardGroup && this.boardGroup.children.length > 0) {
      this.boardGroup.clear();
    } else {
      this.boardGroup = new THREE.Group();
    }
    this.resetBoardScale();
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        const boardTile = new THREE.Mesh(geometry, material);
        boardTile.position.x = i - this.boardSize / 2 + 0.5;
        boardTile.position.y = j - this.boardSize / 2 + 0.5;
        this.boardGroup.add(boardTile);
      }
    }
    this.g.add(this.boardGroup);
  }
}
