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

const norms = {
  structural: {
    name: "Structural",
    values: {
      individual: { name: "Individual", value: 0 },
      group: { name: "Group", value: 1 },
      regional: { name: "Regional", value: 2 },
      state: { name: "State", value: 3 },
      religion: { name: "Religion", value: 4 },
    },
  },

  social: {
    name: "Social",
    values: {
      individual: { name: "Individual", value: 0 },
      group: { name: "Group", value: 1 },
      regional: { name: "Regional", value: 2 },
      state: { name: "State", value: 3 },
      cultural: { name: "Cultural", value: 4 },
    },
  },

  space: {
    name: "Space",
    values: {
      local: { name: "Local", value: 0 },
      regional: { name: "Regional", value: 1 },
      national: { name: "National", value: 2 },
      transnational: { name: "Transnational", value: 3 },
      international: { name: "International", value: 4 },
      universal: { name: "Universal", value: 5 },
    },
  },
};

export const examples = [
  {
    id: 1,
    name: "Example 1",
    author: "Test",
    info: "Short info text about example",
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
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: "Relation 1",
        type: structureTypes.relation,
        startYear: 1540,
        endYear: 1560,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: "Relation 2",
        type: structureTypes.relation,
        startYear: 1790,
        endYear: 1910,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: "Relation 3",
        type: structureTypes.relation,
        startYear: 2010,
        endYear: 2030,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: structureTypes.model.name,
        type: structureTypes.model,
        startYear: 1420,
        endYear: 1915,
        normSocial: norms.social.values["regional"].value,
        normStructural: norms.structural.values["group"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1600,
        endYear: 2100,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1350,
        endYear: 2100,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },
    ],
  },

  {
    id: 2,
    name: "Example 2",
    author: "Test2",
    info: "Short info text about example2",
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
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: "Relation 2",
        type: structureTypes.relation,
        startYear: 1970,
        endYear: 2010,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: structureTypes.model.name,
        type: structureTypes.model,
        startYear: 1900,
        endYear: 1990,
        normSocial: norms.social.values["regional"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1600,
        endYear: 2100,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1500,
        endYear: 2100,
        normSocial: norms.social.values["group"].value,
        normStructural: norms.structural.values["religion"].value,
        space: norms.space.values["national"].value,
      },
    ],
  },
];
