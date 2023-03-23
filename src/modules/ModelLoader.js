import { Html, Hud, OrthographicCamera, ScreenSpace } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { useControl } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";
import {
  StructureController,
  StructureSlider,
  useStructureSlider,
} from "../components/structureController";

function deg_to_rad(deg) {
  return deg * (Math.PI / 180);
}

export const Null = () => <></>;

const Event = function (props) {
  const ref = useRef();
  return (
    <mesh scale={0.2} position={props.position}>
      <meshPhongMaterial color={0xfc8803}></meshPhongMaterial>
      <sphereGeometry ref={ref}></sphereGeometry>
    </mesh>
  );
};

const ModelLoader = function (props) {
  let ref = useRef();
  let object = useLoader(GLTFLoader, props.object);
  const { viewport } = useThree();

  const [spaceSize, setSpaceSize] = useState(1);

  //console.log(props);
  let structuralSize = props.sizes.structural;
  let socialSize = props.sizes.social;

  let defaultScale = 100;
  let defaultSize = props.type.name === "Event" ? 10 : defaultScale;
  let minScale = 1;

  // Fiks hovered outlines
  // if(props.hoveredObject !== ref) {
  //   console.log("not same");
  // } else {
  //   console.log("same");
  // }

  let startYear = Number(props.years.start);
  let endYear = Number(props.years.end);

  let timePos = 0;
  let normPos = 0;
  let placePos = 0;
  let eventPos = 0;

  let normScale = 100;
  let placeScale = 100 * spaceSize;
  let timeScale;

  if (props.relation) {
    normScale = (endYear - startYear) / 2;
    timeScale = 100;
    timePos = startYear + normScale;
  } else {
    timeScale = (endYear - startYear) / 2;
    timePos = startYear + timeScale;
  }

  let material = new THREE.MeshPhongMaterial({
    color: props.color,
    side: THREE.DoubleSide,
    flatShading: true,
    shadowSide: THREE.DoubleSide,
    wireframe: false,
    clipShadows: true,
    clippingPlanes: [
      new THREE.Plane(new THREE.Vector3(0, 0, -props.clipMode), 0),
    ],
  });

  //console.log(material);

  //Gets the node of the model name e.g Sphere or Icosphere and sets the material and color dynamically after object is loaded
  useEffect(() => {
    if (props.globalWireframe) {
      material.wireframe = props.globalWireframe;
      object.nodes[props.modelName].material = material;
    } else {
      object.nodes[props.modelName].material = material;
    }
  });

  return (
    <>
      <Suspense>
          <OrthographicCamera />
          <Html
            className={`structureOptions ${props.optionsOpen}`}
            scale={10}
            distanceFactor={props.labelScaleFactor}
            portal={document.getElementById("portal")}
          >
            <div className="structureOptionsheader">
              <h3>{props.name}</h3>
              <button>+</button>
            </div>
            <div className="structureOptionsbody">
              <label htmlFor={`${props.type.name}`}>Space</label>
              <input
                type="range"
                name={`${props.type.name}`}
                onMouseEnter={() => props.setOrbitControls(false)}
                onMouseLeave={() => props.setOrbitControls(true)}
                min={1}
                max={5}
                onChange={(e) => setSpaceSize(e.target.value)}
              ></input>
            </div>
            {/* <StructureSlider options={props.options}/> */}
            {/* <span>Yessir</span> */}
          </Html>

        <mesh
          ref={ref}
          geometry={object.nodes[props.modelName].geometry}
          material={material}
          scale={[timeScale, normScale, placeScale]}
          position={[timePos, normPos, placePos]}
          rotation={props.relation ? [0, 0, deg_to_rad(90)] : [0, 0, 0]}
          object={object.scene}
          onPointerOver={(e) => props.onHover(ref)}
          onPointerLeave={(e) => props.onHover(null)}
        ></mesh>
      </Suspense>
    </>
  );
};

export default ModelLoader;
