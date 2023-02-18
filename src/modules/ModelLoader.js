import { OrbitControls, SpotLight } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Controls, useControl } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";

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

  cube: {
    path: "/models/cube.glb",
  },
};

const Model = (modelPath) => {
  const s = useControl("Scale", {
    type: "number",
    value: 1,
    min: 0,
    max: 10,
    distance: 10,
  });

  const verticesOfCube = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
    -1, 1, 1,
  ];

  const indicesOfFaces = [
    2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
    3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
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
        args={[verticesOfCube, indicesOfFaces, 3, 0]}
      />
    </mesh>
  );
  //return <Suspense><primitive object={useLoader(GLTFLoader, modelPath).scene} /> </Suspense>;
};

const OctaHedron = () => {
  let Octa = new THREE.BoxGeometry(2, 2, 2);
  console.log(Octa);
  return (
    <mesh>
      <Octa />
    </mesh>
  );
};

const Polyhedron = () => {
  let obj = useRef();
  useEffect(() => {
    console.log(obj.current.geometry);
    let g = obj.current.geometry;

    for (let i = 0; i < g.attributes.position.array.length; i++) {
      //console.log(i);
    }
  });

  return (
    <mesh ref={obj}>
      <octahedronBufferGeometry args={[1, 0]} />
    </mesh>
  );
};

const CustomGeo = (props) => {
  let obj = useRef();
  let loadedObject = useLoader(GLTFLoader, props.object);

  const scale = useControl("Scale", {
    type: "number",
    value: 1,
    min: 0.1,
    max: 3,
    distance: 10,
    group: "Relation",
  });

  useEffect(() => {
    loadedObject.nodes.Cone.material = new THREE.MeshPhongMaterial({
      color: 0x3a6fe0,
      side: THREE.DoubleSide,
      flatShading: true,
      shadowSide: THREE.DoubleSide,
      wireframe: false,
      clipShadows: true,
      clippingPlanes: [
        new THREE.Plane(new THREE.Vector3(0, 0, -props.clipMode), 0),
      ],
    });
  });

  return (
    <Suspense>
      <primitive
        ref={obj}
        scale={scale}
        position={[scale, 0, 0]}
        rotation={props.rotation}
        object={loadedObject.scene}
      ></primitive>
    </Suspense>
  );
};

const Hedron = (props) => {
  let obj = useRef();
  let loadedObject = useLoader(GLTFLoader, props.object);

  let maxScale = 5;

  let wireframeMode = useControl("Wireframe", {
    type: "boolean",
    value: true,
    group: "Model",
  });

  //Scaling Z axis
  const sP = useControl("Sosiokulturell", {
    type: "number",
    value: 2,
    min: 2,
    max: maxScale,
    distance: 10,
    group: "Model",
  });

  const sM = useControl("Statlig", {
    type: "number",
    value: 2,
    min: 2,
    max: maxScale,
    distance: 10,
    group: "Model",
  });

  const sTime = useControl("Tid", {
    type: "number",
    value: 1,
    min: 1,
    max: maxScale,
    distance: 10,
    group: "Model",
  });

  //Scaling Z axis
  const place = useControl("Sted", {
    type: "number",
    value: 3,
    min: 3,
    max: maxScale,
    distance: 10,
    group: "Model",
  });

  let normAxisScaling = (-sM * sP) / maxScale;
  let placeAxisPosition = (-sM + sP) / 2;
  let scaleTime = sTime;
  let placeAxisScaling = place;

  useEffect(() => {
    loadedObject.nodes.Icosphere.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      flatShading: true,
      shadowSide: THREE.DoubleSide,
      wireframe: wireframeMode,
      clipShadows: true,
      clippingPlanes: [
        new THREE.Plane(new THREE.Vector3(0, 0, -props.clipMode), 0),
      ],
    });
  });

  return (
    <Suspense>
      <primitive
        ref={obj}
        scale={[scaleTime, placeAxisScaling, normAxisScaling]}
        position={[0, 0, placeAxisPosition]}
        rotation={props.rotation}
        object={loadedObject.scene}
      ></primitive>
    </Suspense>
  );
};

