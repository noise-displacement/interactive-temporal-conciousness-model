import { Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import { useControl } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";

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

  const options = props.options;

  const scaleTime = {
    min: props.scaleTime.min,
    max: props.scaleTime.max,
    default: props.scaleTime.default,
  };

  const scaleNorm = {
    min: props.scaleNorm.min,
    max: props.scaleNorm.max,
    default: props.scaleNorm.default,
  };

  const scalePlace = {
    min: props.scalePlace.min,
    max: props.scalePlace.max,
    default: props.scalePlace.default,
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

  const fromYearOpt = useControl(
    "Start year",
    props.relation
      ? {
          type: "string",
          value: props.years.start.toString(),
          group: props.name,
        }
      : { component: Null }
  );

  const toYearOpt = useControl(
    "End year",
    props.relation
      ? {
          type: "string",
          value: props.years.end.toString(),
          group: props.name,
        }
      : { component: Null }
  );

  const scaleTimeOpt = useControl(
    "Time scale",
    options.timeScale
      ? {
          type: "number",
          value: scaleTime.default,
          min: scaleTime.min,
          max: scaleTime.max,
          distance: 10,
          group: props.name,
        }
      : { component: Null }
  );

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

  let timeScale = options.timeScale ? scaleTimeOpt : scaleTime.default;
  let normScale = options.normScale
    ? (-scaleNormStructuralOpt * scaleNormCulturalOpt) / scaleNorm.max
    : scaleNorm.default; // Aligns normScale correctly on the norm scale.
  let placeScale = options.placeScale ? scalePlaceOpt : scalePlace.default;

  if (props.relation) {
    // Weird solution. Don't fully understand why we have to multiply by 2 and subtract sphereRadius.
    // Fix if enough time at end.
    let valuePerYear = (100 / (props.yearScale.max - props.yearScale.min)) * 2;

    timePos =
      (Number(fromYearOpt) - props.yearScale.min) * valuePerYear -
      props.sphereRadius +
      timeScale;

    eventPos = Number(timePos) - timeScale;
  }

  normPos = options.normScale
    ? (-scaleNormStructuralOpt + scaleNormCulturalOpt) / 2
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

  //Gets the node of the model name e.g Sphere or Icosphere and sets the material and color dynamically after object is loaded
  useEffect(() => {
    object.nodes[props.modelName].material = material;
  });

  return (
    <>
      {props.relation ? (
        <>
          <group dispose={null}>
            <Event position={[eventPos, normPos, placePos]} />
            <mesh
              geometry={object.nodes[props.modelName].geometry}
              material={material}
              scale={[normScale, timeScale, placeScale]}
              position={[timePos, normPos, placePos]}
              rotation={[0, 0, deg_to_rad(90)]}
              ref={ref}
              onPointerOver={(e) => props.onHover(ref)}
              onPointerLeave={(e) => props.onHover(null)}
            ></mesh>
          </group>

          {props.options.labels ? (
            <Html center position={[eventPos, normPos - 1, placePos]}>
              <div className="eventTag">
                <span>Year: {fromYearOpt}</span>
              </div>
            </Html>
          ) : (
            <Null />
          )}
        </>
      ) : (
        <Suspense>
          <primitive
            ref={ref}
            scale={[timeScale, normScale, placeScale]}
            position={[timePos, normPos, placePos]}
            rotation={props.rotation}
            object={object.scene}
            onPointerOver={(e) => props.onHover(ref)}
            onPointerLeave={(e) => props.onHover(null)}
          ></primitive>
        </Suspense>
      )}
    </>
  );
};

export default ModelLoader;
