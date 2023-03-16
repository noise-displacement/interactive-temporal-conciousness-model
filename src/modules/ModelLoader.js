import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import { useControl } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";
import { StructureController, StructureSlider, useStructureSlider } from "../components/structureController";

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

  //console.log(props);

  let defaultScale = 100;
  let defaultSize = props.type.name === "Event" ? 10 : defaultScale;
  let minScale = 1;

  // Fiks hovered outlines
  // if(props.hoveredObject !== ref) {
  //   console.log("not same");
  // } else {
  //   console.log("same");
  // }

  const options = props.options;

  const scaleTime = {
    min: minScale,
    max: defaultScale,
    default: defaultSize,
  };

  const scaleNorm = {
    min: minScale,
    max: defaultScale,
    default: defaultSize,
  };

  const scalePlace = {
    min: minScale,
    max: defaultScale,
    default: defaultSize,
  };

  let timePos = 0;
  let normPos = 0;
  let placePos = 0;
  let eventPos = 0;

  //Options

  const wireframeMode = useControl(
    "Wireframe",
    options.wireframe
      ? {
          type: "boolean",
          value: false,
          group: props.name,
        }
      : { component: Null }
  );

  //console.log(wireframeMode);

  // const fromYearOpt = useControl(
  //   "Start year",
  //   props.relation
  //     ? {
  //         type: "string",
  //         value: props.years.start.toString(),
  //         group: props.name,
  //       }
  //     : { component: Null }
  // );

  const fromYearOpt = useControl("Start year", {
    type: "string",
    value: props.years.start.toString(),
    group: props.name,
  });

  // const toYearOpt = useControl(
  //   "End year",
  //   props.relation
  //     ? {
  //         type: "string",
  //         value: props.years.end.toString(),
  //         group: props.name,
  //       }
  //     : { component: Null }
  // );

  const toYearOpt = useControl("End year", {
    type: "string",
    value: props.years.end.toString(),
    group: props.name,
  });

  // const scaleTimeOpt = useControl(
  //   "Time scale",
  //   options.timeScale
  //     ? {
  //         type: "number",
  //         value: scaleTime.default,
  //         min: scaleTime.min,
  //         max: scaleTime.max,
  //         distance: 10,
  //         group: props.name,
  //       }
  //     : { component: Null }
  // );

  const scaleNormCulturalOpt = useControl(
    "Cultural norms",
    options.normScale
      ? {
          type: "number",
          value: scaleNorm.default,
          min: scaleNorm.min,
          max: scaleNorm.max,
          distance: 10,
          group: props.name,
        }
      : { component: Null }
  );

  const scaleNormStructuralOpt = useControl(
    "Structural norms",
    options.normScale
      ? {
          type: "number",
          value: scaleNorm.default,
          min: scaleNorm.min,
          max: scaleNorm.max,
          distance: 10,
          group: props.name,
        }
      : { component: Null }
  );

  const scalePlaceOpt = useControl(
    "Place scale",
    options.placeScale
      ? {
          type: "number",
          value: scalePlace.default,
          min: scalePlace.min,
          max: scalePlace.max,
          distance: 10,
          group: props.name,
        }
      : { component: Null }
  );

  //let valuePerYear = (100 / (props.yearScale.max - props.yearScale.min)) * 2;

  let timeScale = options.timeScale ? ((toYearOpt - fromYearOpt) / 2) : scaleTime.default;
  //console.log(timeScale, props.name);

  let normScale = options.normScale
    ? (((-scaleNormStructuralOpt * scaleNormCulturalOpt) / scaleNorm.max) * timeScale / 100) 
    : scaleNorm.default; // Aligns normScale correctly on the norm scale.

  let placeScale = options.placeScale ? scalePlaceOpt * timeScale / 100 : scalePlace.default;

  timePos = Number(fromYearOpt) + timeScale;
  //console.log(timePos, props.name, timeScale);
  normPos = options.normScale
    ? ((-scaleNormStructuralOpt + scaleNormCulturalOpt) / 2)
    : 0;
  placePos = 0;

  // let inputColor = props.color;
  // console.log("Input: " + inputColor);
  // let hoverColor = ColorLuminance(inputColor, 1);
  // console.log("Hover color: " + hoverColor);
  // let [color, setColor] = useState(inputColor);
  // onPointerOver={(e) => {setColor(0x000111); console.log("Enter: " + color)}}
  // onPointerLeave={(e) => {setColor(inputColor); console.log("Leave: " + color)}}

  let material = new THREE.MeshPhongMaterial({
    color: props.color,
    side: THREE.DoubleSide,
    flatShading: true,
    shadowSide: THREE.DoubleSide,
    wireframe: wireframeMode,
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
          <Html className={`structureOptions ${props.optionsOpen}`} position={[timePos - timeScale / 2, timeScale / 2, 0]}>
            {/* <StructureSlider options={props.options}/> */}
            {/* <span>Yessir</span> */}
          </Html>

          <mesh
            ref={ref}
            geometry={object.nodes[props.modelName].geometry}
            material={material}
            scale={[timeScale, normScale, placeScale]}
            position={[timePos, normPos, placePos]}
            rotation={props.relation ? [0, 0, deg_to_rad(-90)] : [0, 0, 0]}
            object={object.scene}
            onPointerOver={(e) => props.onHover(ref)}
            onPointerLeave={(e) => props.onHover(null)}
          ></mesh>
        </Suspense>
    </>
  );
};

export default ModelLoader;
