import { useEffect } from "react";
import TreeNode from "../TreeNode"

class test {
  constructor() {
    this.ID = 1;

    let cartesian_points = [
      [-1, -1, -1], // 0
      [1, -1, -1],  // 1
      [1, 1, -1],   // 2
      [-1, 1, -1],  // 3
      [-1, -1, 1],  // 4
      [1, -1, 1],   // 5
      [1, 1, 1],    // 6
      [-1, 1, 1],   // 7
    ]

    let points = [...cartesian_points];
    this.points = points
    this.points_2d = [];

    this.lines = [
      [points[0], points[1]],
      [points[1], points[2]],
      [points[2], points[3]],
      [points[3], points[0]],
      [points[0], points[4]],
      [points[1], points[5]],
      [points[2], points[6]],
      [points[3], points[7]],
      [points[4], points[5]],
      [points[5], points[6]],
      [points[6], points[7]],
      [points[7], points[4]],
    ]

    this.origin = [0, 0, 0];
    
    this.faces = [
      [points[0], points[3], points[2], points[1]],
      [points[0], points[3], points[7], points[4]],
      [points[3], points[2], points[6], points[7]],
      [points[2], points[1], points[5], points[6]],
      [points[1], points[0], points[4], points[5]],
      [points[4], points[7], points[6], points[5]]
    ];
  }
}

export default function Cube({ shapes, setShapes }) {

  function update() {
    let s = [...shapes];

    s.push(new test())
    
    setShapes(s); 
  }

  return (
    <>
      <button onClick={() => update()}>
        <div>
          Cube
        </div>
      </button>
    </>
  )
}
