import './App.css';
import React, { useState, useEffect } from "react";
import Model from "./Washer/Model"
import Canvas from "./Shapes/Canvas";
import Deltoidal_Icositetrahedron from './Shapes/Deltoidal_icositetrahedron';
import Hexagonal_Prism from './Shapes/Hexagonal_Prism';
import Cube from './Shapes/Cube';
  
function App() {
  const [shapes, setShapes] = useState([]);
  const [s, setS] = useState(false);
  const [a, setA] = useState(false);

  return (
    <div>
      <button onClick={() => setS(true)} hidden={ a || s }>
        SHAPES
      </button>
      <button onClick={() => (setA(true))} hidden={a || s}>
        WASHER MODEL
      </button>

      <div 
        hidden={!s}
      >
        <button onClick={() => setS(false)}>
          BACK
        </button>
        <Canvas shapes={shapes}/>
        <div 
          style={{
            display: "flex", 
            flexDirection: "row",
          }}
        >
          <Deltoidal_Icositetrahedron shapes={shapes} setShapes={setShapes}/>
          <Cube shapes={shapes} setShapes={setShapes}/>
          <Hexagonal_Prism shapes={shapes} setShapes={setShapes}/>
          {/* <Model shapes={shapes} setShapes={setShapes} /> */}
        </div>
      </div>
      <div hidden={!a} >
        <button onClick={() => setA(false)}>
          BACK
        </button>
      </div>
    </div>
  )
}

export default App;
