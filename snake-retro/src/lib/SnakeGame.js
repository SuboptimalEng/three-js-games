import * as THREE from 'three';

export default class SnakeGame {
  constructor() {
    // NOTE: Changeable board constants.
    this.boardSize = 8;
    this.boardScale = 5;

    // NOTE: This group 'g' will contain the entire snake game.
    this.g = new THREE.Group();

    // NOTE: This 'boardGroup' is a wrapper for the board tiles.
    // NOTE: It is helpful to use a groups to keep track of common structures.
    // NOTE: E.g. This group makes it easy to reset the board + change its scale.
    this.boardGroup = new THREE.Group();

    this.resetBoard();
  }

  resetBoardGroup() {
    this.boardGroup.clear();
  }

  resetBoardScale() {
    this.boardGroup.scale.set(
      this.boardScale,
      this.boardScale,
      this.boardScale
    );
  }

  resetBoard() {
    this.resetBoardGroup();
    this.resetBoardScale();

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        const boardTile = new THREE.Mesh(geometry, material);

        // NOTE: Position the board tiles in the center of the screen.
        boardTile.position.x = i - this.boardSize / 2 + 0.5;
        boardTile.position.y = j - this.boardSize / 2 + 0.5;
        this.boardGroup.add(boardTile);
      }
    }
  }
}
