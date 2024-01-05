import { useEffect } from "react"
import TreeNode from "../TreeNode";

class shape {
  constructor() {
    this.ID = 2;

    let cartesian_points = [
      // first layer 0 - 3
      [Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2], // 0
      [0, Math.sqrt(2) / 2, Math.sqrt(2) / 2], // 1
      [-Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2], // 2
      [0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2], // 3

      // mid layer 4-7
      [Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0], // 4
      [-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0], // 5
      [-Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0], // 6
      [Math.sqrt(2) / 2, -Math.sqrt(2) / 2, 0], // 7

      // last layer 8-11
      [0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2], // 8
      [Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2], // 9
      [0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2], // 10
      [-Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2], // 11

      // red 12 - 17
      [0, 0, 1], // 12
      [1, 0, 0], // 13
      [0, 1, 0], // 14
      [-1 ,0, 0], // 15
      [0, -1, 0], // 16
      [0, 0, -1], // 17

      // yellow 18 - 25
      [(2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7], // 18
      [-(2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7], // 19
      [-(2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7], // 20
      [(2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7], // 21
      [(2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7], // 22
      [-(2 * Math.sqrt(2) + 1) / 7, (2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7], // 23
      [-(2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7],  // 24
      [(2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7, -(2 * Math.sqrt(2) + 1) / 7], // 25

    ]

    let points = [...cartesian_points]
    this.points = points

    this.faces = [
      [points[12], points[0], points[18], points[1]],
      [points[12], points[1], points[19], points[2]],
      [points[12], points[2], points[20], points[3]],
      [points[12], points[3], points[21], points[0]],
      [points[13], points[0], points[18], points[4]],
      [points[14], points[4], points[18], points[1]],
      [points[14], points[1], points[19], points[5]],
      [points[15], points[5], points[19], points[2]],
      [points[15], points[2], points[20], points[6]],
      [points[16], points[6], points[20], points[3]],
      [points[16], points[3], points[21], points[7]],
      [points[13], points[7], points[21], points[0]]







    ];

    this.origin = [0, 0, 0];
  }
}

export default function Deltoidal_Icositetrahedron({shapes, setShapes}) {

    function update() {
      let s = [...shapes];
  
      s.push(new shape());
      
      setShapes(s);
    }

    return (
        <>
        <button onClick={() => update()}>
            <div>
                Deltoidal
            </div>
            <div>
                Icositetrahedron
            </div>
        </button>      
        </>
    )
}

