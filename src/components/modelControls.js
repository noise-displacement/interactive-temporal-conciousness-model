import { useState } from "react";
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
        <span> - </span>

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
    <div className="globalWireframe toggleSwitch">
      <span>Transparency</span>
      <label className="switch" htmlFor="globalWireframeMode">
        <input
          type="checkbox"
          name="globalWireframeMode"
          id="globalWireframeMode"
          onChange={() => props.setGlobalWireframe(!props.globalWireframe)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export function ClipMode(props) {
  return (
    <div className="clipMode toggleSwitch">
      <span>Split</span>
      <label className="switch" htmlFor="clipMode">
        <input
          aria-label="clipMode"
          type="checkbox"
          name="clipMode"
          id="clipMode"
          onChange={() => props.setClipmode(!props.clipmode)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export function HideLabels(props) {
  return (
    <div className="hideLabels toggleSwitch">
      <span>Labels</span>
      <label className="switch" htmlFor="hideLabels">
        <input
          aria-label="hideLabels"
          type="checkbox"
          name="hideLabels"
          id="hideLabels"
          onChange={() => props.setHideLabels(!props.hideLabels)}
        />
        <span className="slider"></span>
      </label>
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

function zoomModel(camera, constant) {
  camera.position.z = camera.position.z * constant;
  camera.position.x = camera.position.x * constant;
  camera.position.y = camera.position.y * constant;
}

export function ModelZoomButtons(props) {
  let prevZoomLevel = props.zoomLevel;

  return (
    <>
      <div className="zoomButtonsContainer">
        <button
          className="zoomButton"
          onClick={() => zoomModel(props.canvasCam.current.object, 0.75)}
        >
          <span className="material-symbols-outlined">add</span>
        </button>

        <button
          className="zoomButton"
          onClick={() => {
            zoomModel(props.canvasCam.current.object, 1.25);
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
  //console.log(currentExample);
  return (
    <div className="exampleInfo">
      <h1>{currentExample.name}</h1>
      <p>{currentExample.info}</p>
      <span>- {currentExample.author}</span>
    </div>
  );
}

const agent = navigator.userAgent;
let platforms = {
  windows: "windows",
  mac: "mac",
  linux: "linux",
};
let platform;
let isMobile = false;

if (agent.indexOf("Macintosh")) {
  platform = platforms.mac;
} else if (agent.indexOf("Windows")) {
  platform = platforms.windows;
} else if (agent.indexOf("Linux")) {
  platform = platforms.linux;
} else {
  isMobile = true;
}

function Helpers() {
  return (
    <>
      {isMobile ? (
        <>
          <div className="item">
            <div className="top">
              <span className="symbol material-symbols-outlined">swipe</span>
            </div>
            <div className="bottom">
              <span className="text">Drag = Rotate</span>
            </div>
          </div>

          <div className="item">
            <div className="top">
              <span className="symbol material-symbols-outlined">pinch</span>
            </div>

            <div className="bottom">
              <span className="text">Two-finger drag = Pan and zoom</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="item">
            <div className="top">
              <span className="symbol">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 41">
                  <path
                    id="Path_55"
                    data-name="Path 55"
                    d="M14,41a13.525,13.525,0,0,1-9.95-4.05A13.527,13.527,0,0,1,0,27V14A13.527,13.527,0,0,1,4.05,4.05,13.525,13.525,0,0,1,14,0a13.527,13.527,0,0,1,9.95,4.05A13.527,13.527,0,0,1,28,14V27a13.527,13.527,0,0,1-4.05,9.95A13.527,13.527,0,0,1,14,41m1.5-27H25a10.872,10.872,0,0,0-2.65-7.2A10.4,10.4,0,0,0,15.5,3.1ZM3,14h9.5V3.1A10.4,10.4,0,0,0,5.65,6.8,10.867,10.867,0,0,0,3,14M13.989,38a10.622,10.622,0,0,0,7.786-3.217A10.592,10.592,0,0,0,25,27V17H3V27a10.609,10.609,0,0,0,3.214,7.783A10.586,10.586,0,0,0,13.989,38"
                  />
                  <path
                    id="Path_56"
                    data-name="Path 56"
                    d="M10.354,6.877h0v4.8H6.174c0-2.308,1.871-4.8,4.18-4.8"
                  />
                </svg>
              </span>
              <span>+</span>
              <span className="symbol material-symbols-outlined">
                pan_tool_alt
              </span>
            </div>
            <div className="bottom">
              <span className="text">LMB + Drag = Rotate</span>
            </div>
          </div>

          <div className="item">
            <div className="top">
              {platform === platforms.mac ? (
                <span className="material-symbols-outlined">
                  keyboard_control_key
                </span>
              ) : platform === platforms.windows ? (
                <span>Ctrl</span>
              ) : (
                "?"
              )}

              <span>+</span>
              <span className="symbol">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 41">
                  <path
                    id="Path_55"
                    data-name="Path 55"
                    d="M14,41a13.525,13.525,0,0,1-9.95-4.05A13.527,13.527,0,0,1,0,27V14A13.527,13.527,0,0,1,4.05,4.05,13.525,13.525,0,0,1,14,0a13.527,13.527,0,0,1,9.95,4.05A13.527,13.527,0,0,1,28,14V27a13.527,13.527,0,0,1-4.05,9.95A13.527,13.527,0,0,1,14,41m1.5-27H25a10.872,10.872,0,0,0-2.65-7.2A10.4,10.4,0,0,0,15.5,3.1ZM3,14h9.5V3.1A10.4,10.4,0,0,0,5.65,6.8,10.867,10.867,0,0,0,3,14M13.989,38a10.622,10.622,0,0,0,7.786-3.217A10.592,10.592,0,0,0,25,27V17H3V27a10.609,10.609,0,0,0,3.214,7.783A10.586,10.586,0,0,0,13.989,38"
                  />
                  <path
                    id="Path_56"
                    data-name="Path 56"
                    d="M10.354,6.877h0v4.8H6.174c0-2.308,1.871-4.8,4.18-4.8"
                  />
                </svg>
              </span>
              <span>+</span>
              <span className="symbol material-symbols-outlined">
                pan_tool_alt
              </span>
            </div>

            <div className="bottom">
              <span className="text">Control + LMB + Drag = Pan</span>
            </div>
          </div>

          <div className="item">
            <div className="top">
              <span className="symbol">
                <span class="material-symbols-outlined">pan_zoom</span>
              </span>
            </div>

            <div className="bottom">
              <span className="text">Scroll = zoom</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function ControlsHelper() {
  const [open, setOpen] = useState(true);

  return (
    <div className="controlsHelperWrapper">
      <div className="header">
        {open && <h2>Controls</h2>}
        <button onClick={() => setOpen(!open)} className="closeButton">
          <span className="material-symbols-outlined">
            {open ? "close" : "question_mark"}
          </span>
        </button>
      </div>

      {open && (
        <div className="controlsContainer">
          <Helpers />
        </div>
      )}
    </div>
  );
}
