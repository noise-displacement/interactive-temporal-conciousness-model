import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Cone, useGLTF } from "@react-three/drei";
import { Matrix4 } from "three";

function CameraController() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
}

function ThreeInit() {
  const [boxWidth, setBoxWidth] = useState(10);
  let boxWidthVal = boxWidth / 5;

  const [coneDepth, setConeDepth] = useState(10);

  let coneMatrix = new THREE.Matrix4();
  coneMatrix.set(10,10,10,10);
  coneMatrix.makeScale(1,coneDepth,1);

  return (
    <div id="canvasContainer">
      <label htmlFor="slider1">Input</label>
      <input
        id="slider1"
        type="range"
        min="1"
        max="10"
        value={boxWidth}
        onChange={(e) => setBoxWidth(e.target.value)}>
      </input>
      <span>{boxWidth}</span>

      <input
        id="slider1"
        type="range"
        min="1"
        max="10"
        value={coneDepth}
        onChange={(e) => setConeDepth(e.target.value)}>
      </input>

      <Canvas>
        <CameraController />
        <ambientLight />
        <spotLight intensity={0.5} position={[5, 10, 50]} />

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[boxWidthVal, 2, 2]} />
          <meshStandardMaterial />
        </mesh>

        <mesh position={[0,0,0]} rotation={[0,0,-67.5]} matrix-copy={null} matrix={coneMatrix} matrixAutoUpdate={false}>
          {/*<coneGeometry args={[1, 2]} translate={[1,3,3]} scale={2}></coneGeometry>*/}
          <cylinderGeometry args={[0, 1, 2, 20, 1, false]}></cylinderGeometry>
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default ThreeInit;
