import { useState } from "react";
import { labels, structureTypes } from "./structureInfo";

export const inputTypes = {
  normScale: {
    name: "Norms",
    inputType: "range",
    scale: {
      min: 0,
      max: 5,
    },
  },
};

function StructureControls(props) {
  return (
    <div className="structureControls">
      {props.structures.map((structure) => {
        return <StructureController structure={structure} />;
      })}
    </div>
  );
}

export function StructureController(props) {
  const [open, setOpen] = useState(false);
  let options = props.structure.type.options;
  let example = props.structure;


  return (
    <>
      <button className="header collapsible" onClick={(e) => setOpen(!open)}>
        <h3 className="dark">{example.name}</h3>
        <span className="dark material-symbols-outlined">add</span>
      </button>
      {open && (
        <div className="controls">
          <StructureSlider
            value={example.normSocial}
            type={inputTypes.normScale}
            options={options}
          />
        </div>
      )}
    </>
  );
}

export function StructureSlider(props) {
  let options = props.options;
  let type = props.type;
  let [value, setValue] = useState(props.value);
  console.log(value);
  console.log(options);

  return (
    <div className="sliderContainer">
      <label htmlFor={type.name}>{type.name}</label>
      <input
        className={`${type.inputType}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type.inputType}
        name={type.name}
        min={type.scale.min}
        max={type.scale.max}
      />
    </div>
  );
}

export function useStructureSlider(options) {
  console.log(options);
  let props = {
    name: options.name,
  };

  return (
    <div className="sliderContainer">
      <label for={props.name}>{props.name}</label>
      <input
        className={`slider`}
        type="range"
        name={props.name}
        min={0}
        max={5}
        defaultValue={0}
      />
    </div>
  );
}

function NumberInput() {
  let name = "input";
  return (
    <div className="numberInput">
      <label for={name}>{name}</label>
      <input className={`slider`} type="number" name={name}></input>
    </div>
  );
}

function getLabels(labelGroup) {
  let labelArray = labels[labelGroup].values;
  let innerObjects = Object.values(labelArray);
  let labelValues = [];
  let labelNames = [];

  for (let object of innerObjects) {
    //console.log(value.value);
    labelNames.push(object.name);
    labelValues.push(object.value);
  }

  return {
    labelNames,
    labelValues,
  };
}

export function ModelOptions(props) {
  let i = props.i;
  let structure = props.structure;
  let currentControls = props.currentControls;
  //console.log(currentControls[i].sizes);
  let color = structure.type.colorHex;
  let darkBg = color === "#274b6d" || color === "#607b94" ? "dark" : "";
  let setCurrentControls = props.setCurrentControls;
  let currentYears = currentControls[i].years;
  const [open, setOpen] = useState(false);
  const labelsFormatted = {
    social: getLabels("social"),
    structural: getLabels("structural"),
    space: getLabels("space"),
  };

  let [currentLabels, setCurrentLabels] = useState({
    space: labelsFormatted.space.labelNames[structure.sizes.space - 1],
    social: labelsFormatted.social.labelNames[structure.sizes.social - 1],
    structural: labelsFormatted.structural.labelNames[structure.sizes.structural - 1],
  });

  //console.log(labelsFormatted);

  return (
    <div className="structure">
      <button
        className="header"
        style={{ backgroundColor: color }}
        onClick={() => setOpen(!open)}
      >
        <h2 className={darkBg}>{structure.name}</h2>
        <span className={`${darkBg} material-symbols-outlined`}>
          {open ? "remove" : "add"}
        </span>
      </button>

      {open && (
        <div className="openOptions">
          <div className="yearOptions">
            {structure.type === structureTypes.event ? (
              <div>
                <label htmlFor="">Year</label>
                <input
                  type="number"
                  name="fromYear"
                  id="fromYear"
                  value={currentControls[i].years.start}
                  onChange={(e) => {
                    const nextControls = [
                      ...currentControls.slice(0, i),
                      {
                        name: structure.name,
                        sizes: {
                          social: currentControls[i].sizes.social,
                          structural: currentControls[i].sizes.structural,
                          space: currentControls[i].sizes.space,
                        },

                        years: {
                          start: Number(e.target.value),
                          end: Number(e.target.value) + 1,
                        },
                      },
                      ...currentControls.slice(i + 1),
                    ];

                    setCurrentControls(nextControls);
                    //console.log(currentControls[i].name, currentControls[i].years, currentControls[i]);
                  }}
                ></input>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="">From</label>
                  <input
                    type="number"
                    name="fromYear"
                    id="fromYear"
                    value={currentControls[i].years.start}
                    onChange={(e) => {
                      const nextControls = [
                        ...currentControls.slice(0, i),
                        {
                          name: structure.name,
                          sizes: {
                            social: currentControls[i].sizes.social,
                            structural: currentControls[i].sizes.structural,
                            space: currentControls[i].sizes.space,
                          },

                          years: {
                            start: Number(e.target.value),
                            end: Number(currentControls[i].years.end),
                          },
                        },
                        ...currentControls.slice(i + 1),
                      ];

                      setCurrentControls(nextControls);
                      //console.log(currentControls[i].name, currentControls[i].years, currentControls[i]);
                    }}
                  ></input>
                </div>

                <div>
                  <label htmlFor="">To</label>
                  <input
                    type="number"
                    name="toYear"
                    id="toYear"
                    value={currentControls[i].years.end}
                    onChange={(e) => {
                      const nextControls = [
                        ...currentControls.slice(0, i),
                        {
                          name: structure.name,
                          sizes: {
                            social: currentControls[i].sizes.social,
                            structural: currentControls[i].sizes.structural,
                            space: currentControls[i].sizes.space,
                          },

                          years: {
                            start: Number(currentControls[i].years.start),
                            end: Number(e.target.value),
                          },
                        },
                        ...currentControls.slice(i + 1),
                      ];
                      setCurrentControls(nextControls);
                      //console.log(currentControls[i].name, currentControls[i].years, currentControls[i]);
                    }}
                  ></input>
                </div>
              </>
            )}
          </div>

          {structure.type === structureTypes.event ? (
            <></>
          ) : (
            <>
              <div className="slider">
                <label htmlFor="">{currentLabels.space}</label>
                <input
                  type="range"
                  min={labelsFormatted.space.labelValues[0]}
                  max={
                    labelsFormatted.space.labelValues[
                      labelsFormatted.space.labelValues.length - 1
                    ]
                  }
                  value={currentControls[i].sizes.space}
                  onChange={(e) => {
                    const insertAt = i;
                    const nextControls = [
                      ...currentControls.slice(0, insertAt),
                      {
                        name: structure.name,
                        sizes: {
                          social: currentControls[i].sizes.social,
                          structural: currentControls[i].sizes.structural,
                          space: Number(e.target.value),
                        },

                        years: {
                          start: currentControls[i].years.start,
                          end: currentControls[i].years.end,
                        },
                      },
                      ...currentControls.slice(insertAt + 1),
                    ];

                    currentLabels.space = labelsFormatted.space.labelNames[e.target.value - 1];
                    setCurrentControls(nextControls);
                  }}
                ></input>
              </div>

              <div className="slider">
                <label htmlFor="">{currentLabels.structural}</label>
                <input
                  type="range"
                  min={labelsFormatted.structural.labelValues[0]}
                  max={
                    labelsFormatted.structural.labelValues[
                      labelsFormatted.structural.labelValues.length - 1
                    ]
                  }
                  value={currentControls[i].sizes.structural}
                  onChange={(e) => {
                    const insertAt = i;
                    const nextControls = [
                      ...currentControls.slice(0, insertAt),
                      {
                        name: structure.name,
                        sizes: {
                          social: currentControls[i].sizes.social,
                          structural: Number(e.target.value),
                          space: currentControls[i].sizes.space,
                        },

                        years: {
                          start: currentControls[i].years.start,
                          end: currentControls[i].years.end,
                        },
                      },
                      ...currentControls.slice(insertAt + 1),
                    ];

                    currentLabels.structural = labelsFormatted.structural.labelNames[e.target.value - 1];
                    setCurrentControls(nextControls);
                  }}
                ></input>
              </div>

              <div className="slider">
                <label htmlFor="">{currentLabels.social}</label>
                <input
                  type="range"
                  min={labelsFormatted.social.labelValues[0]}
                  max={
                    labelsFormatted.social.labelValues[
                      labelsFormatted.social.labelValues.length - 1
                    ]
                  }
                  value={currentControls[i].sizes.social}
                  onChange={(e) => {
                    const insertAt = i;
                    const nextControls = [
                      ...currentControls.slice(0, insertAt),
                      {
                        name: structure.name,
                        sizes: {
                          social: Number(e.target.value),
                          structural: currentControls[i].sizes.structural,
                          space: currentControls[i].sizes.space,
                        },

                        years: {
                          start: currentControls[i].years.start,
                          end: currentControls[i].years.end,
                        },
                      },
                      ...currentControls.slice(insertAt + 1),
                    ];

                    currentLabels.social = labelsFormatted.social.labelNames[e.target.value - 1];
                    setCurrentControls(nextControls);
                  }}
                ></input>
              </div>

              {/* <div className="checkbox">
                <label htmlFor="">{currentLabels.social}</label>
                <input
                  type="checkbox"
                  value={currentControls[i].sizes.social}
                  onChange={(e) => {

                  }}
                ></input>
              </div> */}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function ResetButton() {
  return (
    <div className="resetButton">
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default StructureControls;
