import { useState } from "react";

export const inputTypes = {
  normScale: {
    name: "Norms",
    inputType: "range",
    scale: {
      min: 0,
      max: 5
    }
  } 
}

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
    console.log(props.options);
    let structure = props.options;

    return (
      <>
        <button className="header collapsible" onClick={(e) => setOpen(!open)}>
          <h3>{structure.name}</h3>
          <span className="material-symbols-outlined">add</span>
        </button>
        {open && (
          <div className="moreInfo">
              {/* <StructureSlider type={inputTypes.normScale} options={structure} /> */}
          </div>
        )}
      </>
    );
}

export function StructureSlider(props) {
  let options = props.options;
  let type = props.type;
  console.log(options);

  return(
    <div className="sliderContainer">
      <label htmlFor={type.name}>{type.name}</label>
      <input className={`${type.inputType}`} type={type.inputType} name={type.name} min={type.scale.min} max={type.scale.max} defaultValue={0} />
    </div>
  )
}

export function useStructureSlider(options) {
  console.log(options);
  let props = {
    name: options.name
  }

  return(
    <div className="sliderContainer">
      <label for={props.name}>{props.name}</label>
      <input className={`slider`} type="range" name={props.name} min={0} max={5} defaultValue={0} />
    </div>
  )
}

function NumberInput() {
  let name = "input";
  return(
    <div className="numberInput">
      <label for={name}>{name}</label>
      <input className={`slider`} type="number" name={name}></input>
    </div>
  )
}

export default StructureControls;
