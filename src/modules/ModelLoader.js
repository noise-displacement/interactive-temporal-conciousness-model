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

import useModelOptions from "../store/useModelOptions";
import { structureTypes } from "../components/structureInfo";

export function deg_to_rad(deg) {
  return deg * (Math.PI / 180);
}

export const Null = () => <></>;

const ModelLoader = function (props) {
  let ref = useRef();
  //console.log(props);

  let object = useLoader(GLTFLoader, props.globalWireframe && props.wireframeObject ? props.wireframeObject : props.object);

  let spaceSize = props.currentControls.sizes.space;
  let structuralSize = props.currentControls.sizes.structural;
  let socialSize = props.currentControls.sizes.social;
  let structureType = props.type;
  let years = props.currentControls.years;
  //console.log(props);
  //console.log(props.i);

  let eventSize = 5;
  let defaultScale = 100;
  let defaultSize = structureType === structureTypes.event ? eventSize : defaultScale;

  let startYear = Number(years.start);
  let endYear = Number(years.end);

  let timePos = 0;
  let normPos = 0;
  let placePos = 0;

  let normScale;
  let placeScale;
  let timeScale;

  if (structureType === structureTypes.relation) {
    normScale = (endYear - startYear) / 2;
    timeScale = defaultSize * structuralSize;
    placeScale = defaultSize * structuralSize;
    timePos = startYear + normScale;
  } else if(structureType === structureTypes.event) {
    normScale = eventSize;
    timeScale = eventSize;
    placeScale = eventSize;
    timePos = startYear + timeScale;
  } else {
    normScale = defaultSize * structuralSize;
    timeScale = (endYear - startYear) / 2;
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
    clippingPlanes: [
      new THREE.Plane(new THREE.Vector3(0, -props.clipmode, 0), 0),
    ],
  });

  material.onBeforeCompile = function( shader ) {
    shader.fragmentShader = shader.fragmentShader.replace(
      `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
      `gl_FragColor = ( gl_FrontFacing ) ? vec4( outgoingLight, diffuseColor.a ) : vec4( diffuse, opacity );`
    );
};

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
          scale={[timeScale, normScale, (placeScale + props.i)]}
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
