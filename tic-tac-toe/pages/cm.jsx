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
    // ...
    this.board = new THREE.Group();
    this.boardLines = new THREE.Group();
    this.board.add(this.boardLines);

    this.currentPlayer = "o";
    this.boardCopy = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];

    this._createBoard();
  }

  _createBoard() {
    // vertical board lines
    const left = this._boardLine(4, 64, 4, -12, 0);
    const right = this._boardLine(4, 64, 4, 12, 0);
    this.boardLines.add(left);
    this.boardLines.add(right);
    // ...
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

_createBoard() {
  // vertical board lines
  this.boardLines.add(this._boardLine(4, 64, 4, -12, 0));
  this.boardLines.add(this._boardLine(4, 64, 4, 12, 0));

  // horizontal board lines
  this.boardLines.add(this._boardLine(64, 4, 4, 0, -12));
  this.boardLines.add(this._boardLine(64, 4, 4, 0, 12));
}
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

// hi there
`,
    `
// twitter 👉🏾 twitter.com/SuboptimalEng
// code 👉🏾 github.com/SuboptimalEng/GameDev

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
