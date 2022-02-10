import * as THREE from 'three';

export default class SnakeGame {
  constructor() {
    // NOTE: Changeable game constants.
    this.gameScale = 4;
    this.boardSize = 12;
    this.snakeStarterLength = 4;

    // NOTE: This 'boardGroup' is a wrapper for the board tiles.
    // NOTE: It is helpful to use a groups to keep track of common structures.
    // NOTE: E.g. This group makes it easy to reset the board + change its scale.
    this.boardGroup = new THREE.Group();

    // NOTE: This 'snakeGroup' contains all the snake parts.
    this.snakeGroup = new THREE.Group();

    // NOTE: This group 'snakeGameGroup' will contain the entire snake game.
    this.sgg = new THREE.Group();
    this.sgg.add(this.boardGroup);
    this.sgg.add(this.snakeGroup);
    this.updateScale();

    this.resetBoard();
    this.resetSnake();
  }

  clearSnakeGroup() {
    this.snakeGroup.clear();
  }

  clearBoardGroup() {
    this.boardGroup.clear();
  }

  updateScale() {
    this.sgg.scale.set(this.gameScale, this.gameScale, this.gameScale);
  }

  resetSnake() {
    this.clearSnakeGroup();

    for (let i = 0; i < this.snakeStarterLength; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshNormalMaterial({ wireframe: false });
      const snakePart = new THREE.Mesh(geometry, material);

      snakePart.position.x = i - this.snakeStarterLength / 2 - 0.5;
      snakePart.position.y = -0.5;
      this.snakeGroup.add(snakePart);
    }
  }

  resetBoard() {
    this.clearBoardGroup();

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
