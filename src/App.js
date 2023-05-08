import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import MainTemplate from "./templates/main.template";

import Example from "./routes/example";
import Abstract from "./routes/abstract";

import "./App.css";
import Editor from "./routes/editor";
import ExampleText from "./routes/exampleText";

export const routes = {
  model: {
    name: "Theory",
    index: true,
    path: "/",
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

//setScrollY(e.target.scrollTop)

function App() {
  const location = useLocation();

  return (
    //<Provider store={store}>
      <div className="App">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<MainTemplate location={location} />}>
              <Route
                index
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
    //</Provider>
  );
}

export default App;
