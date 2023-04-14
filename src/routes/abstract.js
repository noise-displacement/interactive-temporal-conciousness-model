import {
  ArcballControls,
  OrbitControls,
  PresentationControls,
  TrackballControls,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { degToRad } from "three/src/math/MathUtils";
import ModelCanvas from "../components/ModelCanvas";
import { examples, models } from "../components/structureInfo";
import { structureTypes } from "../components/structureInfo";
import * as THREE from "three";
import { gsap } from "gsap";
import Footer from "../components/footer";

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
};

const setPos = (model, scrollY) => {
  let pos = model + scrollY / 100;

  if(scrollY < 100) {
    pos = -scrollY / 15;
  } else if(pos < 0) {
    pos = model + scrollY / 100;
  } else {
    pos = 0;
  }
    
  return pos;
};

function Abstract() {
  const sphere = useLoader(GLTFLoader, models.sphere.path);
  const hedron = useLoader(GLTFLoader, models.hedron.path);
  const cube = useLoader(GLTFLoader, models.cube.path);
  const cone = useLoader(GLTFLoader, models.cone.path);

  // let pos = {
  //   sphere: -29,
  //   hedron: -23,
  //   cube: -17,
  //   cone: -11.3,
  //   event: -5.6,
  // };

  let pos = {
    sphere: -42.5,
    hedron: -34,
    cube: -25.5,
    cone: -17.3,
    event: -9
  }
  //console.log(cone);

  let spherePos = 300;

  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // console.log(scrollY);
  });

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
                  geometry={sphere.nodes.Sphere.geometry}
                  position={[0, setPos(pos.sphere, scrollY), 0]}
                  scale={1.5}
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
                  position={[0, setPos(pos.hedron, scrollY), 0]}
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
                  position={[0, setPos(pos.cube, scrollY), 0]}
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
                  rotation={[0, 0, degToRad(90)]}
                  position={[0, setPos(pos.cone, scrollY), 0]}
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
                  position={[-0.35, setPos(pos.event, scrollY), 0]}
                  rotation={[0, 0, degToRad(90)]}
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
          className="textContainer"
          onScroll={(e) => {
            setScrollY(e.target.scrollTop);
          }}
        >
          <div className="headerContainer">
            <h1>Model Theory</h1>
            <p>
              The model is based on a theory of historical dimensions of time
              and space, which Apostolos Spanos calls “historical timespaces”.
              The theory claims that history unfolds in five timespaces, namely
              the timespaces of events, relations, models, structures, and
              ultrastructures. All these timespaces coexist in any moment, or
              period, we identify as present. They include ideas, practices, and
              knowledge related to the past of the relevant individuals and
              groups, but they are also related to the future, as they are taken
              into consideration when we form our expectations, hopes and fears
              the future.
            </p>
          </div>

          {Object.keys(modelTexts).map((text) => {
            return (
              <div key={text} className="textBlock">
                <h2>{modelTexts[text].title}</h2>
                <p>{modelTexts[text].text}</p>
              </div>
            );
          })}

          <div className="endText textBlock">
            <h2>Ending title</h2>
            <p>Some fancy text to end it all of</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Abstract;
