import { useEffect } from 'react';

import * as THREE from 'three';
// import TiltingTower from './lib/TiltingTower';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();

    // const tiltingTowerGame = new TiltingTower();
    // test.scene.add(tiltingTowerGame.group);
    // const animate = (t) => {
    //   currentTime = t;
    //   tiltingTowerGame.loop(t);
    //   requestAnimationFrame(animate);
    // };
    // animate();

    let currentTime;
    let physicsWorld;
    let rigidBodies = [];
    let colGroupPlane = 1;
    let colGroupRedBall = 2;
    let colGroupGreenBall = 4;
    let clock = new THREE.Clock();
    let tmpTrans = new Ammo.btTransform();

    const setupPhysicsWorld = () => {
      let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
      let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
      let overlappingPairCache = new Ammo.btDbvtBroadphase();
      let solver = new Ammo.btSequentialImpulseConstraintSolver();

      physicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher,
        overlappingPairCache,
        solver,
        collisionConfiguration
      );
      physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
    };

    setupPhysicsWorld();

    const onKeyDown = (event) => {
      console.log(event.key);
      if (event.key === 'Enter') {
        tiltingTowerGame.acceptPhantomBlock(currentTime);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    function createBlock() {
      let pos = { x: 0, y: 0, z: 0 };
      let scale = { x: 50, y: 2, z: 50 };
      let quat = { x: 0, y: 0, z: 0, w: 1 };
      let mass = 0;

      //threeJS Section
      let blockPlane = new THREE.Mesh(
        new THREE.BoxBufferGeometry(),
        new THREE.MeshPhongMaterial({ color: 0xa0afa4 })
      );

      blockPlane.position.set(pos.x, pos.y, pos.z);
      blockPlane.scale.set(scale.x, scale.y, scale.z);

      blockPlane.castShadow = true;
      blockPlane.receiveShadow = true;

      test.scene.add(blockPlane);

      //Ammojs Section
      let transform = new Ammo.btTransform();
      transform.setIdentity();
      transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
      transform.setRotation(
        new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
      );
      let motionState = new Ammo.btDefaultMotionState(transform);

      let colShape = new Ammo.btBoxShape(
        new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5)
      );
      colShape.setMargin(0.05);

      let localInertia = new Ammo.btVector3(0, 0, 0);
      colShape.calculateLocalInertia(mass, localInertia);

      let rbInfo = new Ammo.btRigidBodyConstructionInfo(
        mass,
        motionState,
        colShape,
        localInertia
      );
      let body = new Ammo.btRigidBody(rbInfo);

      // physicsWorld.addRigidBody(body);
      physicsWorld.addRigidBody(body, colGroupPlane, colGroupRedBall);
    }

    function createBall() {
      let pos = { x: 0, y: 20, z: 0 };
      let radius = 2;
      let quat = { x: 0, y: 0, z: 0, w: 1 };
      let mass = 1;

      //threeJS Section
      let ball = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius),
        new THREE.MeshPhongMaterial({ color: 0xff0505 })
      );

      ball.position.set(pos.x, pos.y, pos.z);

      ball.castShadow = true;
      ball.receiveShadow = true;

      test.scene.add(ball);

      //Ammojs Section
      let transform = new Ammo.btTransform();
      transform.setIdentity();
      transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
      transform.setRotation(
        new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
      );
      let motionState = new Ammo.btDefaultMotionState(transform);

      let colShape = new Ammo.btSphereShape(radius);
      colShape.setMargin(0.05);

      let localInertia = new Ammo.btVector3(0, 0, 0);
      colShape.calculateLocalInertia(mass, localInertia);

      let rbInfo = new Ammo.btRigidBodyConstructionInfo(
        mass,
        motionState,
        colShape,
        localInertia
      );
      let body = new Ammo.btRigidBody(rbInfo);

      // physicsWorld.addRigidBody(body);
      physicsWorld.addRigidBody(
        body,
        colGroupRedBall,
        colGroupPlane | colGroupGreenBall
      );

      ball.userData.physicsBody = body;
      rigidBodies.push(ball);
    }

    function updatePhysics(deltaTime) {
      // Step world
      physicsWorld.stepSimulation(deltaTime, 10);

      // Update rigid bodies
      for (let i = 0; i < rigidBodies.length; i++) {
        let objThree = rigidBodies[i];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if (ms) {
          ms.getWorldTransform(tmpTrans);
          let p = tmpTrans.getOrigin();
          let q = tmpTrans.getRotation();
          objThree.position.set(p.x(), p.y(), p.z());
          objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
      }
    }

    function createMaskBall() {
      let pos = { x: 1, y: 30, z: 0 };
      let radius = 2;
      let quat = { x: 0, y: 0, z: 0, w: 1 };
      let mass = 1;

      //threeJS Section
      let ball = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius),
        new THREE.MeshPhongMaterial({ color: 0x00ff08 })
      );

      ball.position.set(pos.x, pos.y, pos.z);

      ball.castShadow = true;
      ball.receiveShadow = true;

      test.scene.add(ball);

      //Ammojs Section
      let transform = new Ammo.btTransform();
      transform.setIdentity();
      transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
      transform.setRotation(
        new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
      );
      let motionState = new Ammo.btDefaultMotionState(transform);

      let colShape = new Ammo.btSphereShape(radius);
      colShape.setMargin(0.05);

      let localInertia = new Ammo.btVector3(0, 0, 0);
      colShape.calculateLocalInertia(mass, localInertia);

      let rbInfo = new Ammo.btRigidBodyConstructionInfo(
        mass,
        motionState,
        colShape,
        localInertia
      );
      let body = new Ammo.btRigidBody(rbInfo);

      physicsWorld.addRigidBody(body, colGroupGreenBall, colGroupRedBall);

      ball.userData.physicsBody = body;
      rigidBodies.push(ball);
    }

    createBlock();
    createBall();
    createMaskBall();

    const animate = () => {
      let deltaTime = clock.getDelta();
      updatePhysics(deltaTime);
      requestAnimationFrame(animate);
    };
    animate();

    test.animate();
  }, []);
  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
