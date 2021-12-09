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
    for (let i = 0; i < this.snake.children.length; i++) {
      // note: head of snake is pre-determined from user input
      if (i !== 0) {
        newCoords = { x: oldCoords.x, y: oldCoords.y };
        oldCoords = {
          x: this.snake.children[i].position.x,
          y: this.snake.children[i].position.y,
        };
      }
      const tween = new TWEEN.Tween(oldCoords)
        .to(newCoords, this.tweenTimeStep)
        .easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(({ x, y }) => {
          this.snake.children[i].position.x = x;
          this.snake.children[i].position.y = y;
        });
      tween.start();
    }
  }

  _moveSnake() {
    const key = this.lastPressedKey;
    const oldHeadXCoord = this.snake.children[0].position.x;
    const oldHeadYCoord = this.snake.children[0].position.y;
    const oldCoords = {
      x: oldHeadXCoord,
      y: oldHeadYCoord,
    };
    const newCoords = {
      x: oldHeadXCoord,
      y: oldHeadYCoord,
    };

    if (key === "w" || key === "ArrowUp") {
      newCoords.y = oldHeadYCoord + this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    } else if (key === "a" || key === "ArrowLeft") {
      newCoords.x = oldHeadXCoord - this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    } else if (key === "s" || key === "ArrowDown") {
      newCoords.y = oldHeadYCoord - this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    } else if (key === "d" || key === "ArrowRight") {
      newCoords.x = oldHeadXCoord + this.snakeSpeed;
      this._animateSnakeMovement(oldCoords, newCoords);
    }
  }

  _createSnake() {
    const snakeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const snakeMaterial = new THREE.MeshNormalMaterial();
    const snakeMesh = new THREE.Mesh(snakeGeometry, snakeMaterial);
    snakeMesh.position.z = 1;
    const sm = new THREE.Mesh(snakeGeometry, snakeMaterial);
    sm.position.z = 1;
    sm.position.x = -1;
    const sm2 = new THREE.Mesh(snakeGeometry, snakeMaterial);
    sm2.position.z = 1;
    sm2.position.x = -2;
    const sm3 = new THREE.Mesh(snakeGeometry, snakeMaterial);
    sm3.position.z = 1;
    sm3.position.x = -3;
    this.snake.add(snakeMesh, sm, sm2, sm3);
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
