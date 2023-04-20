import {
  ArcballControls,
  Html,
  OrbitControls,
  PresentationControls,
  TrackballControls,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import ModelCanvas from "../components/ModelCanvas";
import { examples, models } from "../components/structureInfo";
import { structureTypes } from "../components/structureInfo";
import * as THREE from "three";
import { gsap } from "gsap";
import Footer from "../components/footer";
import { deg_to_rad } from "../modules/ModelLoader";
import { Remarkable } from "remarkable";
import { Link } from "react-router-dom";

const modelTexts = {
  events: {
    text: "Event is results of human actions or natural phenomena that are important for the historical evolution of the relevant individuals and/or groups. Events gets recorded in our historical memory, and as a part of our experience they influence our expectations and decisions for the future. Individual events unfold in specific spaces, while collective events might unfold in large areas. They usually unfold in short periods of time, but they might be longer.",
    title: "Events",
  },
  relations: {
    title: "Relations",
    text: "Relation between individuals, between individuals and communities, between communities, or between individuals/communities and abstract phenomena (f.ex. values, norms, practices, or ideologies) are central in historical evolution. Relations (all types of relations) might last from a short period to a lifetime (including the lifetimes of groups), they unfold in specific spaces (personal) or in large areas (collective), and follow relevant sociocultural norms.",
  },
  models: {
    title: "Models",
    text: "Models have a didactic, and often imperative, dimension. They dictate the way of organizing, structuring, executing and sometimes experiencing and evaluating events and relations. The components constituting the model determine the way in which relevant events and/or relations get realized. Models differ from time to time and from space to space. Their temporal dimension might be decades, centuries or millennia. In terms of space, they might be related to areas much wider than that of individual societies, including several cultural areas that belong to the same “world”.",
  },

  structures: {
    title: "Structures",
    text: "The term signifies cultural and sociocultural structures that have been established over very long periods of time. Think for example of structures as the family or democracy. The timespace of structures operates on a cultural level and is associated with specific cultures and their operating principles. Its time is usually longer than that of models (centuries and sometimes millennia long). Its space might be the same or broader than that of models. ",
  },
  ultrastructures: {
    title: "Ultrastructures",
    text: "The term signifies (a) natural ultrastructures, such as specific climatic conditions or ecosystems, and (b) cultural, political and social principles so deeply rooted that no one dares to challenge them. The timespace of ultrastructures exceeds the limits of individual cultures and exists on an intercultural and transcultural level. Its time is usually millennia (or at least many centuries) old. Its space extends to the whole world of at least what we metaphorically call “worlds”, as for example the Western World.",
  },

  axis: {
    title: "Axes",
    text: "**Space:** Space dimensions are registered in five levels: microcosmic, local, national, regional (transnational), and universal.  The microcosmic level refers to small groups of people, as for example families or professional environments, which have a power over, or at least influence, individual decisions and actions. The local level refers to towns, cities, or local areas, as for example islands. The national level is not simply political/geographical, but also cultural, including the relevant national diasporas. The regional level might refer to geographical areas, as for example Scandinavia or Latin America, or to cultural systems, as for example the Muslim or the Western worlds. **Norms:** The axis of norms illustrates whether a timespace is related to social rules and cultural norms or included in religious rules and state laws. The difference between them is that social rules and cultural norms have only normative power (sometimes too strong), while religious rules and state laws are related to consequences. In most cases, religious rules and state laws are more powerful than social rules and cultural norms, but there are cases in which the opposite is true. This is why we “weight” all of them equally.",
  },
};

const setPos = (model, scrollY, lastModel) => {
  let pos = model + scrollY / 100;
  let lastPos = lastModel + scrollY / 100;
  let rotation = 0;

  if (scrollY < 100) {
    pos = -scrollY / 15;
  } else if (pos < 0) {
    pos = model + scrollY / 100;
  } else {
    pos = 0;
  }

  if (lastPos && lastPos > 0) {
    rotation += deg_to_rad(lastPos + scrollY / 200);
    //console.log(rotation, scrollY);
  }

  return { pos, rotation };
};

function scrollToView(e, otherElement) {
  let element =
    document.getElementById(otherElement) ||
    document.getElementById(e.target.innerHTML);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  let newText = renderedHTML;
  newText = renderedHTML.replace(/<strong>/g, "<br /><strong>");
  //console.log(newText);
  return { __html: newText };
}

function Abstract() {
  const sphere = useLoader(GLTFLoader, models.sphere.path);
  const hedron = useLoader(GLTFLoader, models.hedron.path);
  const cube = useLoader(GLTFLoader, models.cube.path);
  const cone = useLoader(GLTFLoader, models.cone.path);
  const axis = useLoader(GLTFLoader, models.axis.path);
  //console.log(axis);

  // let pos = {
  //   sphere: -29,
  //   hedron: -23,
  //   cube: -17,
  //   cone: -11.3,
  //   event: -5.6,
  // };

  //console.log(document.getElementById("Relations").offsetTop);

  let windowWidth = window.screen.width;
  let windowHeight = window.screen.height;

  //console.log(windowWidth, windowHeight);

  let pos = useRef({
    sphere: 0,
    hedron: 0,
    cube: 0,
    cone: 0,
    event: 0,
    axis: 0,
  });

  let spherePos = 300;

  const [scrollY, setScrollY] = useState(0);

  const modelsNum = [1, 2, 3, 4, 5, 6];
  const modelRefs = useRef(modelsNum.map(() => React.createRef()));

  // useEffect(() => {
  //   setModelPos({
  //     sphere: document.getElementById("Ultrastructures").offsetTop,
  //     hedron: document.getElementById("Structures").offsetTop,
  //     cube: document.getElementById("Models").offsetTop,
  //     cone: document.getElementById("Relations").offsetTop,
  //     event: document.getElementById("Events").offsetTop,
  //   })
  // }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = scrollRef.current.scrollTop;
  //     setScrollY(scrollTop);
  //     console.log(scrollY);
  //   };

  //   const evListn = scrollRef.current.addEventListener("scroll", handleScroll);

  //   return () => {
  //     // evListn.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
  };

  useEffect(() => {
    pos.current = {
      axis: -modelRefs.current[5].current.offsetTop / 100,
      sphere: -modelRefs.current[4].current.offsetTop / 100,
      hedron: -modelRefs.current[3].current.offsetTop / 100,
      cube: -modelRefs.current[2].current.offsetTop / 100,
      cone: -modelRefs.current[1].current.offsetTop / 100,
      event: -modelRefs.current[0].current.offsetTop / 100,
    };
  });

  return (
    // <>
    //   <div className="abstractContainer canvasContainer">
    //     <ModelCanvas
    //       options={options}
    //       modelRefresh={modelRefresh}
    //       currentExample={currentExample}
    //     />
    //   </div>
    //   <div className="belowContainer">
    //     {Object.keys(modelTexts).map((text) => {
    //       return <p>{modelTexts[text]}</p>;
    //     })}
    //   </div>
    // </>

    <>
      <div className="abstractContainer">
        <div className="canvasContainer">
          <Canvas gl={{ localClippingEnabled: true, far: 20000, near: 0 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} intensity={2} />

            {/* <PresentationControls enabled={true} snap={true}> */}
            <group>
              <Suspense>
                <mesh
                  position={[0, setPos(pos.current.axis, scrollY).pos, -1]}
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    deg_to_rad(90),
                  ]}
                >
                  <primitive object={axis.scene}></primitive>
                </mesh>
                <Html
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    deg_to_rad(0),
                  ]}
                  scale={0.7}
                  position={[
                    1.5,
                    setPos(pos.current.axis, scrollY).pos - 0.5,
                    0,
                  ]}
                  transform
                >
                  <span>Space</span>
                </Html>

                <Html
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    deg_to_rad(0),
                  ]}
                  scale={0.7}
                  position={[0.5, setPos(pos.current.axis, scrollY).pos + 2, 0]}
                  transform
                >
                  <span>Norms</span>
                </Html>

                <Html
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    deg_to_rad(0),
                  ]}
                  scale={0.7}
                  position={[
                    1.5,
                    setPos(pos.current.axis, scrollY).pos + 1,
                    -1,
                  ]}
                  transform
                >
                  <span>Time</span>
                </Html>
              </Suspense>

              <Suspense>
                <mesh
                  geometry={sphere.nodes.Sphere.geometry}
                  position={[
                    0,
                    setPos(pos.current.sphere, scrollY, pos.current.sphere).pos,
                    -1,
                  ]}
                  scale={1.5}
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    0,
                  ]}
                >
                  <meshStandardMaterial
                    color={structureTypes.ultraStructure.color}
                    clippingPlanes={[
                      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
                    ]}
                    side={THREE.DoubleSide}
                  ></meshStandardMaterial>
                </mesh>
              </Suspense>

              <Suspense>
                <mesh
                  geometry={hedron.nodes.Icosphere.geometry}
                  scale={[1.3, 1.3, 1]}
                  position={[0, setPos(pos.current.hedron, scrollY).pos, -1]}
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    0,
                  ]}
                >
                  <meshStandardMaterial
                    color={structureTypes.structure.color}
                    clippingPlanes={[
                      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
                    ]}
                    side={THREE.DoubleSide}
                  ></meshStandardMaterial>
                </mesh>
              </Suspense>

              <Suspense>
                <mesh
                  geometry={cube.nodes.Cube.geometry}
                  scale={[0.8, 0.8, 0.2]}
                  position={[0, setPos(pos.current.cube, scrollY).pos, -1]}
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    0,
                  ]}
                >
                  <meshStandardMaterial
                    color={structureTypes.model.color}
                    clippingPlanes={[
                      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
                    ]}
                    side={THREE.DoubleSide}
                  ></meshStandardMaterial>
                </mesh>
              </Suspense>

              <Suspense>
                <mesh
                  geometry={cone.nodes.Cone.geometry}
                  scale={[0.4, 0.4, 0.2]}
                  position={[0, setPos(pos.current.cone, scrollY).pos, -1]}
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    deg_to_rad(90),
                  ]}
                >
                  <meshStandardMaterial
                    color={structureTypes.relation.color}
                    //clippingPlanes={[new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)]}
                    side={THREE.DoubleSide}
                  ></meshStandardMaterial>
                </mesh>
              </Suspense>

              <Suspense>
                <mesh
                  geometry={sphere.nodes.Sphere.geometry}
                  scale={0.1}
                  position={[-0.35, setPos(pos.current.event, scrollY).pos, -1]}
                  rotation={[
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    setPos(0, scrollY, pos.current.sphere).rotation,
                    deg_to_rad(90),
                  ]}
                >
                  <meshStandardMaterial
                    color={structureTypes.event.color}
                    side={THREE.DoubleSide}
                  ></meshStandardMaterial>
                </mesh>
              </Suspense>
            </group>
            {/* </PresentationControls> */}
          </Canvas>
        </div>
        <div
          className="textWrapper"
          onScroll={(e) => {
            setScrollY(e.target.scrollTop);
          }}
        >
          <button
            className="scrollTopButton linkButton"
            onClick={(e) => scrollToView(e, "headerContainer")}
          >
            To top
          </button>

          <div className="textContainer" id="textContainer">
            <div className="headerContainer" id="headerContainer">
              <div className="text">
                <h1>Model Theory</h1>
                <p>
                  The model is based on a theory of historical dimensions of
                  time and space, which Apostolos Spanos calls “historical
                  timespaces”. The theory claims that history unfolds in five
                  timespaces, namely the timespaces of events, relations,
                  models, structures, and ultrastructures. All these timespaces
                  coexist in any moment, or period, we identify as present. They
                  include ideas, practices, and knowledge related to the past of
                  the relevant individuals and groups, but they are also related
                  to the future, as they are taken into consideration when we
                  form our expectations, hopes and fears the future.
                </p>
              </div>

              <div className="buttonContainer">
                {Object.keys(modelTexts).map((text, i) => {
                  return (
                    <button
                      key={i}
                      className="linkButton"
                      onClick={(e) => scrollToView(e, modelTexts[text].title)}
                    >
                      {modelTexts[text].title}
                    </button>
                  );
                })}
              </div>

              <div className="readMoreContainer">
                <span>Scroll to read more</span>
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>

            {Object.keys(modelTexts).map((text, i) => {
              const markup = renderMarkdownToHTML(modelTexts[text].text);
              return (
                <div
                  ref={modelRefs.current[i]}
                  key={text}
                  className="textBlock"
                  id={modelTexts[text].title}
                >
                  <h2>{modelTexts[text].title}</h2>
                  <p dangerouslySetInnerHTML={markup}></p>
                </div>
              );
            })}

            <div className="endContainer textBlock">
              <h2>Next steps</h2>
              <p>
                On the Model page you can test out this theory. Or check out
                some examples on the Example page.
              </p>
              <div className="buttonContainer">
                <Link to={"/model"} className="linkButton">
                  Model
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
                <Link to={"/example"} className="linkButton">
                  Example
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Abstract;
