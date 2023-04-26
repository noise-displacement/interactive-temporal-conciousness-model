import { useState } from "react";
import ModelCanvas from "../components/ModelCanvas";
import { examples, labels, structureTypes } from "../components/structureInfo";
import Footer from "../components/footer";

function ExampleText() {
  const [currentExample, setCurrentExample] = useState(examples[0]);
  //console.log("CurrentExample", currentExample);
  const [modelRefresh, setModelRefresh] = useState(false);
  const [currentModelInfo, setCurrentModelInfo] = useState(
    examples[0].structures[0]
  );

  const spaceValues = Object.values(labels.space.values);
  const socialValues = Object.values(labels.social.values);
  const structuralValues = Object.values(labels.structural.values);

  //console.log(currentExample);

  const options = {
    labels: true,
    clipmode: true,
    globalYearControl: false,
    modelControls: false,
    wireframeMode: false,
    outlines: false,
    modelInfo: false,
    modelZoom: true,
    zoomButtons: true,
    timeline: false,
    fullwidth: false,
    timelineLabels: true,
    examplePicker: false,
    hideLabels: true,
    bottomControls: true,
    controlsHelper: true,
  };

  return (
    <>
      <div className="exampleText">
        <div className="container">
          <div className="examplePicker">
            {examples.map((example, index) => {
              return (
                <div className="item" key={index}>
                  <button onClick={() => setCurrentExample(examples[index])}>
                    <span className="dot"></span>
                    <span className="text">{example.name}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="exampleContainer">
            <div className="left">
              <h1>{currentExample.name}</h1>

              <div className="textContainer">
                <p>{currentExample.info}</p>
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

          <div className="exampleModelsContainer">
            <div className="exampleModelsWrapper">
              <div className="modelsHeader">
                {currentExample.structures.map((structure, index) => {
                  //console.log(structure);
                  return (
                    <div className="item" key={index}>
                      <button
                        className={
                          currentModelInfo.name === structure.name
                            ? "active"
                            : ""
                        }
                        onClick={() => setCurrentModelInfo(structure)}
                      >
                        <img
                          className={`${structure.type.name.toLowerCase()}`}
                          src={`/images/models/${structure.type.name.toLowerCase()}.svg`}
                          alt={`${structure.type.name} icon`}
                        />
                        <span>{structure.name}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="modelsInfo">
                <div className="left">
                  {/* Trenger info */}
                  {currentModelInfo.type.object.infoText}
                </div>

                <div className="right">
                  <span>
                    Time: {currentModelInfo.startYear} -{" "}
                    {currentModelInfo.endYear}
                  </span>
                  <span>
                    Place: {spaceValues[currentModelInfo.space - 1].name}
                  </span>
                  <span>
                    {socialValues[currentModelInfo.normSocial - 1].name}
                  </span>
                  <span>
                    {structuralValues[currentModelInfo.normStructural - 1].name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExampleText;
