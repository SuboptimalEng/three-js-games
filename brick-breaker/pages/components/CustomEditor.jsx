import { useState } from "react";
import Draggable from "react-draggable";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function CustomEditor(props) {
  const codeArray = [
    `// 🐦 twitter.com/SuboptimalEng
// 💻 github.com/SuboptimalEng/GameDev

const bg = new THREE.BoxGeometry(8, 8, 8);
const bm = new THREE.MeshNormalMaterial();
const b = new THREE.Mesh(bg, bm);
test.scene.add(b);

const animate = () => {
  b.rotation.x += 0.001;
  b.rotation.y += 0.001;
  window.requestAnimationFrame(animate);
};
  `,
    `class TicTacToe {
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
}
  `,
  ];

  const [index, setIndex] = useState(0);
  const [code, setCode] = useState(codeArray[index]);

  const nextCodeBlock = () => {
    if (index < codeArray.length - 1) {
      setCode(codeArray[index + 1]);
      setIndex(index + 1);
    }
  };

  const prevCodeBlock = () => {
    if (index >= 1) {
      setCode(codeArray[index - 1]);
      setIndex(index - 1);
    }
  };

  console.log(props);

  return (
    <div className="absolute inset-x-72 inset-y-36">
      <Draggable defaultPosition={{ x: props.x, y: props.y }}>
        <div
          id="custom-editor"
          className="w-full h-full text-2xl bg-white rounded-xl"
        >
          <div className="w-full h-full p-2">
            <CodeMirror
              value={code}
              height="100%"
              theme="light"
              extensions={[javascript()]}
              onChange={(value, viewUpdate) => {
                setCode(value);
              }}
              className="h-full w-11/12"
            />
            <div className="absolute border top-2 bottom-2 right-2 w-1/12">
              <div className="flex flex-col text-4xl h-full place-items-center justify-center space-y-2">
                <button onClick={prevCodeBlock}>⏮</button>
                <button onClick={nextCodeBlock}>️⏭</button>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
