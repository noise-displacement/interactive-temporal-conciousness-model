import { Html, OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controls } from "react-three-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ModelLoader from "../modules/ModelLoader";
import { Null } from "../modules/ModelLoader";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  GlobalControls,
  ModelInfoContainer,
  UiTimeline,
  ModelZoomButtons,
  GlobalWireframeMode,
  ExamplePicker,
  ClipMode,
  ExampleInfo,
} from "./modelControls";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import StructureControls, {
  ModelOptions,
  StructureController,
} from "./structureController";
import { structureTypes } from "./structureInfo";
import ModelStructure from "../modules/ModelStructure";
import { Link } from "react-router-dom";

function pushStructures(currentExample, options) {
  let currentStructures = [];

  for (let i = 0; i < currentExample.structures.length; i++) {
    let structure = currentExample.structures[i];

    currentStructures.push({
      type: structure.type,
      name: structure.name,
      object: structure.type.object.path,
      wireframeObject: structure.type.object.wireframePath,
      modelName: structure.type.object.object,
      color: structure.type.color,
      sizes: {
        social: structure.normSocial,
        structural: structure.normStructural,
        space: structure.space,
      },
      years: {
        start: structure.startYear,
        end: structure.endYear,
      },
      options: {
        wireframe: options.wireframeMode,
        rotation: structure.type.options.rotation,
        timeScale: structure.type.options.timeScale,
        normScale: structure.type.options.normScale,
        placeScale: structure.type.options.placeScale,
      },
    });
  }

  return currentStructures;
}

function timelineLabel(
  yearScale,
  timelineLabels,
  timelineYears,
  labelScaleFactor,
  currentUltrastructureSize
) {
  timelineLabels.length = 0;
  let yearIncrement;
  //let timelineWidth = yearScale.modelScale * 2;

  //refactor med condition function
  if (timelineYears >= 10 && timelineYears <= 100) {
    yearIncrement = 10;
  } else if (timelineYears >= 100 && timelineYears <= 500) {
    yearIncrement = 25;
  } else if (timelineYears >= 500 && timelineYears <= 1000) {
    yearIncrement = 50;
  } else if (timelineYears >= 1000 && timelineYears <= 10000) {
    yearIncrement = 100;
  }

  let currentIncrement = yearIncrement;

  for (
    let i = Number(yearScale.min);
    i <= Number(yearScale.max);
    i += yearIncrement
  ) {
    if (currentIncrement) {
      //console.log(currentIncrement);
      timelineLabels.push(
        <Html
          className="timelineLabel"
          distanceFactor={labelScaleFactor}
          position={[
            yearIncrement +
              i -
              yearScale.max -
              yearScale.modelScale -
              yearIncrement +
              currentUltrastructureSize / 2,
            0.75,
            0,
          ]}
        >
          | <br /> {i}
        </Html>
      );
    }

    currentIncrement += yearIncrement;
  }
}

