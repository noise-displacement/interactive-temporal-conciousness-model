import { useState } from "react";
import ModelCanvas from "../components/ModelCanvas";
import { ExampleInfo, ExamplePicker } from "../components/modelControls";
import { examples } from "../components/structureInfo";
import { Link } from "react-router-dom";

function Example() {
  const [currentExample, setCurrentExample] = useState(examples[0]);
  const [modelRefresh, setModelRefresh] = useState(false);

  const options = {
    labels: false,
    splitMode: false,
    globalYearControl: true,
    modelControls: false,
    wireframeMode: true,
    outlines: false,
    modelInfo: false,
    modelZoom: true,
    zoomButtons: true,
    timeline: true,
    fullwidth: true,
    timelineLabels: true,
    examplePicker: true,
  };

  return (
    <div className="exampleContainer canvasContainer">
      {/* <div className="exampleInfoContainer">
        <ExampleInfo currentExample={currentExample} />
        <ExamplePicker
          examples={examples}
          currentExample={currentExample}
          setCurrentExample={setCurrentExample}
          setModelRefresh={setModelRefresh}
        />

        <Link to="/model" className="ctaBtn">Model theory</Link>
      </div> */}
      <ModelCanvas modelRefresh={modelRefresh} currentExample={currentExample} options={options} />
    </div>
  );
}

export default Example;