const Pyramid = (props) => {
  let obj = useRef();
  let loadedObject = useLoader(GLTFLoader, props.object);

  let maxScale = 14;

  let wireframeMode = useControl("Wireframe", {
    type: "boolean",
    value: true,
    group: "Structure",
  });

  //Scaling Z axis
  const sP = useControl("Sosiokulturell", {
    type: "number",
    value: 7,
    min: 7,
    max: maxScale,
    distance: 10,
    group: "Structure",
  });

  const sM = useControl("Statlig", {
    type: "number",
    value: 7,
    min: 7,
    max: maxScale,
    distance: 10,
    group: "Structure",
  });

  const sTime = useControl("Tid", {
    type: "number",
    value: 7,
    min: 7,
    max: maxScale,
    distance: 10,
    group: "Structure",
  });

  const place = useControl("Sted", {
    type: "number",
    value: 7,
    min: 7,
    max: maxScale,
    distance: 10,
    group: "Structure",
  });

  const rotation = useControl("Rotasjon", {
    type: "number",
    value: 0,
    min: 0,
    max: Math.PI * 2,
    distance: 10,
    group: "Structure",
  });

  let normAxisScaling = (-sM * sP) / maxScale;
  let placeAxisPosition = (-sM + sP) / 2;
  let scaleTime = sTime;
  let placeAxisScaling = place;
  let rotationX = rotation;

  useEffect(() => {
    loadedObject.nodes.Cone.material = new THREE.MeshPhongMaterial({
      color: 0xcc4141,
      side: THREE.DoubleSide,
      flatShading: true,
      shadowSide: THREE.DoubleSide,
      wireframe: wireframeMode,
      clipShadows: true,
      clippingPlanes: [
        new THREE.Plane(new THREE.Vector3(0, 0, -props.clipMode), 0),
      ],
    });
  });

  return (
    <Suspense>
      <primitive
        ref={obj}
        scale={[scaleTime, placeAxisScaling, normAxisScaling]}
        position={[0, 0, placeAxisPosition]}
        rotation={[rotationX, 0, 0]}
        object={loadedObject.scene}
      ></primitive>
    </Suspense>
  );
};

const Circle = (props) => {
  let obj = useRef();
  let loadedObject = useLoader(GLTFLoader, props.object);

  // let wireframeMode = useControl("Wireframe", {
  //   type: "boolean",
  //   value: true,
  //   group: "Ultra Structure"
  // })

  useEffect(() => {
    loadedObject.nodes.Sphere.material = new THREE.MeshPhongMaterial({
      color: 0x39bd76,
      flatShading: true,
      shadowSide: THREE.DoubleSide,
      side: THREE.DoubleSide,
      wireframe: 0,
      clipShadows: true,
      clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)],
    });
  });

  return (
    <Suspense>
      <primitive
        ref={obj}
        scale={30}
        position={[0, 0, 0]}
        rotation={props.rotation}
        object={loadedObject.scene}
      ></primitive>
    </Suspense>
  );
};

function ModelLoader() {
  //console.log(useLoader(GLTFLoader, models.cone.path).scene);
  const [clipMode, setClipmode] = useState(0);

  return (
    <>
      <div id="globalControls">
        <span class="topLabel">global controls</span>
        <div class="controls">
          <label htmlFor="clipMode">Split mode</label>
          <input
            name="clipMode"
            type="checkbox"
            onChange={() => {
              setClipmode(!clipMode);
            }}
          />        
        </div>
        <div class="controlText">
          <span>Lmb + Pan = Rotate camera</span>
          <span>Scroll = Zoom</span>
        </div>
      </div>
      <Controls.Provider>
        <Controls.Canvas gl={{ localClippingEnabled: true }}>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 0, 10]} intensity={1} />
          <pointLight position={[-10, 0, -10]} intensity={1} />
          <axesHelper args={[5]} />
          {/* <Model /> */}
          {/* <OctaHedron /> */}
          {/* <Polyhedron /> */}
          <mesh scale={0.2}>
            <meshPhongMaterial color={0xfc8803}></meshPhongMaterial>
            <sphereGeometry></sphereGeometry>
          </mesh>

          <CustomGeo
            object={models.cone.path}
            rotation={[-1.570796, 0, 0]}
            position={[0, 0, 0]}
            clipMode={clipMode}
          ></CustomGeo>
          <Hedron object={models.hedron.path} clipMode={clipMode}></Hedron>
          <Pyramid object={models.pyramid.path} clipMode={clipMode}></Pyramid>

          <Suspense>
            <primitive
              object={useLoader(GLTFLoader, models.axis.path).scene}
            ></primitive>
          </Suspense>

          <Circle object={models.sphere.path}></Circle>
        </Controls.Canvas>
        <Controls />
      </Controls.Provider>
    </>
  );
}

export default ModelLoader;
