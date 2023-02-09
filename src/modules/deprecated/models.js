import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";
import { Controls, useControl } from 'react-three-gui';

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
  }

function ThreeJS() {
  const models = [
    {
      id: 0,
      model: useLoader(GLTFLoader, "/models/cone.gltf"),
    },

    {
      id: 1,
      model: useLoader(GLTFLoader, "/models/hedron.glb"),
    },

    {
      id: 2,
      model: useLoader(GLTFLoader, "/models/sphere.glb"),
    },

    {
      id: 3,
      model: useLoader(GLTFLoader, "/models/axis.glb"),
    },

    {
      id: 4,
      model: useLoader(GLTFLoader, "/models/pyramid.glb"),
    },
  ];

  let currentModel = 0;
  let scaleFactor = 2;
  let scaleFactorFraction = scaleFactor / scaleFactor / scaleFactor;

  const [coneDepth, setConeDepth] = useState(1);
  const prevConeDepthValue = useRef();
  let coneDepthFraction = (coneDepth / scaleFactor) * 2;

  let [selectedModel, setSelectedModel] = useState(null);
  let [toggleClipping, setToggleClipping] = useState(true);
  let [toggleWireframe, setToggleWireframe] = useState(false);
  let clipvalue = useRef(0);

  /*
  // Setter fargene på modellene.
  // Definere clipping planes
  //
  */
  models[0].model.nodes.Cone.material = new THREE.MeshPhongMaterial({
    color: 0x3a6fe0,
    flatShading: true,
    shadowSide: THREE.DoubleSide,
    wireframe: false,
  });

  models[1].model.nodes.Icosphere.material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    clipShadows: true,
    flatShading: true,
    clippingPlanes: [
      new THREE.Plane(new THREE.Vector3(0, 0, clipvalue.current), 0),
    ],
    shadowSide: THREE.DoubleSide,
    wireframe: toggleWireframe,
  });

  models[2].model.nodes.Sphere.material = new THREE.MeshPhongMaterial({
    color: 0x39bd76,
    side: THREE.DoubleSide,
    clipShadows: true,
    flatShading: true,
    clippingPlanes: [
      new THREE.Plane(new THREE.Vector3(0, 0, clipvalue.current), 0),
    ],
    shadowSide: THREE.DoubleSide,
    wireframe: toggleWireframe,
  });

  models[4].model.nodes.Cone.material = new THREE.MeshLambertMaterial({
    color: 0xcc4141,
    side: THREE.DoubleSide,
    clipShadows: true,
    flatShading: true,
    clippingPlanes: [
      new THREE.Plane(new THREE.Vector3(0, 0, clipvalue.current), 0),
    ],
    shadowSide: THREE.DoubleSide,
    wireframe: toggleWireframe,
  });


  let sphereMatrix = models[2].model.nodes.Sphere;

  

  console.log(sphereMatrix)

   /*
  // Sets the X position of cone model based if on the previous scale of the model is more or less. 
  // The models translation is set back or forward by the scaleFactorFraction
  //
  */

  function updateConeSize(target) {
    console.log(target);
    if (coneDepth < prevConeDepthValue.current) {
      models[0].model.scene.translateX(-scaleFactorFraction);
    } else {
      models[0].model.scene.translateX(scaleFactorFraction);
    }
    prevConeDepthValue.current = coneDepth;
    setConeDepth(target);
  }

  useEffect(() => {
    if (toggleClipping) {
      clipvalue.current = -1;
    } else {
      clipvalue.current = 0;
    }
  });

  return (
    <>
      <label htmlFor="slider1">Event size</label>
      <input
        id="slider1"
        type="range"
        min="1"
        max="9"
        value={coneDepth}
        onChange={(e) => updateConeSize(e.target.value)}
      ></input>

      <label htmlFor="toggleClipping">Kutt modeller</label>
      <input
        type="checkbox"
        id="toggleClipping"
        checked={!toggleClipping}
        onChange={() => setToggleClipping(!toggleClipping)}
      ></input>

      <label htmlFor="toggleWireframe">Wireframe modus</label>
      <input
        type="checkbox"
        id="toggleWireframe"
        checked={toggleWireframe}
        onChange={() => setToggleWireframe(!toggleWireframe)}
      ></input>

      <Canvas gl={{ localClippingEnabled: true }}>
        <OrbitControls />
        <ambientLight />
        <spotLight intensity={0.5} position={[5, 10, 25]} />
        <Suspense>
          <primitive
            scale={[coneDepthFraction, coneDepthFraction, coneDepthFraction]}
            object={models[0].model.scene}
          />
        </Suspense>

        <Suspense>
          <primitive scale={[10, 10, 10]} object={models[1].model.scene} />
        </Suspense>

        <Suspense>
          <primitive
            scale={[50, 50, 50]}
            rotation={[0, -1.570796, 0]}
            object={models[2].model.scene}
            matrix={[2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0]}
          />
        </Suspense>

        <Suspense>
          <primitive object={models[3].model.scene} />
        </Suspense>

        <Suspense>
          <primitive object={models[4].model.scene} scale={[40, 20, 40]} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default ThreeJS;
