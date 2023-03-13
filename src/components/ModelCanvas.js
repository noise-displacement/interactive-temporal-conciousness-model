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

export const models = {
  cone: {
    relation: true,
    object: "Cone",
    path: "/models/cone.gltf",
    color: "blue",
    info: true,
    name: "Relation",
    infoText: "Establishing a relationship (expectations - rules)",
  },

  cube: {
    object: "Cube",
    path: "/models/cube.glb",
    color: "grey",
    info: true,
    name: "Model",
    infoText: "Wedding: specific types of ceremony, proposal, ring etc.",
  },

  hedron: {
    object: "Icosphere",
    path: "/models/hedron.glb",
    color: "red",
    info: true,
    name: "Structure",
    infoText: "Family, with related life type, values and rules",
  },

  sphere: {
    object: "Sphere",
    path: "/models/sphere.glb",
    color: "green",
    info: true,
    name: "Ultrastructure",
    infoText: "Monogamy-polygamy, endogamy-exogamy etc.",
  },

  axis: {
    object: "Model",
    path: "/models/axis.glb",
    info: false,
  },

  pyramid: {
    object: "Cone",
    path: "/models/pyramid.glb",
    color: "grey",
    info: false,
  },
};

const structureTypes = {
  ultraStructure: {name: "Ultrastructure", object: models.sphere, color: 0x39bd76},
  structure: {name: "Structure", object: models.hedron, color: 0xcc4141},
  model: {name: "Model", object: models.cube, color: 0xffffff},
  relation: {name: "Relation", object: models.cone, color: 0x3a6fe0}
}

const examples = [
  {
    id: 1,
    name: "Example1",
    timeline: {
      startYear: 1300,
      endYear: 2020,
    },

    structures: [
      {
        type: structureTypes.ultraStructure,
        startYear: 1500,
        endYear: 2100,
      },

      {
        type: structureTypes.structure,
        startYear: 1600,
        endYear: 2100,
      },

      {
        type: structureTypes.model,
        startYear: 1900,
        endYear: 1990,
      },
    ],

    relations: [
      {
        id: 1,
        relationName: "Relation 1",
        startYear: 1970,
        endYear: 2010,
      },
    ],
  },

  {
    id: 2,
    name: "Example2",
    timeline: {
      startYear: 1950,
      endYear: 2020,
    },

    structures: [
      {
        name: "Relation 1",
        type: structureTypes.relation,
        startYear: 1990,
        endYear: 2000,
      },

      {
        name: "Relation 2",
        type: structureTypes.relation,
        startYear: 1970,
        endYear: 2010,
      },

      {
        name: structureTypes.model.name,
        type: structureTypes.model,
        startYear: 1900,
        endYear: 1990,
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1600,
        endYear: 2100,
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1500,
        endYear: 2100,
      },
    ],
  },
];

const modelNames = [];

const modelList = Object.keys(models).forEach((model) => {
  modelNames.push(models[model].name);
});

modelNames.push("Relation 1", "Relation 2");

console.log(modelNames);

