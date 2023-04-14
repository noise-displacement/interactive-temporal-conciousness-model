import { useState } from "react";
import { structureTypes } from "./structureInfo";

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
  //console.log(props.structure);
  let options = props.structure.type.options;
  let example = props.structure;

  return (
    <>
      <button className="header collapsible" onClick={(e) => setOpen(!open)}>
        <h3>{example.name}</h3>
        <span className="material-symbols-outlined">add</span>
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

export function ModelOptions(props) {
  let i = props.i;
  let structure = props.structure;
  let currentControls = props.currentControls;
  //console.log(currentControls[i].sizes);
  //console.log(structure);
  let color = structure.type.colorHex;
  let setCurrentControls = props.setCurrentControls;
  let currentYears = currentControls[i].years;
  const [open, setOpen] = useState(false);

  return (
    <div className="structure">
      <button
        className="header"
        style={{ backgroundColor: color }}
        onClick={() => setOpen(!open)}
      >
        <h2>{structure.name}</h2>
        <span className="material-symbols-outlined">
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
                <label htmlFor="">Space</label>
                <input
                  type="range"
                  min={0}
                  max={5}
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

                    setCurrentControls(nextControls);
                  }}
                ></input>
              </div>

              <div className="slider">
                <label htmlFor="">Structural</label>
                <input
                  type="range"
                  min={0}
                  max={5}
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

                    setCurrentControls(nextControls);
                  }}
                ></input>
              </div>

              <div className="slider">
                <label htmlFor="">Social</label>
                <input
                  type="range"
                  min={0}
                  max={5}
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

                    setCurrentControls(nextControls);
                  }}
                ></input>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default StructureControls;
