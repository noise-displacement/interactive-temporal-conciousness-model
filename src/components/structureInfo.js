export const models = {
  cone: {
    relation: true,
    object: "Cone",
    path: "/models/cone.glb",
    color: "blue",
    info: true,
    name: "Relation",
    infoText: "Establishing a relationship (expectations - rules)",
  },

  cube: {
    object: "Cube",
    path: "/models/cube.glb",
    wireframePath: "/models/cubeWireframe.glb",
    color: "grey",
    info: true,
    name: "Model",
    infoText: "Wedding: specific types of ceremony, proposal, ring etc.",
  },

  hedron: {
    object: "Icosphere",
    path: "/models/hedron.glb",
    wireframePath: "/models/hedronWireframe.glb",
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
    colorHex: "#607b94",
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
    colorHex: "#c7b99c",
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
    colorHex: "#ffffff",
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
    colorHex: "#274b6d",
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
    colorHex: "#fc8803",
    options: {
      rotation: false,
      timeScale: true,
      normScale: false,
      placeScale: false,
    },
  },
};

export const labels = {
  structural: {
    name: "Norms",
    values: {
      societal: { name: "Societal or Cultural", value: 1 },
      cultural: { name: "Sociocultural", value: 2 },
    },
  },

  social: {
    name: "Norms",
    values: {
      religious: { name: "Religious", value: 1 },
      state: { name: "State", value: 2 },
    },
  },

  space: {
    name: "Space",
    values: {
      microcosmic: { name: "Microcosmic", value: 1 },
      local: { name: "Local", value: 2 },
      national: { name: "National", value: 3 },
      regional: { name: "Regional", value: 4 },
      universal: { name: "Universal", value: 5 },
    },
  },
};

export const examples = [
  // {
  //   id: 1,
  //   name: "Example 1",
  //   author: "Test",
  //   info: "Short info text about example",
  //   timeline: {
  //     startYear: 1350,
  //     endYear: 2020,
  //   },

  //   structures: [
  //     {
  //       name: "Event 1",
  //       type: structureTypes.event,
  //       startYear: 1950,
  //       endYear: 1953,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: "Relation 1",
  //       type: structureTypes.relation,
  //       startYear: 1540,
  //       endYear: 1560,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: "Relation 2",
  //       type: structureTypes.relation,
  //       startYear: 1790,
  //       endYear: 1910,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: "Relation 3",
  //       type: structureTypes.relation,
  //       startYear: 2010,
  //       endYear: 2030,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: structureTypes.model.name,
  //       type: structureTypes.model,
  //       startYear: 1420,
  //       endYear: 1915,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: structureTypes.structure.name,
  //       type: structureTypes.structure,
  //       startYear: 1600,
  //       endYear: 2100,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: structureTypes.ultraStructure.name,
  //       type: structureTypes.ultraStructure,
  //       startYear: 1350,
  //       endYear: 2100,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["universal"].value,
  //     },
  //   ],
  // },

  // {
  //   id: 2,
  //   name: "Example 2",
  //   author: "Test2",
  //   info: "Short info text about example2",
  //   timeline: {
  //     startYear: 1950,
  //     endYear: 2020,
  //   },

  //   structures: [
  //     {
  //       name: "Relation 1",
  //       type: structureTypes.relation,
  //       startYear: 1990,
  //       endYear: 2000,
  //       normSocial: labels.social.values["religious"].value,
  //       normStructural: labels.structural.values["societal"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: "Relation 2",
  //       type: structureTypes.relation,
  //       startYear: 1970,
  //       endYear: 2010,
  //       normSocial: labels.social.values["group"].value,
  //       normStructural: labels.structural.values["religion"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: structureTypes.model.name,
  //       type: structureTypes.model,
  //       startYear: 1900,
  //       endYear: 1990,
  //       normSocial: labels.social.values["regional"].value,
  //       normStructural: labels.structural.values["religion"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: structureTypes.structure.name,
  //       type: structureTypes.structure,
  //       startYear: 1600,
  //       endYear: 2100,
  //       normSocial: labels.social.values["group"].value,
  //       normStructural: labels.structural.values["religion"].value,
  //       space: labels.space.values["national"].value,
  //     },

  //     {
  //       name: structureTypes.ultraStructure.name,
  //       type: structureTypes.ultraStructure,
  //       startYear: 1500,
  //       endYear: 2100,
  //       normSocial: labels.social.values["group"].value,
  //       normStructural: labels.structural.values["religion"].value,
  //       space: labels.space.values["national"].value,
  //     },
  //   ],
  // },

  {
    id: 2,
    name: "Example 3",
    author: "Test",
    info: "Short info text about example",
    timeline: {
      startYear: 1000,
      endYear: 2023,
    },

    structures: [
      {
        name: "Event 1",
        type: structureTypes.event,
        startYear: 2015,
        endYear: 1953,
        normSocial: labels.social.values["religious"].value,
        normStructural: labels.structural.values["societal"].value,
        space: labels.space.values["national"].value,
      },

      {
        name: "Relation 1",
        type: structureTypes.relation,
        startYear: 2015,
        endYear: 2023,
        normSocial: labels.social.values["religious"].value,
        normStructural: labels.structural.values["societal"].value,
        space: labels.space.values["local"].value,
      },

      {
        name: structureTypes.model.name,
        type: structureTypes.model,
        startYear: 1950,
        endYear: 2030,
        //Religious AND state
        normSocial: labels.social.values["religious"].value,
        normStructural: labels.structural.values["societal"].value,
        space: labels.space.values["national"].value,
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1800,
        endYear: 2050,
        normSocial: labels.social.values["state"].value,
        normStructural: labels.structural.values["cultural"].value,
        space: labels.space.values["regional"].value,
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1000,
        endYear: 2100,
        normSocial: labels.social.values["state"].value,
        normStructural: labels.structural.values["cultural"].value,
        space: labels.space.values["universal"].value,
      },
    ],
  },
];

export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  grey: "#888888",
  blue: "#1E3B56",
  lightBlue: "#5C7790",
  lightGrey: "#EEEEEE",
  orange: "#F08E5F",
}