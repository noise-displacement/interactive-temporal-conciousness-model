import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import MainTemplate from "./templates/main.template";

import Example from "./routes/example";
import Abstract from "./routes/abstract";

import "./App.css";
import Editor from "./routes/editor";
import ExampleText from "./routes/exampleText";
import About from "./routes/home";
import { useEffect } from "react";

export const routes = {
  about: {
    name: "About",
    index: true,
    path: "/",
    element: <About />,
  },

  model: {
    name: "Theory",
    path: "/abstract",
    element: <Abstract />,
  },

  example: {
    name: "Model",
    index: false,
    path: "/model",
    element: <Example />,
  },

  exampleText: {
    name: "Example",
    index: false,
    path: "/example",
    element: <ExampleText />,
  },

  editor: {
    name: "Editor",
    index: false,
    path: "/editor",
    element: <Editor />,
  },
};

const ScrollToTop = (props, { children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

//setScrollY(e.target.scrollTop)

function App() {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 200);
  }, [location]);

  return (
    //<Provider store={store}>
    <div className="App">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<MainTemplate location={location} />}>
            <Route index element={<About />} routeObject={routes.about} />

            <Route
              path={routes.model.path}
              element={routes.model.element}
              routeObject={routes.model}
            />
            <Route
              path={routes.example.path}
              element={routes.example.element}
              routeObject={routes.example}
            />
            <Route
              path={routes.exampleText.path}
              element={routes.exampleText.element}
              routeObject={routes.exampleText}
            />
            <Route
              path={routes.editor.path}
              element={routes.editor.element}
              routeObject={routes.editor}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
