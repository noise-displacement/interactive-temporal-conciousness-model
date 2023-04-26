import { useState } from "react";
import ModelCanvas from "../components/ModelCanvas";
import { ExampleInfo, ExamplePicker } from "../components/modelControls";
import { examples } from "../components/structureInfo";
import { Link } from "react-router-dom";

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
    timeline: true,
    fullwidth: true,
    timelineLabels: true,
    examplePicker: true,
    hideLabels: true,
    bottomControls: true,
    controlsHelper: true,
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
