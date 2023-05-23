import { useState } from "react";
import ModelCanvas from "../components/ModelCanvas";
import { examples } from "../components/structureInfo";

function Example() {
  //console.log("Example", examples[0])
  const [currentExample, setCurrentExample] = useState(examples[0]);
  //console.log("CurrentExample", currentExample);
  const [modelRefresh, setModelRefresh] = useState(false);

  const options = {
    labels: false,
    clipmode: true,
    globalYearControl: true,
    modelControls: true,
    wireframeMode: true,
    outlines: false,
    modelInfo: false,
    modelZoom: true,
    zoomButtons: true,
    timeline: false,
    fullwidth: true,
    timelineLabels: true,
    examplePicker: true,
    hideLabels: true,
    bottomControls: true,
    controlsHelper: true,
    resetButton: true,
  };

  return (
    <div className="exampleContainer canvasContainer">
      <ModelCanvas
        modelRefresh={modelRefresh}
        currentExample={currentExample}
        options={options}
      />
    </div>
  );
}

export default Example;
