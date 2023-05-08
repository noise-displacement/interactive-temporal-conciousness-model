import { Link } from "react-router-dom";
import { routes } from "../App";

function NavComponent(props) {
  return (
    <>
      {props.pathName === props.location ? (
        <span>{props.name}</span>
      ) : (
        <Link to={props.pathName}>{props.name}</Link>
      )}
    </>
  );
}

function MainNav(props) {
  let location = props.location.pathname;
  let locationName = location.substr(1);
  let currentRoute = routes[locationName];

  return (
    <>
      <nav className="mainNav" id="mainNav">
        <div className="container">

            <div className="holder logo">
                <Link to={routes.model.path}>
                    <img src="/images/logo.svg" alt="Logo" />
                </Link>
            </div>

          <div className="holder">
            <NavComponent
              location={location}
              pathName={routes.model.path}
              name={routes.model.name}
            />
            <NavComponent
              location={location}
              pathName={routes.exampleText.path}
              name={routes.exampleText.name}
            />
            <NavComponent
              location={location}
              pathName={routes.example.path}
              name={routes.example.name}
            />
          </div>

          <div className="holder">
            <NavComponent
              location={location}
              pathName={routes.editor.path}
              name={routes.editor.name}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default MainNav;
