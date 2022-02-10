import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

export default class SnakeGame {
  constructor() {
    // NOTE: Changeable game constants.
    this.gameScale = 4;
    this.boardSize = 12;
    this.snakeSpeed = 1;
    this.snakeStarterLength = 4;

    // NOTE: Game management constants.
    this.lastTimeStamp = 0;
    this.loopTimeStep = 500;
    this.tweenTimeStep = 250;
    this.lastPressedKey = 'w';

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

  loop(t) {
    TWEEN.update(t);
    const timeStep = t - this.lastTimeStamp;
    if (timeStep > this.loopTimeStep) {
      this.moveSnake();
      // this._updateSnack();
      this.lastTimeStamp = t;
    }
  }

  animateSnakeMovement(oldCoords, newCoords) {
    for (let i = 0; i < this.snakeGroup.children.length; i++) {
      // NOTE: The head of snake is pre-determined from user input.
      if (i !== 0) {
        newCoords = { x: oldCoords.x, y: oldCoords.y };
        oldCoords = {
          x: this.snakeGroup.children[i].position.x,
          y: this.snakeGroup.children[i].position.y,
        };
      }
      // this.snakeGroup.children[i].position.x = newCoords.x;
      // this.snakeGroup.children[i].position.y = newCoords.y;
      const tween = new TWEEN.Tween(oldCoords)
        .to(newCoords, this.tweenTimeStep)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(({ x, y }) => {
          this.snakeGroup.children[i].position.x = x;
          this.snakeGroup.children[i].position.y = y;
        });
      tween.start();
    }
  }

  pressKey(event) {
    this.lastPressedKey = event.key;
  }

  moveSnake() {
    const lastPressedKey = this.lastPressedKey;

    const oldHeadXCoord = this.snakeGroup.children[0].position.x;
    const oldHeadYCoord = this.snakeGroup.children[0].position.y;

    const oldCoords = {
      x: oldHeadXCoord,
      y: oldHeadYCoord,
    };
    const newCoords = {
      x: oldHeadXCoord,
      y: oldHeadYCoord,
    };

    const upKeys = ['w', 'ArrowUp'];
    const leftKeys = ['a', 'ArrowLeft'];
    const downKeys = ['s', 'ArrowDown'];
    const rightKeys = ['d', 'ArrowRight'];

    if (upKeys.includes(lastPressedKey)) {
      newCoords.y += this.snakeSpeed;
      this.animateSnakeMovement(oldCoords, newCoords);
    } else if (leftKeys.includes(lastPressedKey)) {
      newCoords.x = oldHeadXCoord - this.snakeSpeed;
      this.animateSnakeMovement(oldCoords, newCoords);
    } else if (downKeys.includes(lastPressedKey)) {
      newCoords.y = oldHeadYCoord - this.snakeSpeed;
      this.animateSnakeMovement(oldCoords, newCoords);
    } else if (rightKeys.includes(lastPressedKey)) {
      newCoords.x = oldHeadXCoord + this.snakeSpeed;
      this.animateSnakeMovement(oldCoords, newCoords);
    }
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

      snakePart.position.x = this.snakeStarterLength / 2 - 0.5 - i;
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
