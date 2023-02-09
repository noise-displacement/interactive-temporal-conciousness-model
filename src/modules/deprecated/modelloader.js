import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

function ReturnPrimitive(object) {
  return (
    <primitive
      scale={1}
      object={object}
      position={new THREE.Vector3(0, 0, 1)}
    />
  );
}

function ThreeInit2() {
  const gltf = useGLTF("/models/cone.glb");

  return (
    <div className="canvasContainer">
      <Canvas>
        <CameraController />
        <ambientLight />
        <spotLight intensity={0.5} position={[5, 10, 50]} />
        <primitive object={gltf.scene} />
      </Canvas>
    </div>
  );
}

export default ThreeInit2;
