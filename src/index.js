import ReactDOM from "react-dom/client";
import "./styles.css";
// import SpherePacking from "./SpherePacking";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Canvas>
      <Scene />
    </Canvas>
    {/* <SpherePacking /> */}

  </>
);
