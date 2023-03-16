import { useState } from "react";
import ModelCanvas from "../components/ModelCanvas";
import { ExamplePicker } from "../components/modelControls";

export const models = {
  cone: {
    relation: true,
    object: "Cone",
    path: "/models/cone.gltf",
    color: "blue",
    info: true,
    name: "Relation",
    infoText: "Establishing a relationship (expectations - rules)",
  },

  cube: {
    object: "Cube",
    path: "/models/cube.glb",
    color: "grey",
    info: true,
    name: "Model",
    infoText: "Wedding: specific types of ceremony, proposal, ring etc.",
  },

  hedron: {
    object: "Icosphere",
    path: "/models/hedron.glb",
    color: "red",
    info: true,
    name: "Structure",
    infoText: "Family, with related life type, values and rules",
  },

  sphere: {
    object: "Sphere",
    path: "/models/sphere.glb",
    color: "green",
    info: true,
    name: "Ultrastructure",
    infoText: "Monogamy-polygamy, endogamy-exogamy etc.",
  },

  axis: {
    object: "Model",
    path: "/models/axis.glb",
    info: false,
  },

  pyramid: {
    object: "Cone",
    path: "/models/pyramid.glb",
    color: "grey",
    info: false,
  },
};

export const structureTypes = {
  ultraStructure: {
    name: "Ultrastructure",
    object: models.sphere,
    color: 0x607b94,
    options: {
      rotation: false,
      timeScale: true,
      normScale: true,
      placeScale: true,
    },
  },
  structure: {
    name: "Structure",
    object: models.hedron,
    color: 0xc7b99c,
    options: {
      rotation: false,
      timeScale: true,
      normScale: true,
      placeScale: true,
    },
  },
  model: {
    name: "Model",
    object: models.cube,
    color: 0xffffff,
    options: {
      rotation: false,
      timeScale: true,
      normScale: true,
      placeScale: true,
    },
  },
  relation: {
    name: "Relation",
    object: models.cone,
    color: 0x274b6d,
    options: {
      rotation: false,
      timeScale: true,
      normScale: true,
      placeScale: true,
    },
  },
  event: {
    name: "Event",
    object: models.sphere,
    color: 0xfc8803,
    options: {
      rotation: false,
      timeScale: true,
      normScale: false,
      placeScale: false,
    },
  },
};

export const examples = [
  {
    id: 1,
    name: "Example 1",
    timeline: {
      startYear: 1350,
      endYear: 2020,
    },

    structures: [
      {
        name: "Event 1",
        type: structureTypes.event,
        startYear: 1950,
        endYear: 1953,
      },

      {
        name: "Relation 1",
        type: structureTypes.relation,
        startYear: 1540,
        endYear: 1560,
      },

      {
        name: "Relation 2",
        type: structureTypes.relation,
        startYear: 1790,
        endYear: 1910,
      },

      {
        name: "Relation 3",
        type: structureTypes.relation,
        startYear: 2010,
        endYear: 2030,
      },

      {
        name: structureTypes.model.name,
        type: structureTypes.model,
        startYear: 1420,
        endYear: 1915,
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1600,
        endYear: 2100,
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1350,
        endYear: 2100,
      },
    ],
  },

  {
    id: 2,
    name: "Example 2",
    timeline: {
      startYear: 1950,
      endYear: 2020,
    },

    structures: [
      {
        name: "Relation 1",
        type: structureTypes.relation,
        startYear: 1990,
        endYear: 2000,
      },

      {
        name: "Relation 2",
        type: structureTypes.relation,
        startYear: 1970,
        endYear: 2010,
      },

      {
        name: structureTypes.model.name,
        type: structureTypes.model,
        startYear: 1900,
        endYear: 1990,
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1600,
        endYear: 2100,
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1500,
        endYear: 2100,
      },
    ],
  },
];

function Example() {
  const [currentExample, setCurrentExample] = useState(examples[0]);
  const [modelRefresh, setModelRefresh] = useState(false);

  const options = {
    labels: false,
    splitMode: false,
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
  };

  return (
    <div className="exampleContainer">
      <div className="examplePicker">
        <ExamplePicker
          examples={examples}
          currentExample={currentExample}
          setCurrentExample={setCurrentExample}
          setModelRefresh={setModelRefresh}
        />
      </div>
      <ModelCanvas modelRefresh={modelRefresh} currentExample={currentExample} options={options} />
    </div>
  );
}

export default Example;
