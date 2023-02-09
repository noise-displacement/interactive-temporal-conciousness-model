import { OrbitControls, SpotLight } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { Controls, useControl } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const models = {
  cone: {
    path: "/models/cone.gltf",
  },

  hedron: {
    path: "/models/hedron.glb",
  },

  sphere: {
    path: "/models/sphere.glb",
  },

  axis: {
    path: "/models/axis.glb",
  },

  pyramid: {
    path: "/models/pyramid.glb",
  },
};

const Model = (modelPath) => {

  const s = useControl(
    "Scale", { 
      type: "number",
      value: 1
    });

    const verticesOfCube = [
      -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
      -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];
    
    const indicesOfFaces = [
      2,1,0,    0,3,2,
      0,4,7,    7,3,0,
      0,1,5,    5,4,0,
      1,2,6,    6,5,1,
      2,3,7,    7,6,2,
      4,5,6,    6,7,4
    ];

    const material = new THREE.MeshLambertMaterial({
      color: 0xcc4141,
      side: THREE.DoubleSide,
      clipShadows: true,
      flatShading: true,
      shadowSide: THREE.DoubleSide,
    });
    
  return (
    <mesh material={material}>
      <polyhedronGeometry
        attach="geometry"
        args={[verticesOfCube, indicesOfFaces, 3, s]}
      />
    </mesh>
  );
  //return <Suspense><primitive object={useLoader(GLTFLoader, modelPath).scene} /> </Suspense>;
};

function ModelLoader() {
  //console.log(useLoader(GLTFLoader, models.cone.path).scene);
  return (
    <Controls.Provider>
      <Controls.Canvas>
        <Model />
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 0, 10]} intensity={1} />
        <pointLight position={[-10, 0, -10]} intensity={1} />
      </Controls.Canvas>
      <Controls />
    </Controls.Provider>
  );
}

export default ModelLoader;
