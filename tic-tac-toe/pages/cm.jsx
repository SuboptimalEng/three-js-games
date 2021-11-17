import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function CM() {
  const codeArray = [
    `
// tic-tac-toe + javascript (three.js)

// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

// demo
// 1. create a board with "scaling" geometry
// 2. set up ray casting with "hidden boxes"
// 3. set up game with 'x' and 'o' players
// 3. keep track of board in javascript
// 4. check win conditions after every move
// 5. draw strike when someone wins
`,
    `
// index.jsx - return
// <canvas id="myThreeJsCanvas" />

// index.jsx - useEffect
let test = new SceneInit();
test.initScene();
test.animate();
const ticTacToe = new TicTacToe();
test.scene.add(ticTacToe.board);

// TicTacToe.js
export default class TicTacToe {
  constructor() {
    this.board = {};
    this.circles = {};
    this.crosses = {};
    this.boardLines = {};
    this.hiddenTiles = {};
    this.currentPlayer = "o";
    this.boardCopy = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
    this._createBoard();
  }
  // ...
}
`,
    `
_createBoard() {
  this.board = new THREE.Group();
  this.boardLines = new THREE.Group();
  this.hiddenTiles = new THREE.Group();
  // ...

  // vertical board lines
  this.boardLines.add(this._boardLine(4, 64, 4, -12, 0));
  this.boardLines.add(this._boardLine(4, 64, 4, 12, 0));

  // _boardLine(x, y, z, xOffset, yOffset) {
  //   const boardLineGeometry = new THREE.BoxGeometry(x, y, z);
  //   const boardLineMaterial = new THREE.MeshNormalMaterial();
  //   const boardLine = new THREE.Mesh(boardLineGeometry, boardLineMaterial);
  //   boardLine.position.x = xOffset;
  //   boardLine.position.y = yOffset;
  //   boardLine.scale.x = 0;
  //   boardLine.scale.y = 0;
  //   boardLine.scale.z = 0;
  //   return boardLine;
  // }

  // hidden tiles - top row
  this.hiddenTiles.add(this._hiddenTile(-24, 24));
  this.hiddenTiles.add(this._hiddenTile(0, 24));
  this.hiddenTiles.add(this._hiddenTile(24, 24));

  // add groups to the board
  this.board.add(this.boardLines);
  this.board.add(this.hiddenTiles);
}
`,
    `
// hi there
`,
    `
// hi there
`,
    `
// hi there
`,
    `
// hi there
`,
    `
// hi there
`,
    `
// hi there
`,
  ];

  const [index, setIndex] = useState(0);
  const [code, setCode] = useState(codeArray[0]);

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
    <div className="h-full text-xl">
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