function timelineLabel(
  yearScale,
  timelineLabels,
  timelineYears,
  labelScaleFactor
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
    yearIncrement = 500;
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
              yearScale.min -
              yearScale.modelScale -
              yearIncrement,
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
  const [currentExample, setCurrentExample] = useState(examples[1]);
  const [clipMode, setClipmode] = useState(1);
  const [fromYear, setFromYear] = useState(currentExample.timeline.startYear);
  const [toYear, setToYear] = useState(currentExample.timeline.endYear);
  const [hovered, onHover] = useState(null);
  const [zoomLevel, adjustZoomLevel] = useState(10);
  const [globalWireframe, setGlobalWireframe] = useState(false);
  const [labelScaleFactor, setLabelScaleFactor] = useState(
    (toYear - fromYear) * 2
  );

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
  const zoomRange = { min: 1, max: 2000 };

  const relations = [];
  const currentStructures = [];

  for(let i = 0; i < currentExample.structures.length; i++) {
    currentStructures.push({
      type: currentExample.structures[i].type,
      name: currentExample.structures[i].name,
      object: currentExample.structures[i].type.object.path,
      modelName: currentExample.structures[i].type.object.object,
      color: currentExample.structures[i].type.color,
      scaleTime: { min: 1, max: 100, default: 100 },
      scaleNorm: { min: 1, max: 100, default: 100 },
      scalePlace: { min: 1, max: 100, default: 100 },
      years: {
        start: currentExample.structures[i].startYear,
        end: currentExample.structures[i].endYear,
      },
      options: {
        wireframe: options.wireframeMode,
        rotation: false,
        timeScale: true,
        normScale: true,
        placeScale: true,
        originFix: false,
      }
    })
  }

  // for (let i = 0; i < currentExample.relations.length; i++) {
  //   relations.push({
  //     name: currentExample.relations[i].relationName,
  //     object: models.cone.path,
  //     modelName: models.cone.object,
  //     color: 0x3a6fe0,
  //     scaleTime: { min: 1, max: 10, default: 3 },
  //     scaleNorm: { min: 1, max: 10, default: 3 },
  //     scalePlace: { min: 1, max: 10, default: 3 },
  //     years: {
  //       start: currentExample.relations[i].startYear,
  //       end: currentExample.relations[i].endYear,
  //     },
  //     options: {
  //       wireframe: options.wireframeMode,
  //       rotation: false,
  //       timeScale: true,
  //       normScale: true,
  //       placeScale: true,
  //       originFix: true,
  //       labels: options.labels,
  //     },
  //   });
  // }

  // relations.push(
  //   {
  //     name: "Relation 1",
  //     object: models.cone.path,
  //     modelName: models.cone.object,
  //     color: 0x3a6fe0,
  //     scaleTime: { min: 1, max: 10, default: 3 },
  //     scaleNorm: { min: 1, max: 10, default: 3 },
  //     scalePlace: { min: 1, max: 10, default: 3 },
  //     years: { start: 2000, end: 2010 },
  //     options: {
  //       wireframe: options.wireframeMode,
  //       rotation: false,
  //       timeScale: true,
  //       normScale: true,
  //       placeScale: true,
  //       originFix: true,
  //       labels: options.labels,
  //     },
  //   },

  //   {
  //     name: "Relation 2",
  //     object: models.cone.path,
  //     modelName: models.cone.object,
  //     color: 0x3a6fe0,
  //     scaleTime: { min: 1, max: 10, default: 3 },
  //     scaleNorm: { min: 1, max: 10, default: 3 },
  //     scalePlace: { min: 1, max: 10, default: 3 },
  //     years: { start: 1997, end: 2010 },
  //     options: {
  //       wireframe: options.wireframeMode,
  //       rotation: false,
  //       timeScale: true,
  //       normScale: true,
  //       placeScale: true,
  //       originFix: true,
  //       labels: options.labels,
  //     },
  //   }
  // );

  let timelineLabels = [];
  let axesScale = labelScaleFactor / 1000;
  let timelineYears = Number(yearScale.max) - Number(yearScale.min);

  useEffect(() => {
    timelineLabel(yearScale, timelineLabels, timelineYears, labelScaleFactor);
    if (canvasCam.current) {
      //canvasCam.current.object.position.z = (timelineYears * 2);
    }
  });

  return (
    <div
      className={options.fullwidth ? "modelWrapper fullwidth" : "modelWrapper"}
    >
      <div className="modelContainer">
        {options.modelInfo ? <ModelInfoContainer /> : <Null />}

        <div className="bottomControls">
          {options.timeline ? (
            <UiTimeline
              globalYearControl={options.globalYearControl}
              fromYear={fromYear}
              toYear={toYear}
              clipMode={clipMode}
              setToYear={setToYear}
              setFromYear={setFromYear}
              setClipmode={setClipmode}
            />
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

        {options.examplePicker ? (
          <ExamplePicker
            currentExample={currentExample}
            setCurrentExample={setCurrentExample}
            examples={examples}
          />
        ) : (
          <Null />
        )}

        <Controls.Provider>
          <Controls.Canvas
            gl={{ localClippingEnabled: true }}
            className="mainCanvas"
            style={{ background: "#ddd" }}
            camera={{ position: [0, 5, timelineYears * 2], far: 20000 }}
          >
            <OrbitControls
              ref={canvasCam}
              enableZoom={options.modelZoom}
              minDistance={zoomRange.min}
              maxDistance={zoomRange.max}
            />

            <ambientLight />
            <pointLight position={[10, 0, 10]} intensity={1} />
            <pointLight position={[-10, 0, -10]} intensity={1} />

            <Suspense id="axis">
              {/*<primitive object={useLoader(GLTFLoader, models.axis.path).scene}></primitive>*/}
              {/* <primitive ref={axesHelper} object={new THREE.AxesHelper(1000)}></primitive>*/}
              <mesh>
                <boxGeometry
                  ref={axesHelper}
                  args={[timelineYears * 10, axesScale, axesScale]}
                />
                <meshPhongMaterial color={"red"} />
              </mesh>

              <mesh rotation={[0, degToRad(90), 0]}>
                <boxGeometry
                  args={[timelineYears * 10, axesScale, axesScale]}
                />
                <meshPhongMaterial color={"green"} />
              </mesh>

              <mesh rotation={[0, 0, degToRad(90)]}>
                <boxGeometry
                  args={[timelineYears * 10, axesScale, axesScale]}
                />
                <meshPhongMaterial color={"blue"} />
              </mesh>

              {/* <Html transform={true} distanceFactor={labelScaleFactor}>
                <div
                  style={{
                    color: "red",
                    fontSize: zoomLevel / 10,
                    background: "red",
                    padding: `0 ${zoomLevel * 10}vw`,
                  }}
                >:</div>
              </Html>

              <Html transform={true} rotation={[0, degToRad(90), 0]} distanceFactor={labelScaleFactor}>
                <div
                  style={{
                    color: "green",
                    fontSize: zoomLevel / 10,
                    background: "green",
                    padding: `0 ${zoomLevel * 10}vw`,
                  }}
                >:</div>
              </Html> */}

              <Html
                distanceFactor={labelScaleFactor}
                position={[0, axisTagDistance, 0]}
              >
                <span style={{ color: "blue" }}>Norms&nbsp;(y)</span>
              </Html>

              <Html
                distanceFactor={labelScaleFactor}
                position={[0, 0, axisTagDistance]}
              >
                <span style={{ color: "green" }}>Space&nbsp;(y)</span>
              </Html>

              <Html
                distanceFactor={labelScaleFactor}
                position={[axisTagDistance, 0, 0]}
              >
                <span style={{ color: "red" }}>Time&nbsp;(y)</span>
              </Html>
            </Suspense>

            {options.timelineLabels ? (
              (timelineLabel(
                yearScale,
                timelineLabels,
                timelineYears,
                labelScaleFactor
              ),
              timelineLabels.map((label) => {
                return label;
              }))
            ) : (
              <Null />
            )}

            <group position={[-yearScale.min - 100, 0, 0]}>
              {relations.map((relation) => {
                return (
                  <ModelLoader
                    key={relation.name}
                    name={relation.name}
                    yearScale={yearScale}
                    clipMode={clipMode}
                    sphereRadius={sphereRadius}
                    relation={true}
                    object={relation.object}
                    modelName={relation.modelName}
                    color={relation.color}
                    scaleTime={relation.scaleTime}
                    scaleNorm={relation.scaleNorm}
                    scalePlace={relation.scalePlace}
                    years={relation.years}
                    options={relation.options}
                    onHover={onHover}
                    globalWireframe={globalWireframe}
                  ></ModelLoader>
                );
              })}

              {currentStructures.map((structure) => {
                return(
                  <ModelLoader
                    key={structure.name}
                    type={structure.type}
                    name={structure.name}
                    yearScale={yearScale}
                    clipMode={clipMode}
                    sphereRadius={sphereRadius}
                    relation={structure.type === structureTypes.relation ? true : false}
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
                  ></ModelLoader>
                )
              })}

              {/* <ModelLoader
                name="Model"
                object={models.cube.path}
                modelName={models.cube.object}
                color={0xffffff}
                clipMode={clipMode}
                yearScale={yearScale}
                scaleTime={{ min: 5, max: 15, default: 15 }}
                scaleNorm={{ min: 5, max: 15, default: 15 }}
                scalePlace={{ min: 5, max: 15, default: 15 }}
                globalWireframe={globalWireframe}
                years={{
                  start: currentExample.model.startYear,
                  end: currentExample.model.endYear,
                }}
                onHover={onHover}
                options={{
                  wireframe: options.wireframeMode,
                  rotation: false,
                  timeScale: true,
                  normScale: true,
                  placeScale: true,
                  originFix: false,
                }}
              ></ModelLoader>

              <ModelLoader
                name="Structure"
                object={models.hedron.path}
                modelName={models.hedron.object}
                color={0xcc4141}
                clipMode={clipMode}
                yearScale={yearScale}
                scaleTime={{ min: 10, max: 30, default: 30 }}
                scaleNorm={{ min: 10, max: 30, default: 30 }}
                scalePlace={{ min: 10, max: 30, default: 30 }}
                onHover={onHover}
                hoveredObject={hovered}
                globalWireframe={globalWireframe}
                years={{
                  start: currentExample.structure.startYear,
                  end: currentExample.structure.endYear,
                }}
                options={{
                  wireframe: options.wireframeMode,
                  rotation: false,
                  timeScale: true,
                  normScale: true,
                  placeScale: true,
                  originFix: false,
                }}
              ></ModelLoader>

              <ModelLoader
                name="Ultrastructure"
                object={models.sphere.path}
                modelName={models.sphere.object}
                color={0x39bd76}
                clipMode={1}
                scaleTime={{ min: 25, max: 100, default: 100 }}
                scaleNorm={{ min: 25, max: 100, default: 100 }}
                scalePlace={{ min: 25, max: 100, default: 100 }}
                yearScale={yearScale}
                years={{
                  start: currentExample.ultraStructure.startYear,
                  end: currentExample.ultraStructure.endYear,
                }}
                onHover={onHover}
                hoveredObject={hovered}
                globalWireframe={globalWireframe}
                options={{
                  wireframe: options.wireframeMode,
                  rotation: false,
                  timeScale: true,
                  normScale: true,
                  placeScale: true,
                  originFix: false,
                }}
              ></ModelLoader> */}

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
