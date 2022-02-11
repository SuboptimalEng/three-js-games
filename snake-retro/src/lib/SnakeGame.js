import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

export default class SnakeGame {
  constructor() {
    // NOTE: Changeable game constants.
    this.gameScale = 4;
    this.boardSize = 8;
    this.snakeSpeed = 1;
    this.snakeStarterLength = 4;

    // NOTE: Game management constants.
    this.lastTimeStamp = 0;
    this.loopTimeStep = 500;
    this.tweenTimeStep = 250;
    this.lastPressedKey = 'w';

    // NOTE: 'boardGroup' is a wrapper for the board tiles.
    // NOTE: It is helpful to use a groups to keep track of common structures.
    // NOTE: E.g. This group makes it easy to reset the board + change its scale.
    // TODO: Remove board? I don't use it in the app.
    this.boardGroup = new THREE.Group();

    // NOTE: 'snakeGroup' contains all the snake parts.
    this.snakeGroup = new THREE.Group();

    // NOTE: 'snackGroup' contains snacks to make the snake bigger.
    this.snackGroup = new THREE.Group();

    // NOTE: This group 'snakeGameGroup' will contain the entire snake game.
    this.sgg = new THREE.Group();
    // this.sgg.add(this.boardGroup);
    this.sgg.add(this.snakeGroup);
    this.sgg.add(this.snackGroup);
    this.sgg.scale.set(this.gameScale, this.gameScale, this.gameScale);

    this.resetBoard();
    this.resetSnake();
    this.resetSnack();
  }

  loop(t) {
    TWEEN.update(t);
    const timeStep = t - this.lastTimeStamp;
    if (timeStep > this.loopTimeStep) {
      this.moveSnake();
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

  almostEqual(a, b) {
    const epsilon = 0.25;
    return Math.abs(a - b) < epsilon;
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

    // NOTE: Keep track of the last part of the snake
    // incase we need to add an extra part at the end.
    const lastChildIndex = this.snakeGroup.children.length - 1;
    const lastSnakePartCoords = {
      x: this.snakeGroup.children[lastChildIndex].position.x,
      y: this.snakeGroup.children[lastChildIndex].position.y,
    };

    const upKeys = ['w', 'ArrowUp'];
    const leftKeys = ['a', 'ArrowLeft'];
    const downKeys = ['s', 'ArrowDown'];
    const rightKeys = ['d', 'ArrowRight'];

    if (upKeys.includes(lastPressedKey)) {
      newCoords.y = oldHeadYCoord + this.snakeSpeed;
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

    // Check if x, y coordinates of head of snake are super close to
    // the snack's coordinates. If so, then the snack should be reset.
    // TODO: Extend snake length.

    const snack = this.snackGroup.children[0];
    if (
      this.almostEqual(newCoords.x, snack.position.x) &&
      this.almostEqual(newCoords.y, snack.position.y)
    ) {
      this.resetSnack();
      this.extendSnake(lastSnakePartCoords);
    }
  }

  extendSnake(lastSnakePartCoords) {
    const snakePartGeometry = new THREE.BoxGeometry(1, 1, 1);
    const snakePartMaterial = new THREE.MeshNormalMaterial();
    const snakePart = new THREE.Mesh(snakePartGeometry, snakePartMaterial);

    snakePart.position.x = lastSnakePartCoords.x;
    snakePart.position.y = lastSnakePartCoords.y;
    this.snakeGroup.add(snakePart);
  }

  updateScale() {
    this.sgg.scale.set(this.gameScale, this.gameScale, this.gameScale);
  }

  getRandomXY() {
    const x =
      Math.ceil(Math.random() * this.boardSize) - 0.5 - this.boardSize / 2;
    const y =
      Math.ceil(Math.random() * this.boardSize) - 0.5 - this.boardSize / 2;

    return { x, y };
  }

  snakePartsOnSnack(snakePartsXY, snackXY) {
    return snakePartsXY.some((snakePartXY) => {
      return (
        this.almostEqual(snakePartXY.x, snackXY.x) &&
        this.almostEqual(snakePartXY.y, snackXY.y)
      );
    });
  }

  resetSnack() {
    this.clearSnackGroup();

    // Get a list of coordinates where the snake is already over
    // to ensure that the new snack is not placed over the snake.
    const snakePartsXY = [];
    this.snakeGroup.children.forEach((snakePart) => {
      snakePartsXY.push({
        x: snakePart.position.x,
        y: snakePart.position.y,
      });
    });

    let snackXY = this.getRandomXY();
    while (this.snakePartsOnSnack(snakePartsXY, snackXY)) {
      snackXY = this.getRandomXY();
    }

    const geometry = new THREE.SphereGeometry(0.5);
    const material = new THREE.MeshNormalMaterial();
    const snack = new THREE.Mesh(geometry, material);
    snack.position.x = snackXY.x;
    snack.position.y = snackXY.y;

    this.snackGroup.add(snack);
  }

  resetSnake() {
    this.clearSnakeGroup();

    for (let i = 0; i < this.snakeStarterLength; i++) {
      const snakePartGeometry = new THREE.BoxGeometry(1, 1, 1);
      const snakePartMaterial = new THREE.MeshNormalMaterial();
      const snakePart = new THREE.Mesh(snakePartGeometry, snakePartMaterial);

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

  clearSnackGroup() {
    this.snackGroup.clear();
  }

  clearSnakeGroup() {
    this.snakeGroup.clear();
  }

  clearBoardGroup() {
    this.boardGroup.clear();
  }
}
