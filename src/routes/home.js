import { Link } from "react-router-dom";
import { routes } from "../App";
import Footer from "../components/footer";

function About(props) {
  return (
    <>
    <div className="aboutBox">
      <div className="aboutContainer">
        <div className="wrapper">
          <h1>3D modeling of historical timespaces</h1>
          <p></p>
          <p>To get started learning about the theory, visit:</p>

          <div className="buttonContainer">
            <Link className="linkButton" to={routes.model.path}>
              Theory
              <span class="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="wrapper">
          <div className="textContainer">
            <div className="header">
              <h2>About the project</h2>
              {/* <button className="linkButton" onClick={() => props.setAboutOpen(false)}>
                <span class="material-symbols-outlined">close</span>
              </button> */}
            </div>
            <p>
              The project “3D modeling of historical timespaces” is one of the
              activities of the Digital History Lab at the University of Agder.
              The lab aims at utilizing and developing cutting-edge digital
              technologies related to both studying and teaching history. It
              also aims at supporting historians and scientists in other
              disciplines based on the use of historical evidence and data.
              <br />
              <br /> The lab's main areas of interest are: AI in studying and
              teaching history; Simulation modelling in studying and teaching
              history; 3D modelling in studying and teaching history; Immersive
              technology, augmented reality, and history; Big data in studying
              and teaching history; GIS in studying and teaching history;
              Development of digital games suitable for teaching history;
              Teacher training in using digital technologies in history
              teaching. <br />
              <br /> The main vision of the Digital History Lab is the
              co-creation of knowledge by faculty, graduate and undergraduate
              students from various faculties, universities, and research
              centers. An aim related to this vision is the cooperation of
              students from different faculties (and hopefully from different
              universities) in common projects, under the supervision of
              colleagues with varying fields of specialty.
            </p>
          </div>
        </div>
      </div>
    </div>

    <Footer /> 
    </>
  );
}

export default About;
