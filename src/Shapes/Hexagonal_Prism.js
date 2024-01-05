import { useEffect } from "react";
import TreeNode from "../TreeNode"

export default function Hexagonal_Prism({ shapes, setShapes}) {
  let ID = 3;

  var points = [
    // heads
    [0, -2, 1],
    [Math.sqrt(3), -1, -1],
    [Math.sqrt(3), 1, 1],
    [0, 2, -1],
    [-Math.sqrt(3), 1, 1],
    [-Math.sqrt(3), -1, -1],

    // other points
    [0, -2, -1],
    [Math.sqrt(3), -1, 1],
    [Math.sqrt(3), 1, -1],
    [0, 2, 1],
    [-Math.sqrt(3), 1, -1],
    [-Math.sqrt(3), -1, 1],
  ]

  var Tree = [
    [
      [...points[0]],
      [...points[11]],
      [...points[6]],
      [...points[7]]
    ],
    [
      [...points[1]],
      [...points[6]],
      [...points[7]],
      [...points[8]]
    ],
    [
      [...points[2]],
      [...points[7]],
      [...points[8]],
      [...points[9]]
    ],
    [
      [...points[3]],
      [...points[8]],
      [...points[9]],
      [...points[10]]
    ],
    [
      [...points[4]],
      [...points[9]],
      [...points[10]],
      [...points[11]]
    ],
    [
      [...points[5]],
      [...points[10]],
      [...points[11]],
      [...points[6]]
    ]
  ]
  
  var origin = [0, 0, 0];

  var points = Tree;

  function update() {
    console.log(shapes);
    let s = [...shapes];

    s.push({config: {"position": points, "origin": origin}, shape: ID, type: "polyhedron"});
    
    setShapes(s);
  }

  return (
    <>
      <button onClick={() => update()}>
        <div>
          Hexagonal
        </div>
        <div>
          Prism
        </div>
      </button>
    </>
  )
}