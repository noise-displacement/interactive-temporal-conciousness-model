import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";
import { Controls, useControl } from 'react-three-gui';
import vertexFaceNumbersHelper from "../../components/deprecated/vertexLabel";

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

    {
      id: 5,
      model: useLoader(GLTFLoader, "/models/triangle.glb"),
    },

    {
      id: 6,
      model: useLoader(GLTFLoader, "/models/cube.glb"),
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
  

  //console.log(sphereMatrix)

  let triverts = models[5].model.nodes.Plane.geometry.attributes.position.array;
  let triindexes = models[5].model.nodes.Plane.geometry.index.array;

  let pyrverts = models[4].model.nodes.Cone.geometry.attributes.position.array;
  let pyrnorms = models[4].model.nodes.Cone.geometry.attributes.normal.array;
  let pyrindexes = models[4].model.nodes.Cone.geometry.index.array;

  //console.log(models[4].model.nodes.Cone.geometry)
  //console.log(pyrverts);
  //console.log(pyrindexes);
  //console.log(pyrnorms);

  // for(let i = 0; i <= 11; i++) {
  //   console.log(models[4].model.nodes.Cone.geometry.attributes.position.getY(i));
  //   models[4].model.nodes.Cone.geometry.attributes.position.setY(i, models[4].model.nodes.Cone.geometry.attributes.position.getY(i) - 1);
  // }

  function getIndexedVertices(geometryIndexArray, geometryVerticeArray) {
    //Gets indexes and vertices of geometry and cross references them. Creates an array within an array that contains vertices for each index
    let faces = [];
  
    for(let index = 0; index < geometryIndexArray.length; index++) {
      faces.push([]);
  
      for(let vert = index * 3; vert < index * 3 + 3; vert++) {
        faces[index].push(geometryVerticeArray[vert]);
      }
  
    }
  
    return faces;
  }

let planeFaces = getIndexedVertices(models[5].model.nodes.Plane.geometry.index.array, models[5].model.nodes.Plane.geometry.attributes.position.array);

  //console.log(getIndexedVertices(pyrindexes, pyrverts));


  console.log(models[5]);

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

      <Canvas gl={{ localClippingEnabled: true }} >
        <OrbitControls />
        <ambientLight />
        <spotLight intensity={0.5} position={[5, 10, 25]} />
        <axesHelper args={[100]}/>
        {/* <Suspense>
          <primitive
            scale={[coneDepthFraction, coneDepthFraction, coneDepthFraction]}
            object={models[0].model.scene}
          />
        </Suspense> */}

        {/* <Suspense>
          <primitive scale={[10, 10, 10]} object={models[1].model.scene} />
        </Suspense> */}

        {/* <Suspense>
          <primitive
            scale={[50, 50, 50]}
            rotation={[0, -1.570796, 0]}
            object={models[2].model.scene}
            matrix={[2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0]}
          />
        </Suspense> */}

        {/* Axis model <Suspense>
          <primitive object={models[3].model.scene} />
        </Suspense> */}

        {/* <Suspense>
          <primitive object={models[4].model.scene} scale={[40, 20, 40]} />
        </Suspense> */}

        {/* Triangle model <Suspense>
          <primitive object={models[5].model.scene} scale={[40, 20, 40]} />
        </Suspense> */}
        <Suspense>
          <primitive object={models[5].model.scene} ></primitive>
        </Suspense>
      </Canvas>
    </>
  );
}

export default ThreeJS;
