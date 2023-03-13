import ModelCanvas from "../components/ModelCanvas";

const modelTexts = {
    events: "Events: Event is results of human actions or natural phenomena that are important for the historical evolution of the relevant individuals and/or groups. Events gets recorded in our historical memory, and as a part of our experience they influence our expectations and decisions for the future. Individual events unfold in specific spaces, while collective events might unfold in large areas. They usually unfold in short periods of time, but they might be longer.",
    relations: "Relations: Relation between individuals, between individuals and communities, between communities, or between individuals/communities and abstract phenomena (f.ex. values, norms, practices, or ideologies) are central in historical evolution. Relations (all types of relations) might last from a short period to a lifetime (including the lifetimes of groups), they unfold in specific spaces (personal) or in large areas (collective), and follow relevant sociocultural norms.",
    models: "Models: Models have a didactic, and often imperative, dimension. They dictate the way of organizing, structuring, executing and sometimes experiencing and evaluating events and relations. The components constituting the model determine the way in which relevant events and/or relations get realized. Models differ from time to time and from space to space. Their temporal dimension might be decades, centuries or millennia. In terms of space, they might be related to areas much wider than that of individual societies, including several cultural areas that belong to the same “world”.",
    structures: "Structures: The term signifies cultural and sociocultural structures that have been established over very long periods of time. Think for example of structures as the family or democracy. The timespace of structures operates on a cultural level and is associated with specific cultures and their operating principles. Its time is usually longer than that of models (centuries and sometimes millennia long). Its space might be the same or broader than that of models. ",
    ultrastructures: "Ultrastructures: The term signifies (a) natural ultrastructures, such as specific climatic conditions or ecosystems, and (b) cultural, political and social principles so deeply rooted that no one dares to challenge them. The timespace of ultrastructures exceeds the limits of individual cultures and exists on an intercultural and transcultural level. Its time is usually millennia (or at least many centuries) old. Its space extends to the whole world of at least what we metaphorically call “worlds”, as for example the Western World."
}

function Abstract() {
    const options = {
        labels: false,
        splitMode: true,
        globalYearControl: false,
        modelControls: false,
        wireframeMode: true,
        outlines: true,
        modelInfo: true,
        modelZoom: true,
        zoomButtons: true,
        timeline: false,
        fullwidth: false,
    }
    return(
        <>
            <ModelCanvas options={options}/>
            <div className="belowContainer">
                {Object.keys(modelTexts).map((text) => {
                    console.log(modelTexts[text]);
                    return <p>{modelTexts[text]}</p>
                })}
            </div>
        </>
    )
}

export default Abstract;