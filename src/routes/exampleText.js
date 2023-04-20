import { useState } from "react";
import ModelCanvas from "../components/ModelCanvas";
import { examples } from "../components/structureInfo";

function ExampleText() {
    const [currentExample, setCurrentExample] = useState(examples[2]);
  //console.log("CurrentExample", currentExample);
  const [modelRefresh, setModelRefresh] = useState(false);

  const options = {
    labels: false,
    clipmode: false,
    globalYearControl: false,
    modelControls: false,
    wireframeMode: false,
    outlines: false,
    modelInfo: false,
    modelZoom: false,
    zoomButtons: false,
    timeline: false,
    fullwidth: true,
    timelineLabels: false,
    examplePicker: false,
    hideLabels: false,
    bottomControls: false
  };

  return (
    <div className="exampleText">
      <div className="container">
        <div className="examplePicker">
          <div className="item">
            <button>
              <span className="dot"></span>
              <span className="text">Example 1</span>
            </button>
          </div>
        </div>

        <div className="exampleContainer">
          <div className="left">
            <h1>Example 1</h1>

            <div className="textContainer">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc ut aliquam tincidunt, nunc nisl aliquam nisl, eget
                aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam
                tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit
                amet nisl. Sed euismod, nunc ut aliquam tincidunt, nunc nisl
                aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </div>
          </div>

          <div className="right">
            <div className="canvasContainer">
              <ModelCanvas
                modelRefresh={modelRefresh}
                currentExample={currentExample}
                options={options}
              ></ModelCanvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExampleText;
