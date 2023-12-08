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

  roundedCube: {
    object: "Cube",
    path: "/models/roundedCube.glb",
    color: "grey",
    info: false,
  }
};

export const structureTypes = {
  ultraStructure: {
    name: "Ultrastructure",
    object: models.roundedCube,
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
    color: 0xff822e,
    colorHex: "#ff822e",
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
    name: "Concious citizen",
    author: "Prof. Apostolos Spanos",
    info: "XYZ has been a conscious citizen from her teens, following politics and voting in every national or local election, with a single criterion of what appeared to be best for her municipality or country. During her studies, she was active in student politics, something that sparked off her decision to become a politician. This decision was made in 2015. <br /><br />When fixed to the idea of serving her country as a parliament member, XYZ realized that this cannot be done without her being a member of a political party. In 2015, she registered in party ABC, as it was best fitting with her own political ideas and visions, and built a relation to both the political theses and the modus operandi of the party. Soon, she became one of the party’s most prominent figures. Her relation with the party (and the political system in general) resulted in XYZ being elected as a PM in 2023. <br /><br />XYZ lives in a democratic country, in which women have had the right to vote since 1913. The political system of her country is structured as a representative parliamentary democracy. To become a PM, XYZ had to get through a specific model of deciding who will represent the citizens of the country in the parliament and according to which criteria, rules and norms. <br /><br />Our 3D-model example illustrates the interrelation between the event of her election, the relation between her and the party, the model of elections, the structure of democracy, and the ultrastructure of the state as the only acceptable institution through which a country is led. <br/><br />If you want to get a better picture of how this interrelation functions and its meaning, imagine XYZ living in various other places, operating according to different (and different between them) social, cultural and political structures, as for example North Korea, Saudi Arabia, or the North Sentinel Island —and then use our model to illustrate her life in all these alterative cases, in political and non-political terms. ",
    timeline: {
      startYear: 1000,
      endYear: 2423,
    },
    date: "27-04-2023",

    structures: [
      {
        name: "Event 1",
        type: structureTypes.event,
        startYear: 2015,
        endYear: 1953,
        normSocial: labels.social.values["religious"].value,
        normStructural: labels.structural.values["societal"].value,
        space: labels.space.values["national"].value,
        info: "XYZ’s election is a future-oriented event (it exists exactly because of her dream to contribute to a better future) that is the result of her political life since her teens. It is also an event that forms the rest of her life. As an event, it has its own timespace. In terms of time, it happens on a specific day, the day of national elections, but it is also related to a period before (the pre-election period) and a period after (the parliamentary term). It is also related to another event, XYZ’s decision to become a politician. In terms of spatial dimension, is unfolds at the national level. This event can only exist as element of specific relations, structures and ultrastructures, and can only get realized as a result of the function of a specific model."
      },

      {
        name: "Relation 1",
        type: structureTypes.relation,
        startYear: 2015,
        endYear: 2023,
        normSocial: labels.social.values["religious"].value,
        normStructural: labels.structural.values["societal"].value,
        space: labels.space.values["local"].value,
        info: "XYZ’s election would be impossible without her relation to the political party ABC. This is a relation that facilitates various relationships, as for example XYZ’s relationship to other politicians of the party, its members, and the citizens of the country in general. As a part of this relation, XYZ must get familiarized not only with the basic theses of the party, but also with the language and concepts used to communicate them. The relation has its own timespace. It started in 2015, when XYZ was registered as a party member, and it will last at least until 2027, when her parliamentary term will end. In terms of space, the relation is national. In terms of norms, it is regulated by state laws and it has strong social dimensions, as XYZ has, as a party member and (future) politician interact with the citizens of the country, especially the citizens of her electoral periphery. "
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
        info: "Citizens who wish to serve their country as PMs must get through the specific model, according to which democracy is realized in their country. Elections and pre-election periods are organized in specific, sometimes varying, ways in various countries. These models exist usually for decades and sometimes for centuries (they might get slightly changed over time). They have official and unofficial dimensions. The official is regulated by the state and refers to the criteria for electability and the organization of the election itself. The unofficial is social and/or cultural, and refers to various activities that are informal parts of the model, as for example giving political speeches, writing chronicles in newspapers, having a blog and a webpage, and giving interviews to mass media. Election models might be identical or similar in many democratic countries, but we assume here that each country has its own model. For the illustration of the example, let us say that the model in XYZ’s country has existed since 1850. "
      },

      {
        name: structureTypes.structure.name,
        type: structureTypes.structure,
        startYear: 1800,
        endYear: 2050,
        normSocial: labels.social.values["state"].value,
        normStructural: labels.structural.values["cultural"].value,
        space: labels.space.values["regional"].value,
        info: "XYZ’s dream of becoming a politician can only get realized (or even exist) within a democratic system which supports female electability. Democracy as a structure has various forms and is realized in varying models, but all these forms and models are structured under the principle of “government of the people, by the people and for the people” executed by elected officials. It has existed at least during the last 2,500 years, with the city state of Athens being the most celebrated example. In terms of space, is a regional structure, as there are still many nondemocratic regimes in the world. As a structure, democracy has a very strong state dimension, but it is also social and cultural, as it includes norms, principles and activities that are nor dictated and regulated by the state. Universal suffrage, for example, is equally sociopolitical as it is political. Most probably, democracy will continue being active in most part for the world for many centuries. For reasons of illustration, we set an and to it in the year 2100. "
      },

      {
        name: structureTypes.ultraStructure.name,
        type: structureTypes.ultraStructure,
        startYear: 1000,
        endYear: 2400,
        normSocial: labels.social.values["state"].value,
        normStructural: labels.structural.values["cultural"].value,
        space: labels.space.values["universal"].value,
        info: "Democracy, as any other political structure, would not exist without the ultrastructure of state as the only commonly accepted institution that has the responsibility to set the rules for the organization of the society, as well as the monopoly of violence within the area it is responsible for. The timespace of state as an ultrastructure covers the whole world and the whole of human history. In terms of time, mini states (in the form of clans, tribes, and chiefdoms) have existed since the times of hunter-gatherers. It would be logical to expect the state will continue being unchallenged in the deep future. For technical reasons, let as set the beginning of the ultrastructure in the year 5,000 BC and its end in 2200 AD. "
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