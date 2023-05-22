import { useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRef } from "react";
import { structureTypes } from "../components/structureInfo";

export function deg_to_rad(deg) {
  return deg * (Math.PI / 180);
}

export const Null = () => <></>;

const ModelLoader = function (props) {
  let ref = useRef();
  //console.log(props);

  let object = useLoader(
    GLTFLoader,
    props.globalWireframe && props.wireframeObject
      ? props.wireframeObject
      : props.object
  );

  let spaceSize = props.currentControls.sizes.space;
  // let structuralSize = props.currentControls.sizes.structural;
  let structuralSize = 0;
  // let socialSize = props.currentControls.sizes.social;
  let socialSize = 0;
  let structureType = props.type;
  let years = props.currentControls.years;
  let norms = props.currentControls.norms;

  console.log(norms);

    if(norms.societal && socialSize < 2) {
      socialSize++;
    } else if(!norms.societal && socialSize > 0) {
      socialSize--;
    }

    if(norms.cultural && socialSize < 2) {
      socialSize++;
    } else if(!norms.cultural && socialSize > 0) {
      socialSize--;
    }

    if(norms.religious && structuralSize < 2) {
      structuralSize++;
    } else if(!norms.religious && structuralSize > 0) {
      structuralSize--;
    }

    if(norms.state && structuralSize < 2) {
      structuralSize++;
    } else if(!norms.state && structuralSize > 0) {
      structuralSize--;
    }

  //norms.societal ? socialSize++ : socialSize > 0 ? socialSize-- : socialSize;
  //norms.cultural ? socialSize++ : socialSize--;

  // norms.religious ? structuralSize++ : structuralSize--;
  // norms.state ? structuralSize++ : structuralSize--;

    console.log(props.name, structuralSize, socialSize);

  //console.log(norms);
  //console.log(props);
  //console.log(props.i);

  //Event size midlertidig, må være modulær
  let eventSize = 2;
  let defaultScale = 100;
  let defaultSize =
    structureType === structureTypes.event ? eventSize : defaultScale;

  let startYear = Number(years.start);
  let endYear = Number(years.end);

  let timePos = 0;
  let normPos = 0;
  let placePos = 0;

  let normScale;
  let placeScale;
  let timeScale;

  if (structureType === structureTypes.relation) {
    if (socialSize === 1) socialSize = 1;
    if (socialSize === 2) socialSize = 1.25;

    if (structuralSize === 1) structuralSize = 1;
    if (structuralSize === 2) structuralSize = 1.25;

    if (structuralSize === 2 && socialSize === 2) {
      socialSize = 1.25;
      structuralSize = 1.25;
    }

    normScale = (endYear - startYear) / 2;
    //timeScale = defaultSize / 2 * structuralSize + 5;
    timeScale = -structuralSize * socialSize * (defaultSize / 2);
    normPos = -defaultSize * structuralSize + defaultSize * socialSize;
    placeScale = defaultSize * spaceSize + 10;
    timePos = startYear + normScale;
  } else if (structureType === structureTypes.event) {
    normScale = eventSize;
    timeScale = eventSize;
    placeScale = eventSize;
    timePos = startYear + timeScale - 2;
  } else if (structureType === structureTypes.ultraStructure) {
    if (socialSize === 1) socialSize = 1;
    if (socialSize === 2) socialSize = 1.5;

    if (structuralSize === 1) structuralSize = 1;
    if (structuralSize === 2) structuralSize = 1.5;

    if (structuralSize === 2 && socialSize === 2) {
      socialSize = 1.5;
      structuralSize = 1.5;
    }

    normScale = -structuralSize * socialSize * defaultSize - 100;
    timeScale = (endYear - startYear) / 2;
    normPos = -defaultSize * structuralSize + defaultSize * socialSize;
    placeScale = defaultSize * spaceSize + 100;
    timePos = startYear + timeScale;
  } else {
    if (socialSize === 1) socialSize = 1;
    if (socialSize === 2) socialSize = 1.5;

    if (structuralSize === 1) structuralSize = 1;
    if (structuralSize === 2) structuralSize = 1.5;

    if (structuralSize === 2 && socialSize === 2) {
      socialSize = 1.5;
      structuralSize = 1.5;
    }

    // normScale = defaultSize * structuralSize;
    //normScale = defaultSize * (structuralSize + (2 * (defaultSize >= 0) + socialSize * (defaultSize >= 0) ))
    //console.log(structuralSize, socialSize, defaultSize);
    normScale = -structuralSize * socialSize * defaultSize;
    timeScale = (endYear - startYear) / 2;
    normPos = -defaultSize * structuralSize + defaultSize * socialSize;

    placeScale = defaultSize * spaceSize;
    timePos = startYear + timeScale;
  }

  let material = new THREE.MeshPhongMaterial({
    color: props.color,
    side: THREE.DoubleSide,
    flatShading: true,
    shadowSide: THREE.DoubleSide,
    wireframe: false,
    clipShadows: true,
    clippingPlanes:
      structureType === structureTypes.event
        ? null
        : [new THREE.Plane(new THREE.Vector3(0, -props.clipmode, 0), 0)],
  });

  useEffect(() => {
    // if (props.globalWireframe) {
    //   material.wireframe = props.globalWireframe;
    //   object.nodes[props.modelName].material = material;
    // } else {
    //   object.nodes[props.modelName].material = material;
    // }
  });

  return (
    <>
      <Suspense>
        <mesh
          ref={ref}
          geometry={object.nodes[props.modelName].geometry}
          material={material}
          scale={[timeScale, normScale, placeScale + props.i]}
          position={[timePos, normPos, placePos]}
          rotation={
            props.relation
              ? [0, 0, deg_to_rad(90)]
              : structureType === structureTypes.event
              ? [0, deg_to_rad(180), 0]
              : [0, 0, 0]
          }
          object={object.scene}
          onPointerOver={(e) => props.onHover(ref)}
          onPointerLeave={(e) => props.onHover(null)}
        ></mesh>
      </Suspense>
    </>
  );
};

export default ModelLoader;
