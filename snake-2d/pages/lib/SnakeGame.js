import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default class SnakeGame {
  constructor(testScene) {
    this.boardSize = 16;
    this.snakeSpeed = 1;

    this.lastTimeStamp = 0;
    this.loopTimeStep = 500;
    this.tweenTimeStep = 250;
    this.lastPressedKey = "w";

    this.snake = new THREE.Group();
    this.tileMap = new THREE.Group();

    this._createSnake();
    this._createTileMap();

    testScene.add(this.snake);
    testScene.add(this.tileMap);
  }

  loop(t) {
    TWEEN.update(t);
    const timeStep = t - this.lastTimeStamp;
    if (timeStep > this.loopTimeStep) {
      this._moveSnake();
      this.lastTimeStamp = t;
    }
  }

  _animateSnakeMovement(oldCoords, newCoords) {
    const tween = new TWEEN.Tween(oldCoords)
      .to(newCoords, this.tweenTimeStep)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ x, y }) => {
        this.snake.position.x = x;
        this.snake.position.y = y;
      });
    tween.start();
  }

  _moveSnake() {
    const key = this.lastPressedKey;
    const oldXCoord = this.snake.position.x;
    const oldYCoord = this.snake.position.y;
    const oldCoords = { x: oldXCoord, y: oldYCoord };
    const newCoords = { x: oldXCoord, y: oldYCoord };

    if (key === "w" || key === "ArrowUp") {
      newCoords.y = oldYCoord + this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    } else if (key === "a" || key === "ArrowLeft") {
      newCoords.x = oldXCoord - this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    } else if (key === "s" || key === "ArrowDown") {
      newCoords.y = oldYCoord - this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    } else if (key === "d" || key === "ArrowRight") {
      newCoords.x = oldXCoord + this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    }
  }

  _createSnake() {
    const snakeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const snakeMaterial = new THREE.MeshNormalMaterial();
    const snakeMesh = new THREE.Mesh(snakeGeometry, snakeMaterial);
    snakeMesh.position.z = 1;
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
