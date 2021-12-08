import * as THREE from "three";

export default class SnakeGame {
  constructor(testScene) {
    this.boardSize = 32;
    this.snakeSpeed = 0.1;
    this.lastPressedKey = "w";
    this.snake = new THREE.Group();
    this.tileMap = new THREE.Group();

    this._createSnake();
    this._createTileMap();

    testScene.add(this.snake);
    testScene.add(this.tileMap);
  }

  loop() {
    this.moveSnake();
  }

  moveSnake() {
    const key = this.lastPressedKey;
    if (key === "w") {
      this.snake.position.y += this.snakeSpeed;
    } else if (key === "a") {
      this.snake.position.x -= this.snakeSpeed;
    } else if (key === "s") {
      this.snake.position.y -= this.snakeSpeed;
    } else if (key === "d") {
      this.snake.position.x += this.snakeSpeed;
    }
  }

  _createSnake() {
    const snakeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const snakeMaterial = new THREE.MeshNormalMaterial();
    const snakeMesh = new THREE.Mesh(snakeGeometry, snakeMaterial);
    snakeMesh.position.z = 4;
    this.snake.add(snakeMesh);
  }

  _createTileMap() {
    for (let i = -this.boardSize / 2; i < this.boardSize / 2; i++) {
      for (let j = -this.boardSize / 2; j < this.boardSize / 2; j++) {
        this.tileMap.add(this._newTileMesh(i, j));
      }
    }
  }

  _newTileMesh(i, j) {
    const tileGeometry = new THREE.BoxGeometry(1, 1, 1);
    const tileMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const tileMesh = new THREE.Mesh(tileGeometry, tileMaterial);
    tileMesh.position.x = j;
    tileMesh.position.y = i;
    return tileMesh;
  }
}
