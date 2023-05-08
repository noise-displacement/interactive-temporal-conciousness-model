import { useState } from "react";
import About from "../routes/home";

function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {aboutOpen && <About setAboutOpen={setAboutOpen} />}

      <footer className="footerContainer">
        <div className="wrapper">
          <div className="item">
            <h3>Digital History Lab</h3>
            <span>A University of Agder Project</span>
            <br />
            <span>&copy; {"2023"} University of Agder</span>
          </div>

          <div className="item">
            <h4>Links</h4>
            <ul>
              <li>
                <a href="https://www.uia.no/en/digital-history-lab">
                  Digital History Lab
                </a>
              </li>
              <li>
                <a href="https://www.uia.no/en">University of Agder</a>
              </li>

              <li>
                <button onClick={() => setAboutOpen(!aboutOpen)}>About</button>
              </li>
            </ul>
          </div>

          <div className="item">
            <h4>Something</h4>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
