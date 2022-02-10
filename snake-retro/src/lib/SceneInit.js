import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

import {
  planeVertexShader,
  planeFragmentShader,
  customVignetteVertexShader,
  customVignetteFragmentShader,
} from './Shaders';

export default class SceneInit {
  constructor(canvasID, camera, scene, stats, controls, renderer, fov = 36) {
    this.fov = fov;
    this.scene = scene;
    this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.canvasID = canvasID;
  }

  initScene() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 96;

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    const canvas = document.getElementById(this.canvasID);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    this.scene.add(ambientLight);

    // spot light which is illuminating the chart directly
    let spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.castShadow = true;
    spotLight.position.set(0, 48, 48);
    this.scene.add(spotLight);

    const loader = new GLTFLoader();
    loader.load('./assets/crt_monitor/scene.gltf', (gltf) => {
      gltf.scene.scale.set(0.25, 0.25, 0.25);
      gltf.scene.rotation.y = -Math.PI / 2;
      gltf.scene.position.y = 5;
      gltf.scene.position.z = -8;
      this.scene.add(gltf.scene);
    });

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

    // NOTE: Render target.
    const rtFov = 75;
    const rtNear = 0.1;
    const rtFar = 100;
    const rtWidth = 1024;
    const rtHeight = 1024;
    const rtAspect = rtWidth / rtHeight;
    this.rtScene = new THREE.Scene();
    this.renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
    this.rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
    this.rtCamera.position.z = 36;

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 0, 200);
    this.rtScene.add(light);
    this.rtScene.background = new THREE.Color(0xfafafa);

    const planeGeometry = new THREE.PlaneGeometry(32, 32, 32, 32);
    const planeMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 1.0 },
        uTexture: { value: this.renderTarget.texture },
      },
      vertexShader: planeVertexShader(),
      fragmentShader: planeFragmentShader(),
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.y = 5;
    planeMesh.position.z = -2.4;
    planeMesh.rotation.x = -Math.PI / 48;
    planeMesh.scale.set(1.2, 1.2, 1.2);
    this.scene.add(planeMesh);

    this.customVignetteShader = {
      uniforms: {
        tDiffuse: { value: null },
        offset: { value: 1.0 },
        darkness: { value: 3.0 },
        time: { type: 'f', value: 1.0 },
      },
      vertexShader: customVignetteVertexShader(),
      fragmentShader: customVignetteFragmentShader(),
    };

    this.composer = new EffectComposer(this.renderer, this.renderTarget);
    const renderPass = new RenderPass(this.rtScene, this.rtCamera);
    const filmPass = new FilmPass(0.35, 0.025, 648, false);
    const customVignettePass = new ShaderPass(
      new THREE.ShaderMaterial(this.customVignetteShader)
    );
    this.composer.addPass(renderPass);
    this.composer.addPass(customVignettePass);
    this.composer.addPass(filmPass);
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.composer.render();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
