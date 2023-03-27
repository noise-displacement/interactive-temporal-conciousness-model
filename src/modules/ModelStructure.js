import { useState } from "react";
import ModelLoader from "./ModelLoader";
import { structureTypes } from "../components/structureInfo";

function ModelStructure(props) {
    let i = props.i;
    let structure = props.structure;
    let yearScale = props.yearScale;
    let clipMode = props.clipMode;
    let sphereRadius = props.sphereRadius;
    let onHover = props.onHover;
    let globalWireframe = props.globalWireframe;
    let currentControls = props.currentControls;
    let setOrbitControls = props.setOrbitControls;
    let labelScaleFactor = props.labelScaleFactor;

    const [space, setSpace] = useState(0);

  return (
    <ModelLoader
      key={i}
      structureNumber={i}
      type={structure.type}
      name={structure.name}
      yearScale={yearScale}
      clipMode={structure.type === structureTypes.event ? 0 : clipMode}
      sphereRadius={sphereRadius}
      relation={structure.type === structureTypes.relation ? true : false}
      object={structure.object}
      modelName={structure.modelName}
      color={structure.color}
      scaleTime={structure.scaleTime}
      scaleNorm={structure.scaleNorm}
      scalePlace={structure.scalePlace}
      years={structure.years}
      options={structure.options}
      onHover={onHover}
      globalWireframe={globalWireframe}
      currentControls={currentControls}
      optionsOpen={false}
      sizes={structure.sizes}
      distanceFactor={labelScaleFactor}
      setOrbitControls={setOrbitControls}
      space={space}
      setSpace={setSpace}
    ></ModelLoader>
  );
}

export default ModelStructure;