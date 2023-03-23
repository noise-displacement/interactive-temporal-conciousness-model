import { Html, OrbitControls, Environment } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
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
} from "./modelControls";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import StructureControls, { StructureController } from "./structureController";
import { structureTypes } from "./structureInfo";

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
  let currentExample = props.currentExample;
  const [clipMode, setClipmode] = useState(1);
  const [fromYear, setFromYear] = useState(currentExample.timeline.startYear);
  const [toYear, setToYear] = useState(currentExample.timeline.endYear);
  const [hovered, onHover] = useState(null);
  const [zoomLevel, adjustZoomLevel] = useState(10);
  const [globalWireframe, setGlobalWireframe] = useState(false);
  const [labelScaleFactor, setLabelScaleFactor] = useState(toYear - fromYear);
  const [orbitControls, setOrbitControls] = useState(true);

  const modelNames = currentExample.structures.map((structure) => {
    return structure.name;
  });

  //console.log(currentExample);

  const selected = hovered ? [hovered] : undefined;
  const canvasCam = useRef();
  //console.log(canvasCam);

  const options = {
    labels: props.options.labels,
    splitMode: props.options.splitMode,
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
  };

  const sphereRadius = 100;

  let axisTagDistance = 100;
  let axesHelper = useRef();
  //console.log(axesHelper);

  const yearScale = { min: fromYear, max: toYear, modelScale: 100 };
  const zoomRange = { min: 1, max: 20000 };

  const relations = [];
  const currentStructures = [];
  const structureObjects = [];
  const currentControls = [];

  for (let i = 0; i < currentExample.structures.length; i++) {
    let structure = currentExample.structures[i];
    //console.log(structure);
    currentStructures.push({
      type: structure.type,
      name: structure.name,
      object: structure.type.object.path,
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

  useEffect(() => {
    currentStructures.length = 0;
    //console.log(orbitControls);
    console.log(currentStructures);
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
  });

  return (
    <div
      className={options.fullwidth ? "modelWrapper fullwidth" : "modelWrapper"}
    >
      <div className="modelContainer">
        <div className="portal"></div>
        {options.modelInfo ? <ModelInfoContainer /> : <Null />}

        {/* <StructureControls structures={currentExample.structures} /> */}

        {/* {currentExample.structures.map((structure) => {
          //console.log(structure);
          return(
            <StructureController structure={structure} />
          )
        })} */}

        {currentStructures.map((structure) => {
          //console.log(structure);
          return (
            <div className="optionsNew">
              <span>{structure.name}</span>
              <label htmlFor="">Space</label>
              <input
                type="range"
                min={1}
                max={5}
                onChange={(e) => (structure.sizes.space = e.target.value)}
              ></input>
            </div>
          );
        })}

        <div className="bottomControls">
          {options.timeline || props.modelRefresh !== true ? (
            <Suspense>
              <UiTimeline
                globalYearControl={options.globalYearControl}
                fromYear={fromYear}
                setFromYear={setFromYear}
                toYear={toYear}
                setToYear={setToYear}
                clipMode={clipMode}
                setClipmode={setClipmode}
              />
            </Suspense>
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

        <Controls.Provider>
          <Controls.Canvas
            gl={{ localClippingEnabled: true }}
            className="mainCanvas"
            style={{
              background:
                "linear-gradient(315deg, rgba(39,75,109,1) 0%, rgba(27,52,76,1) 100%)",
            }}
            camera={{ position: [0, 5, timelineYears * 2], far: 20000 }}
          >
            <OrbitControls
              ref={canvasCam}
              enableZoom={options.modelZoom}
              minDistance={zoomRange.min}
              maxDistance={zoomRange.max}
              enableRotate={orbitControls}
            />

            <ambientLight />
            <pointLight position={[100, 0, 100]} intensity={0.1} />
            <pointLight position={[-100, 0, -100]} intensity={0.1} />

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
                <boxGeometry
                  args={[timelineYears * 10, axesScale, axesScale]}
                />
                <meshPhongMaterial color={axisColors.z} />
              </mesh>

              <mesh rotation={[0, 0, degToRad(90)]}>
                <boxGeometry
                  args={[timelineYears * 10, axesScale, axesScale]}
                />
                <meshPhongMaterial color={axisColors.y} />
              </mesh>

              <Html
                distanceFactor={labelScaleFactor}
                position={[0, axisTagDistance, 0]}
              >
                <span style={{ color: axisColors.y }}>Norms&nbsp;(y)</span>
              </Html>

              <Html
                distanceFactor={labelScaleFactor}
                position={[0, 0, axisTagDistance]}
              >
                <span style={{ color: axisColors.z }}>Space&nbsp;(z)</span>
              </Html>

              <Html
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
              {currentStructures.map((structure, i) => {
                //console.log(i);
                if (!props.modelRefresh) {
                  return (
                    <Suspense>
                      <ModelLoader
                        key={i}
                        structureNumber={i}
                        type={structure.type}
                        name={structure.name}
                        yearScale={yearScale}
                        clipMode={
                          structure.type === structureTypes.event ? 0 : clipMode
                        }
                        sphereRadius={sphereRadius}
                        relation={
                          structure.type === structureTypes.relation
                            ? true
                            : false
                        }
                        object={structure.object}
                        modelName={structure.modelName}
                        color={structure.color}
                        scaleTime={structure.scaleTime}
                        scaleNorm={structure.scaleNorm}
                        scalePlace={structure.scalePlace}
                        years={structure.years}
                        options={structure.options}
                        onHover={onHover}
                        globalWireframe={globalWireframe}
                        currentControls={currentControls}
                        optionsOpen={false}
                        sizes={structure.sizes}
                        distanceFactor={labelScaleFactor}
                        setOrbitControls={setOrbitControls}
                      ></ModelLoader>
                    </Suspense>
                  );
                } else {
                  return <Null />;
                }
              })}

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
          </Controls.Canvas>

          {options.modelControls ? (
            <Controls
              defaultClosedGroups={modelNames}
              title="Model controls"
              id="modelControls"
            />
          ) : (
            <Null />
          )}
        </Controls.Provider>
      </div>
    </div>
  );
}

export default ModelCanvas;
