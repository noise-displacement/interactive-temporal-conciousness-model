import { Raycaster } from "three";
import "./App.css";
import ModelCanvas from "./components/ModelCanvas";
import ThreeJS from "./modules/deprecated/models";
import RayCasterSet from "./modules/raycaster";

function App() {
  return (
    <div className="App">
      {/* <ThreeJS /> */}
      <ModelCanvas />
    </div>
  );
}

export default App;