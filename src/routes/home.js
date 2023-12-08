import { Link } from "react-router-dom";
import { routes } from "../App";
import Footer from "../components/footer";

function About(props) {
  return (
    <>
      <div className="aboutBox">
        <div className="aboutContainer">
          <div className="wrapper">
            <img
              className="logoIcon"
              src="/images/logoicon.png"
              alt="Project logo"
            />
            <div className="header">
              <div className="text">
                <h1>3D modeling of historical timespaces</h1>
                <p>
                  An interactive visualization of the theory presented in the
                  book:{" "}
                  <i>
                    Historical Consciousness: Cognitive and Metacognitive
                    Reflections
                  </i>{" "}
                  by Professor Apostolos Spanos.
                </p>
                <br />
                <p>To get started learning about the theory:</p>
              </div>

              <div className="buttonContainer">
                <Link className="linkButton" to={routes.model.path}>
                  Theory
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="textContainer">
              <div className="header">
                <h2>About the project</h2>
                {/* <button className="linkButton" onClick={() => props.setAboutOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button> */}
              </div>
              <p>
                The project “3D modeling of historical timespaces” is one of the
                activities of the Digital History Lab at the University of
                Agder. The lab aims at utilizing and developing cutting-edge
                digital technologies related to both studying and teaching
                history. It also aims at supporting historians and scientists in
                other disciplines based on the use of historical evidence and
                data.
                <br />
                <br /> The lab's main areas of interest are: AI in studying and
                teaching history; Simulation modelling in studying and teaching
                history; 3D modelling in studying and teaching history;
                Immersive technology, augmented reality, and history; Big data
                in studying and teaching history; GIS in studying and teaching
                history; Development of digital games suitable for teaching
                history; Teacher training in using digital technologies in
                history teaching. <br />
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

          <div className="wrapper">
            <div className="textContainer">
              <div className="header">
                <h2>Developed by</h2>
              </div>

              <p>
                The text content and theory on this page has been developed by
                Professor Apostolos Spanos. The visualization, layout and web
                development has been created as part of the bachelor's project{" "}
                <i>Interactive 3D-visualization of history theory for web</i> by
                Sondre Moldskred Netteland and Marthe Flaarønning Bøhmer at the
                University of Agder.
              </p>

              <div className="personContainer">
                <div className="personWrapper">
                  <div className="image">
                    <img
                      src="/images/apostolos.jpg"
                      alt="Portrait of Apostolos Spanos"
                    />
                  </div>
                  <h3 className="name">Prof. Apostolos Spanos</h3>
                  <span className="title">Author</span>
                  <a href="https://www.uia.no/en/kk/profil/apostols">
                    uia.no/kk/profil/apostolos
                  </a>
                </div>

                <div className="personWrapper">
                  <div className="image">
                    <img
                      src="/images/marthe.jpg"
                      alt="Portrait of Marthe Bøhmer"
                    />
                  </div>
                  <h3 className="name">Marthe Flaarønning Bøhmer</h3>
                  <span className="title">Designer</span>
                  <a href="https://www.marthebohmer.com/">marthebohmer.com</a>
                </div>

                <div className="personWrapper">
                  <div className="image">
                    <img
                      src="/images/sondre.jpg"
                      alt="Portrait of Sondre Netteland"
                    />
                  </div>
                  <h3 className="name">Sondre Moldskred Netteland</h3>
                  <span className="title">Web Developer</span>
                  <a href="https://6th.no/">6th.no</a>
                </div>
              </div>

              {/* <p>The content of this page is copyrighted by the University of Agder</p> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
