import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Null } from "../modules/ModelLoader";
import { models } from "./structureInfo";

export function UiTimeline(props) {
  return (
    <div id="timeline">
      <div className="wrapper">
        {props.globalYearControl ? (
          <div className="yearInput">
            <label htmlFor="fromYear">From year</label>
            <input
              name="fromYear"
              type="number"
              value={props.fromYear}
              onChange={(e) => props.setFromYear(e.target.value)}
            ></input>
          </div>
        ) : (
          <Null />
        )}

        {props.globalYearControl ? (
          <div className="yearInput">
            <label htmlFor="toYear">To year</label>
            <input
              name="toYear"
              type="number"
              value={props.toYear}
              onChange={(e) => props.setToYear(e.target.value)}
            ></input>
          </div>
        ) : (
          <Null />
        )}
      </div>
    </div>
  );
}

export function GlobalWireframeMode(props) {
  return (
    <div className="globalWireframe">
      <label htmlFor="globalWireframeMode">Wireframe</label>
      <input
        type="checkbox"
        name="globalWireframeMode"
        id="globalWireframeMode"
        onChange={() => props.setGlobalWireframe(!props.globalWireframe)}
      />
    </div>
  );
}

function InfoCollapsible(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="header collapsible" onClick={(e) => setOpen(!open)}>
        <h3>{props.name}</h3>
        <span className="material-symbols-outlined">add</span>
      </button>
      {open && (
        <div className="moreInfo">
          <p>{props.info}</p>
          <button>More info</button>
        </div>
      )}
    </>
  );
}

function ExampleCollapsible(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="example">
      <button className="header collapsible" onClick={(e) => setOpen(!open)}>
        <h3>{props.name}</h3>
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}

export function ModelZoomButtons(props) {
  let prevZoomLevel = props.zoomLevel;

  return (
    <>
      <div className="zoomButtonsContainer">
        <button
          className="zoomButton"
          onMouseDown={() => {
            if (prevZoomLevel > props.zoomRange.min) {
              props.adjustZoomLevel(prevZoomLevel - 7);
            }
            props.canvasCam.current.object.position.z = props.zoomLevel;
          }}
        >
          <span className="material-symbols-outlined">add</span>
        </button>

        <button
          className="zoomButton"
          onClick={() => {
            if (prevZoomLevel < props.zoomRange.max) {
              props.adjustZoomLevel(prevZoomLevel + 7);
            }
            props.canvasCam.current.object.position.z = props.zoomLevel;
          }}
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
    </>
  );
}

export function ModelInfoContainer() {
  let infoModels = [];

  for (let infoModel in models) {
    if (models[infoModel].info) {
      infoModels.push(models[infoModel]);
    }
  }

  return (
    <div className="modelInfoContainer">
      <div className="containerWrapper">
        <ul id="modelInfoList">
          {infoModels.map((item) => {
            return (
              <li
                key={item.name}
                style={{
                  backgroundColor: item.color,
                  border: `5px solid ${item.color}`,
                }}
              >
                <InfoCollapsible name={item.name} info={item.infoText} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function GlobalControls(props) {
  return (
    <div id="globalControls">
      <span className="topLabel">global controls</span>
      <div className="controls">
        {props.options.splitMode ? (
          <div className="splitMode">
            <label htmlFor="clipMode">Split mode</label>
            <input
              name="clipMode"
              type="checkbox"
              checked={props.clipMode}
              onChange={() => {
                props.setClipmode(!props.clipMode);
              }}
            />
          </div>
        ) : (
          <Null />
        )}

        {props.options.wireframeMode ? (
          <div className="wireframeModes"></div>
        ) : (
          <Null />
        )}
      </div>

      {props.options.globalYearControl ? (
        <div className="globalYears">
          <label htmlFor="fromYear">From year</label>
          <input
            name="fromYear"
            type="number"
            value={props.fromYear}
            onChange={(e) => props.setFromYear(e.target.value)}
          ></input>

          <label htmlFor="toYear">To year</label>
          <input
            name="toYear"
            type="number"
            value={props.toYear}
            onChange={(e) => props.setToYear(e.target.value)}
          ></input>
        </div>
      ) : (
        <Null />
      )}

      <div className="controlText">
        <span>Lmb + Pan = Rotate camera</span>
        <span>Scroll = Zoom</span>
      </div>
    </div>
  );
}

export function ExamplePicker(props) {
  return (
    <div className="examplePickerContainer">
      <ul>
        {props.examples.map((example) => {
          return (
            <li key={example.id}>
              <button
                onClick={() => {
                  props.setCurrentExample(example);
                  props.setModelRefresh(true);
                  props.setModelRefresh(false);
                }}
              >
                {example.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ExampleInfo(props) {
  let currentExample = props.currentExample;
  console.log(currentExample);
  return (
    <div className="exampleInfo">
      <h1>{currentExample.name}</h1>
      <p>{currentExample.info}</p>
      <span>- {currentExample.author}</span>
    </div>
  );
}
