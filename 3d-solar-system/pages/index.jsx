import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import Planet from "./lib/Planet";
import Rotation from "./lib/Rotation";

export default function Home() {
  // let gui;

  // const initGui = async () => {
  //   const dat = await import("dat.gui");
  //   gui = new dat.GUI();
  // };

  useEffect(() => {
    // TODO: Understand this code later.
    let test = new SceneInit();
    test.initScene();
    test.animate();

    // let solarSystem = new THREE.Group();
    // const sunGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const sunMaterial = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    // const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    // solarSystem.add(sunMesh);
    // test.scene.add(solarSystem);
    // const sunTexture = new THREE.TextureLoader().load("sun.jpeg");
    // const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    // let mercurySystem = new THREE.Group();
    // const mercury = new Planet(2, 16, "mercury.png");
    // const mercuryMesh = mercury.getMesh();
    // mercurySystem.add(mercuryMesh);
    // const mercuryRotation = new Rotation(mercuryMesh);
    // const mercuryRotationMesh = mercuryRotation.getMesh();
    // mercurySystem.add(mercuryRotationMesh);
    // let venusSystem = new THREE.Group();
    // const venus = new Planet(3, 32, "venus.jpeg");
    // const venusMesh = venus.getMesh();
    // venusSystem.add(venusMesh);
    // const venusRotation = new Rotation(venusMesh);
    // const venusRotationMesh = venusRotation.getMesh();
    // venusSystem.add(venusRotationMesh);
    // let earthSystem = new THREE.Group();
    // const earth = new Planet(4, 48, "earth.jpeg");
    // const earthMesh = earth.getMesh();
    // earthSystem.add(earthMesh);
    // const earthRotation = new Rotation(earthMesh);
    // const earthRotationMesh = earthRotation.getMesh();
    // earthSystem.add(earthRotationMesh);
    // let marsSystem = new THREE.Group();
    // const mars = new Planet(3, 64, "mars.jpeg");
    // const marsMesh = mars.getMesh();
    // marsSystem.add(marsMesh);
    // const marsRotation = new Rotation(marsMesh);
    // const marsRotationMesh = marsRotation.getMesh();
    // marsSystem.add(marsRotationMesh);
    // solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem);
    // NOTE: Add solar system mesh GUI.
    // await initGui();
    // const solarSystemGui = gui.addFolder("solar system");
    // solarSystemGui.add(mercuryRotationMesh, "visible").name("mercury").listen();
    // solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
    // solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
    // solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();
    // NOTE: Animate solar system at 60fps.
    // const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    // const animate = () => {
    //   sunMesh.rotation.y += 0.001;
    //   mercurySystem.rotation.y += EARTH_YEAR * 4;
    //   venusSystem.rotation.y += EARTH_YEAR * 2;
    //   earthSystem.rotation.y += EARTH_YEAR;
    //   marsSystem.rotation.y += EARTH_YEAR * 0.5;
    //   requestAnimationFrame(animate);
    // };
    // animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
