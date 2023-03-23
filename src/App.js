import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import MainTemplate from "./templates/main.template";

import Example from "./routes/example";
import Abstract from "./routes/abstract";
import Home from "./routes/home";

import "./App.css";
import Editor from "./routes/editor";

export const routes = {
  home: {
    name: "Home",
    index: true,
    path: "/",
    element: <Home />,
  },

  model: {
    name: "Model",
    index: false,
    path: "/model",
    element: <Abstract />,
  },

  example: {
    name: "Example",
    index: false,
    path: "/example",
    element: <Example />,
  },

  editor: {
    name: "Editor",
    index: false,
    path: "/editor",
    element: <Editor />,
  },
};

function App() {
  const location = useLocation();

  return (
      <div className="App">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<MainTemplate location={location} />}>
              <Route
                index
                element={routes.home.element}
                routeObject={routes.home}
              />
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
