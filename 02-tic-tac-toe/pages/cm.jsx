import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function CM() {
  const codeArray = [
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

const test = new SceneInit("myThreeJsCanvas");
test.initScene();
test.animate();

const ticTacToe = new TicTacToe();
test.scene.add(ticTacToe.board);

class TicTacToe {
  constructor() {
    this.board = new THREE.Group();
    this.boardLines = new THREE.Group();
    this.board.add(this.boardLines);
    this._createBoard();
  }

  _createBoard() {
    // vertical board lines
    const left = this._boardLine(4, 64, 4, -12, 0);
    const right = this._boardLine(4, 64, 4, 12, 0);
    this.boardLines.add(left);
    this.boardLines.add(right);

    // horizontal board lines
    const top = this._boardLine(64, 4, 4, 0, 12);
    const bottom = this._boardLine(64, 4, 4, 0, -12);
    this.boardLines.add(top);
    this.boardLines.add(bottom);
  }

  _boardLine(x, y, z, xOffset, yOffset) {
    const boardLineGeometry = new THREE.BoxGeometry(x, y, z);
    const boardLineMaterial = new THREE.MeshNormalMaterial();
    const boardLine = new THREE.Mesh(boardLineGeometry, boardLineMaterial);
    boardLine.position.x = xOffset;
    boardLine.position.y = yOffset;
    boardLine.scale.x = 0;
    boardLine.scale.y = 0;
    boardLine.scale.z = 0;
    return boardLine;
  }
}
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

const ticTacToe = new TicTacToe();
test.scene.add(ticTacToe.board);

const scaleUp = (obj) => {
  if (obj.scale.x < 1) {
    obj.scale.x += 0.04;
  }
  if (obj.scale.y < 1) {
    obj.scale.y += 0.04;
  }
  if (obj.scale.z < 1) {
    obj.scale.z += 0.04;
  }
};

const animate = () => {
  ticTacToe.boardLines.children.forEach(scaleUp);
  requestAnimationFrame(animate);
};
animate();
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

class TicTacToe {
  constructor() {
    this.board = new THREE.Group();
    this.boardLines = new THREE.Group();
    this.hiddenTiles = new THREE.Group();

    this.board.add(this.boardLines);
    this.board.add(this.hiddenTiles);

    this._createBoard();
  }

  _createBoard() {
    // build board...

    // hidden tiles - top row
    this.hiddenTiles.add(this._hiddenTile(-24, 24));
    this.hiddenTiles.add(this._hiddenTile(0, 24));
    this.hiddenTiles.add(this._hiddenTile(24, 24));

    // hidden tiles - middle row
    this.hiddenTiles.add(this._hiddenTile(-24, 0));
    this.hiddenTiles.add(this._hiddenTile(0, 0));
    this.hiddenTiles.add(this._hiddenTile(24, 0));

    // hidden tiles - bottom row
    this.hiddenTiles.add(this._hiddenTile(-24, -24));
    this.hiddenTiles.add(this._hiddenTile(0, -24));
    this.hiddenTiles.add(this._hiddenTile(24, -24));
  }

  _hiddenTile(xOffset, yOffset) {
    const hiddenTileGeometry = new THREE.BoxGeometry(12, 12, 1);
    // NOTE: Create hidden mesh for ray casting.
    // const hiddenTileMaterial = new THREE.MeshNormalMaterial();
    const hiddenTileMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const hiddenTile = new THREE.Mesh(hiddenTileGeometry, hiddenTileMaterial);
    hiddenTile.position.x = xOffset;
    hiddenTile.position.y = yOffset;
    return hiddenTile;
  }
}
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

window.addEventListener("mousedown", onMouseDown, false);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseDown(event) {
  mouse.x = (event.clientX / window.clientWidth) * 2 - 3;
  mouse.y = -(event.clientY / window.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, test.camera);
  const intersects = raycaster.intersectObjects(
    ticTacToe.hiddenTiles.children
  );
  if (intersects.length > 0) {
    const index = ticTacToe.hiddenTiles.children.findIndex(
      (c) => c.uuid === intersects[0].object.uuid
    );
    ticTacToe.hiddenTiles.children.splice(index, 1);
  }
}
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

class TicTacToe {
  constructor() {
    // ...
    this.circles = new THREE.Group();
    this.crosses = new THREE.Group();

    this.board.add(this.circles);
    this.board.add(this.crosses);

    // handle additional data
    this.currentPlayer = "o";
    this.boardCopy = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];

    this._createBoard();
  }

  addCrossOrCircle(xOffset, yOffset) {
    if (this.currentPlayer === "x") {
      this._addCross(xOffset, yOffset);
      this._updateBoardCopy(xOffset, yOffset);
      this.currentPlayer = "o";
    } else {
      this._addCircle(xOffset, yOffset);
      this._updateBoardCopy(xOffset, yOffset);
      this.currentPlayer = "x";
    }
  }
}

function onMouseDown(event) {
  // get mouse intersection...
  if (intersects.length > 0) {
    const xOffset = intersects[0].object.position.x;
    const yOffset = intersects[0].object.position.y;
    ticTacToe.addCrossOrCircle(xOffset, yOffset);
    const index = ticTacToe.hiddenTiles.children.findIndex(
      (c) => c.uuid === intersects[0].object.uuid
    );
    ticTacToe.hiddenTiles.children.splice(index, 1);
  }
}
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev


function onMouseDown(event) {
  // get mouse intersection...
  if (intersects.length > 0) {
    const xOffset = intersects[0].object.position.x;
    const yOffset = intersects[0].object.position.y;
    ticTacToe.addCrossOrCircle(xOffset, yOffset);
    ticTacToe.checkWinConditions();
    const index = ticTacToe.hiddenTiles.children.findIndex(
      (c) => c.uuid === intersects[0].object.uuid
    );
    ticTacToe.hiddenTiles.children.splice(index, 1);
  }
}


class TicTacToe {
  // constructor ...
  // helpers...
  checkWinConditions() {
    let strike;

    for (let n = 0; n < 3; n++) {
      if (this._checkRowWin(n)) {
        strike = this._getStrike(64, 2, 4);
        strike.position.y = this._getOffsetY(n);
        this.winLine.add(strike);
      }
      // check columns...
    }
    // check diagonals...
  }

  _checkRowWin(i) {
    return (
      this.boardCopy[i][0] === this.boardCopy[i][1] &&
      this.boardCopy[i][1] === this.boardCopy[i][2]
    );
  }

  _getStrike(x, y, z) {
    const strikeGeometry = new THREE.BoxGeometry(x, y, z);
    const strikeMaterial = new THREE.MeshNormalMaterial();
    const strike = new THREE.Mesh(strikeGeometry, strikeMaterial);
    strike.scale.x = 0;
    strike.scale.y = 0;
    strike.scale.z = 0;
    return strike;
  }
}
`,
    `


// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev


`,
  ];

  const startingIndex = 6;
  const [index, setIndex] = useState(startingIndex);
  const [code, setCode] = useState(codeArray[startingIndex]);

  const prevCode = () => {
    if (index === 0) {
      return;
    } else {
      const i = index;
      setCode(codeArray[i - 1]);
      setIndex(i - 1);
    }
  };

  const nextCode = () => {
    if (index === codeArray.length - 1) {
      return;
    } else {
      const i = index;
      setCode(codeArray[i + 1]);
      setIndex(i + 1);
    }
  };

  return (
    <div className="h-full text-2xl">
      <div className="absolute flex p-0.5 space-x-2 right-4">
        <button
          className="px-1 rounded bg-black text-white z-10"
          onClick={prevCode}
        >
          Prev
        </button>
        <button
          className="px-1 rounded bg-black text-white z-10"
          onClick={nextCode}
        >
          Next
        </button>
      </div>
      <CodeMirror
        value={code}
        height="100%"
        theme="light"
        extensions={[javascript()]}
        onChange={(value, viewUpdate) => {
          console.log("value:", value);
          setCode(value);
        }}
        className="h-full"
      />
    </div>
  );
}
