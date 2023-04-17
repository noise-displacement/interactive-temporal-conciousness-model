import { Link } from "react-router-dom";
import { routes } from "../App";

function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="wrapper">
          <div className="textContainer">
            <h1>3D Modeling of historical timespaces</h1>
            <p>
              The project “3D modeling of historical timespaces” is one of the
              activities of the Digital History Lab at the University of Agder.
              The lab aims at utilizing and developing cutting-edge digital
              technologies related to both studying and teaching history. It
              also aims at supporting historians and scientists in other
              disciplines based on the use of historical evidence and data. The
              lab's main areas of interest are: AI in studying and teaching
              history; Simulation modelling in studying and teaching history; 3D
              modelling in studying and teaching history; Immersive technology,
              augmented reality, and history; Big data in studying and teaching
              history; GIS in studying and teaching history; Development of
              digital games suitable for teaching history; Teacher training in
              using digital technologies in history teaching. The main vision of
              the Digital History Lab is the co-creation of knowledge by
              faculty, graduate and undergraduate students from various
              faculties, universities, and research centers. An aim related to
              this vision is the cooperation of students from different
              faculties (and hopefully from different universities) in common
              projects, under the supervision of colleagues with varying fields
              of specialty.
            </p>

            <div className="buttonContainer">
              <Link className="moduleLink" to={routes.model.path}>
                Theory
                <span class="material-symbols-outlined">arrow_forward</span>
              </Link>

              <Link className="moduleLink" to={routes.example.path}>
                Model
                <span class="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
