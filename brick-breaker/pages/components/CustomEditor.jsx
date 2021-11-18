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
  ];
  const [code, setCode] = useState(codeArray[0]);

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
                console.log("value:", value);
                setCode(value);
              }}
              className="h-full w-11/12"
            />
            <div className="absolute border top-2 bottom-2 right-2 w-1/12">
              <div className="flex flex-col h-full place-items-center justify-center">
                <button onClick={() => console.log("hi")}>👋</button>
                <button onClick={() => console.log("there")}>✌️</button>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