function ModelCanvas(props) {
  const options = useMemo(
    () => ({
      labels: props.options.labels,
      clipmode: props.options.clipmode,
      globalYearControl: props.options.globalYearControl,
      modelControls: props.options.modelControls,
      wireframeMode: props.options.wireframeMode,
      outlines: props.options.outlines,
      modelInfo: props.options.modelInfo,
      modelZoom: props.options.modelZoom,
      zoomButtons: props.options.zoomButtons,
      timeline: props.options.timeline,
      fullwidth: props.options.fullwidth,
      timelineLabels: props.options.timelineLabels,
      examplePicker: props.options.examplePicker,
    }),
    [props.options]
  );

  let currentExample = props.currentExample;
  //console.log(currentExample);
  const [clipmode, setClipmode] = useState(false);
  const [fromYear, setFromYear] = useState(currentExample.timeline.startYear);
  const [toYear, setToYear] = useState(currentExample.timeline.endYear);
  const [hovered, onHover] = useState(null);
  const [zoomLevel, adjustZoomLevel] = useState(10);
  const [globalWireframe, setGlobalWireframe] = useState(false);
  const [labelScaleFactor, setLabelScaleFactor] = useState(toYear - fromYear);
  const [orbitControls, setOrbitControls] = useState(true);
  const [currentStructures, setCurrentStructures] = useState(
    pushStructures(currentExample, options)
  );

  const updateStructures = useCallback(() => {
    setCurrentStructures(pushStructures(currentExample, options));
  }, [currentExample, options]);
  //console.log("CurrentStructures", currentStructures);
  //console.log("Orbitcontrols", orbitControls);

  const selected = hovered ? [hovered] : undefined;
  const canvasCam = useRef();
  const sphereRadius = 100;

  let axisTagDistance = 100;
  let axesHelper = useRef();

  const yearScale = useMemo(
    () => ({ min: fromYear, max: toYear, modelScale: 100 }),
    [fromYear, toYear]
  );
  const zoomRange = { min: 1, max: 2000 };

  // for (let i = 0; i < currentExample.structures.length; i++) {
  //   let structure = currentExample.structures[i];
  //   //const [state, setState] = useState(3) // eslint-disable-line react-hooks/rules-of-hooks
  //   //console.log(structure);
  //   currentStructures.push({
  //     //state: state,
  //     //setState: setState,
  //     type: structure.type,
  //     name: structure.name,
  //     object: structure.type.object.path,
  //     modelName: structure.type.object.object,
  //     color: structure.type.color,
  //     sizes: {
  //       social: structure.normSocial,
  //       structural: structure.normStructural,
  //       space: structure.space,
  //     },
  //     years: {
  //       start: structure.startYear,
  //       end: structure.endYear,
  //     },
  //     options: {
  //       wireframe: options.wireframeMode,
  //       rotation: structure.type.options.rotation,
  //       timeScale: structure.type.options.timeScale,
  //       normScale: structure.type.options.normScale,
  //       placeScale: structure.type.options.placeScale,
  //     },
  //   });
  // }

  const controlsArray = currentStructures.map((structure) => {
    return {
      name: structure.name,
      sizes: structure.sizes,
      years: structure.years,
    };
  });

  const [currentControls, setCurrentControls] = useState(controlsArray);

  let timelineLabels = [];
  let axesScale = labelScaleFactor / 1000;
  let timelineYears = Number(yearScale.max) - Number(yearScale.min);
  let axisColors = {
    x: "white",
    y: "white",
    z: "white",
  };

  let modelGroup = useRef();
  //console.log(modelGroup);
  let currentUltrastructureSize =
    currentExample.structures[currentExample.structures.length - 1].endYear -
    currentExample.structures[currentExample.structures.length - 1].startYear;
    //console.log(currentUltrastructureSize);

  useEffect(() => {
    //setCurrentStructures(pushStructures(currentExample, options));
    updateStructures();
    //console.log(currentStructures);
    //console.log(orbitControls);
    //console.log(currentStructures);
    //setCurrentControls([...currentControls, 0])
    timelineLabel(
      yearScale,
      timelineLabels,
      timelineYears,
      labelScaleFactor,
      currentUltrastructureSize
    );
    if (canvasCam.current) {
      //canvasCam.current.object.position.z = (timelineYears * 2);
    }
  }, [
    currentExample,
    options,
    yearScale,
    timelineLabels,
    timelineYears,
    labelScaleFactor,
    currentUltrastructureSize,
    updateStructures,
  ]);

  return (
    <div
      className={options.fullwidth ? "modelWrapper fullwidth" : "modelWrapper"}
    >
      <div className="modelContainer">
        {options.modelInfo ? <ModelInfoContainer /> : <Null />}

        <div className="exampleInfoContainer">
          <ExampleInfo currentExample={currentExample} />
          {/* <ExamplePicker
          examples={examples}
          currentExample={currentExample}
          setCurrentExample={setCurrentExample}
          setModelRefresh={setModelRefresh}
        /> */}
        </div>

        <div className="structureOptions">
          {!props.modelRefresh ? (
            currentStructures.map((structure, i) => {
              //console.log(structure);
              return (
                <ModelOptions
                  key={i}
                  i={i}
                  structure={structure}
                  currentControls={currentControls}
                  setCurrentControls={setCurrentControls}
                />
              );
            })
          ) : (
            <Null />
          )}
        </div>

        <div className="bottomControls">
          <div className="controlContainer">
            {options.clipmode ? (
              <ClipMode clipmode={clipmode} setClipmode={setClipmode} />
            ) : (
              <Null />
            )}

            {options.wireframeMode ? (
              <GlobalWireframeMode
                globalWireframe={globalWireframe}
                setGlobalWireframe={setGlobalWireframe}
              />
            ) : (
              <Null />
            )}
          </div>

          <div className="controlContainer">
            {options.timeline || props.modelRefresh !== true ? (
              <Suspense>
                <UiTimeline
                  globalYearControl={options.globalYearControl}
                  fromYear={fromYear}
                  setFromYear={setFromYear}
                  toYear={toYear}
                  setToYear={setToYear}
                />
              </Suspense>
            ) : (
              <Null />
            )}
          </div>

          <div className="controlContainer">
            {options.zoomButtons ? (
              <ModelZoomButtons
                zoomRange={zoomRange}
                zoomLevel={zoomLevel}
                adjustZoomLevel={adjustZoomLevel}
                canvasCam={canvasCam}
              />
            ) : (
              <Null />
            )}
          </div>
        </div>

        <Canvas
          gl={{ localClippingEnabled: true }}
          className="mainCanvas"
          style={{
            background: "#f5f5f5",
            // background: "linear-gradient(315deg, rgba(39,75,109,1) 0%, rgba(27,52,76,1) 100%)"
          }}
          camera={{ position: [0, 5, timelineYears * 2], far: 20000 }}
        >
          <OrbitControls
            ref={canvasCam}
            enableZoom={options.modelZoom}
            minDistance={zoomRange.min}
            maxDistance={zoomRange.max}
            enableRotate={orbitControls}
            zoomSpeed={0.5}
          />

          <ambientLight />
          {/* <pointLight position={[100, 0, 100]} intensity={1} /> */}
          <pointLight position={[-100, 0, -100]} intensity={0.5} />

          <Suspense id="axis">
            {/*<primitive object={useLoader(GLTFLoader, models.axis.path).scene}></primitive>*/}
            {/* <primitive ref={axesHelper} object={new THREE.AxesHelper(1000)}></primitive>*/}
            <mesh>
              <boxGeometry
                ref={axesHelper}
                args={[timelineYears * 10, axesScale, axesScale]}
              />
              <meshPhongMaterial color={axisColors.x} />
            </mesh>

            <mesh rotation={[0, degToRad(90), 0]}>
              <boxGeometry args={[timelineYears * 10, axesScale, axesScale]} />
              <meshPhongMaterial color={axisColors.z} />
            </mesh>

            <mesh rotation={[0, 0, degToRad(90)]}>
              <boxGeometry args={[timelineYears * 10, axesScale, axesScale]} />
              <meshPhongMaterial color={axisColors.y} />
            </mesh>

            <Html
              className="timelineLabel"
              distanceFactor={labelScaleFactor}
              position={[0, axisTagDistance, 0]}
            >
              <span style={{ color: axisColors.y }}>Norms&nbsp;(y)</span>
            </Html>

            <Html
              className="timelineLabel"
              distanceFactor={labelScaleFactor}
              position={[0, 0, axisTagDistance]}
            >
              <span style={{ color: axisColors.z }}>Space&nbsp;(z)</span>
            </Html>

            <Html
              className="timelineLabel"
              distanceFactor={labelScaleFactor}
              position={[axisTagDistance, 30, 0]}
            >
              <span style={{ color: axisColors.x }}>Time&nbsp;(x)</span>
            </Html>
          </Suspense>

          {options.timelineLabels ? (
            (timelineLabel(
              yearScale,
              timelineLabels,
              timelineYears,
              labelScaleFactor,
              currentUltrastructureSize
            ),
            timelineLabels.map((label) => {
              return label;
            }))
          ) : (
            <Null />
          )}

          <group
            ref={modelGroup}
            position={[
              -yearScale.max + currentUltrastructureSize / 2 - 100,
              0,
              0,
            ]}
          >
            {!props.modelRefresh ? (
              currentStructures.map((structure, i) => {
                //console.log(structure);
                return (
                  <Suspense key={i}>
                    <ModelLoader
                      currentControls={currentControls[i]}
                      setCurrentControls={setCurrentControls}
                      i={i}
                      structureNumber={i}
                      state={structure.state}
                      type={structure.type}
                      name={structure.name}
                      yearScale={yearScale}
                      clipmode={
                        structure.type === structureTypes.event ? 0 : clipmode
                      }
                      sphereRadius={sphereRadius}
                      relation={
                        structure.type === structureTypes.relation
                          ? true
                          : false
                      }
                      object={structure.object}
                      wireframeObject={structure.wireframeObject}
                      modelName={structure.modelName}
                      color={structure.color}
                      scaleTime={structure.scaleTime}
                      scaleNorm={structure.scaleNorm}
                      scalePlace={structure.scalePlace}
                      years={structure.years}
                      options={structure.options}
                      onHover={onHover}
                      globalWireframe={globalWireframe}
                      optionsOpen={false}
                      sizes={structure.sizes}
                      distanceFactor={labelScaleFactor}
                      setOrbitControls={setOrbitControls}
                    ></ModelLoader>
                  </Suspense>
                );
              })
            ) : (
              <Null />
            )}

            {options.outlines ? (
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  selection={selected}
                  selectionLayer={30}
                  visibleEdgeColor={0xffffff}
                  edgeStrength={3}
                  blendFunction={BlendFunction.ALPHA}
                ></Outline>
              </EffectComposer>
            ) : (
              <Null />
            )}
          </group>
        </Canvas>
      </div>
    </div>
  );
}

export default ModelCanvas;
