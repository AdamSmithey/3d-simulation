import React, { useState, useEffect } from "react"

function move(dp, shape) {
  let points = [...shape.points]                               
  let origin = [...shape.origin]

  for(let j = 0; j < points.length; j++) {
    move_point(dp, points[j])
  }

  origin[0] += dp[0]
  origin[1] += dp[1]
  origin[2] += dp[2]

  shape.points = points
  shape.origin = origin

  return shape
}

function move_point(dp, point) {
  point[0] += dp[0]
  point[1] += dp[1]
  point[2] += dp[2]

  return point
}

function rotate(dr, shape) {
  let points = [...shape.points]
  let origin = [...shape.origin]
  
  for(let j = 0; j < points.length; j++) {
    rotate_point(dr, points[j], origin)
  }

  // update values
  shape.points = points
  shape.origin = origin

  return shape
}

function rotate_point(dr, point, origin) {

  // yaw, pitch roll, α, β, γ
  let ta = dr[2] * Math.PI / 180
  let tb = dr[1] * Math.PI / 180
  let tc = dr[0] * Math.PI / 180

  // origin x, y, z
  let ox = origin[0]
  let oy = origin[1]
  let oz = origin[2]

   // get x, y, z altered by shape's position origin
   let x = point[0] - ox
   let y = point[1] - oy
   let z = point[2] - oz

   // expansion of the 3d rotation matrix
   let nx = (x * Math.cos(ta) * Math.cos(tb)) + 
             (y * (Math.cos(ta) * Math.sin(tb) * Math.sin(tc) - Math.sin(ta) * Math.cos(tc))) + 
             (z * (Math.cos(ta) * Math.sin(tb) * Math.cos(tc) + Math.sin(ta) * Math.sin(tc))) + ox

   let ny = (x * Math.sin(ta) * Math.cos(tb)) + 
             (y * (Math.sin(ta) * Math.sin(tb) * Math.sin(tc) + Math.cos(ta) * Math.cos(tc))) + 
             (z * (Math.sin(ta) * Math.sin(tb) * Math.cos(tc) - Math.cos(ta) * Math.sin(tc))) + oy

   let nz = (x * -Math.sin(tb)) + 
             (y * Math.cos(tb) * Math.sin(tc)) + 
             (z * Math.cos(tb) * Math.cos(tc)) + oz

   // input new position coordinates altered by rotation matrix
   point[0] = nx
   point[1] = ny
   point[2] = nz

   return point
}

/*
function clip_face(clipper, shape, cd, sd) {

  // Returns x-value of point of intersection of two
  // lines
  function x_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    let num = (x1*y2 - y1*x2) * (x3-x4) -
              (x1-x2) * (x3*y4 - y3*x4)
    let den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4)

    return num/den
  }

  // Returns y-value of point of intersection of
  // two lines
  let y_intersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {

    let num = (x1*y2 - y1*x2) * (y3-y4) -
              (y1-y2) * (x3*y4 - y3*x4)
    let den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4)

    return num/den
  }

  function intersection(l1, l2, l3, l4) {
    let x = x_intersect(l1[0], l1[1], l2[0], l2[1], l3[0], l3[1], l4[0], l4[1])
    let y = y_intersect(l1[0], l1[1], l2[0], l2[1], l3[0], l3[1], l4[0], l4[1])

    return [x, y]
  }

  for(let i = 0; i < clipper.length; i++) {
    let c1 = clipper[i]
    let c2 = clipper[(i+1) % clipper.length]

    let new_points = []

    for(let j = 0; j < shape.length; j++) {
      let p1 = shape[j]
      let p2 = shape[(j+1) % shape.length]

      // Calculating position of first point
      // w.r.t. clipper line
      let i_pos = (c2[0] - c1[0]) * (p1[1] - c1[1]) - (c2[1] - c1[1]) * (p1[0] - c1[0])

      // Calculating position of second point
      // w.r.t. clipper line
      let k_pos = (c2[0] - c1[0]) * (p2[1] - c1[1]) - (c2[1] - c1[1]) * (p2[0] - c1[0])
      console.log(i_pos + " " + k_pos)

      // both points inside
      if(i_pos < 0 && k_pos < 0) {
        new_points.push(p2)
      } 
      // first point outside of clip area
      else if(i_pos >= 0 && k_pos < 0) {
        let np1 = intersection(c1, c2, p1, p2)

        new_points.push(np1)
        new_points.push(p2)
      }
      // second point outside of clip area
      else if(i_pos < 0 && k_pos >= 0) {
        let np1 = intersection(c1, c2, p1, p2)

        new_points.push(np1)
      } 
      // both points outside
      else {
        // do nothing
      }
    }

    for(let j = 0; j < new_points.length; j++) {
      shape[j] = new_points[j]
    }
  }

  return shape

}

*/

function draw(shape, state) {
  var canvas = document.getElementById('canvas')
  let ctx

  try {
    ctx = canvas.getContext('2d')
  } catch {
    return
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  function get_direction(shape) {
    let area = 0
    for(let i = 0; i < shape.length; i++) {
      let p1 = shape[i]
      let p2 = shape[(i+1) % shape.length]

      area += (p2[0] - p1[0]) * (p2[1] - p1[1])
    }

    // if area is less than 0, clockwise, and if greater than 0, counterclockwise
    return area < 0
  }
  
  let camera = [
    [0],
    [0],
    [0]
  ]

  let angle = [
    [0],
    [0],
    [0]
  ]

  let e = [
    400,
    400,
    400
  ]

  let ae = [
    e[0] - 400,
    e[1] - 400,
    e[2] - 400
  ]

  let b = {}

  let points = shape.points

  // order the faces in closest to furthest
  let faces = shape.faces
  faces.sort((a, b) => {
    let max1 = 0, min1 = Number.MAX_VALUE
    for(let i = 0; i < a.length; i++) {
      let v = Math.sqrt(
                  Math.pow(a[i][0] - ae[0], 2) + 
                  Math.pow(a[i][1] - ae[1], 2) +
                  Math.pow(a[i][2] - ae[2], 2))

      max1 = Math.max(max1, v)
      min1 = Math.min(min1, v)
    }

    let max2 = 0, min2 = Number.MAX_VALUE
    for(let i = 0; i < b.length; i++) {
      let v = Math.sqrt(
                  Math.pow(b[i][0] - ae[0], 2) + 
                  Math.pow(b[i][1] - ae[1], 2) + 
                  Math.pow(b[i][2] - ae[2], 2))

      max2 = Math.max(max2, v)
      min2 = Math.min(min2, v)
    }

    return (min1 !== min2) ? min1 - min2 : max1 - max2
  })

  for(let i = 0; i < points.length; i++) {
    let point = points[i]
    
    let cx = Math.cos(angle[0][0])
    let cy = Math.cos(angle[1][0])
    let cz = Math.cos(angle[2][0])

    let sx = Math.sin(angle[0][0])
    let sy = Math.sin(angle[1][0])
    let sz = Math.sin(angle[2][0])

    let x = point[0] - camera[0][0]
    let y = point[1] - camera[1][0]
    let z = point[2] - camera[2][0]

    let d = {}

    d[0] = cy * ((sz * y) + (cz * x)) - (sy * z)
    d[1] = sx * ((cy * z) + sy * ((sz * y) + (cz * x))) + (cx * ((cz * y) - (sz * x)))
    d[2] = cx * ((cy * z) + sy * ((sz * y) + (cz * x))) - (sx * ((cz * y) - (sz * x)))
    
    b[point] = new Array(2)
    b[point][0] = (e[1] / d[1]) * d[0] + e[0]
    b[point][1] = (e[1] / d[1]) * d[2] + e[2]
  }

  shape.points_2d = Object.values(b)

  let converted = []
  let directions = []
  for(let i = 0; i < faces.length; i++) {
    let current = []
    let face = faces[i]
    for(let j = 0; j < face.length; j++) {
      current.push(b[face[j]])
    }

    converted.push(current)
    directions.push(get_direction(current))
  }

  /*
    So I don't forget in a few hours, the idea here is to iterate through all the
    faces top-down (closest to furthest from camera), and clip all the other faces below
    relative to the current face. I do this for all faces but the last one and faces
    that are completely removed. If a face is completely removed from the image, I
    do not use it as a cliping frame, nor do I consider it again in future clippings. 
    Clipping is done using the Sutherland-Hodgeman clipping algorithm.
  */

  // let l = []
  // for(let i = 0; i < 1; i++) {
  //   //if(l.includes(i)) continue
  //   let clip = converted[i]

  //   // list of faces completely removed
  //   for(let j = converted.length - 1; j > converted.length-2; j--) {
  //    // if(l.includes(j)) continue
  //     let shape = [...converted[j]]

  //     let new_face = clip_face(clip, shape, directions[i], directions[j])
  //     if(new_face.length === 0) l.push(j)
  //     console.log(converted[j])

  //     //converted[j] = new_face
  //   }
  // }

  let converted_lines = []
  for(let i = 0; i < converted.length; i++) {
    let face = converted[i]

    for(let j = 0; j < face.length; j++) {
      converted_lines.push([face[j], face[(j+1) % face.length]])
    }
  }

  ctx.beginPath()
  ctx.lineWidth = 0.6

  for (let i = 0; i < converted_lines.length; i++) {
    // let hx = b[lines[i][0]][0]
    // let hy = b[lines[i][0]][1]

    // let x = b[lines[i][1]][0]
    // let y = b[lines[i][1]][1]


    let hx = converted_lines[i][0][0]
    let hy = converted_lines[i][0][1]

    let x = converted_lines[i][1][0]
    let y = converted_lines[i][1][1]

    ctx.moveTo(hx, hy)
    ctx.lineTo(x, y)
  }

  ctx.closePath()
  ctx.stroke()
}

function Canvas(shapes) {
  const [values, setValues] = useState({ 
    translation: [0,0,0],
    rotation: [0,0,0]
  })

  const [shape, setShape] = useState()
  const [state, setState] = useState({mouseDown: false, e: null, held: []})
  const [keys, setKeys] = useState({})

  useEffect(() => {
    if(shapes.shapes.length > 0) {
      setShape(shapes.shapes[0])
    }

  }, [shapes])

  useEffect(() => {
    if (shape !== undefined) {
      draw(shape, values)
    }

    if(Object.values(keys).some(v => v)) {
      const timeout = setTimeout(() => {
        handleObjectMovement()
      }, 16.666)

    }
    
  }, [shape, values])

  const handleKeyEvent = (e) => {
    if(shape === undefined) return

    // initiate object movement if no keys are pressed
    let reload = !Object.values(keys).some(v => v)
    
    // register key
    if(e.type === "keydown") {
      if(keys[e.key]) return
      keys[e.key] = true
    } else {
      keys[e.key] = false
    }

    setKeys({...keys})
    if(reload) handleObjectMovement()
  }

  const handleObjectMovement = () => {
    // initial translational velocity
    let dp = [0, 0, 0]
    
    // set translational velocity
    if (keys['d']) dp[0] += 0.1
    if (keys['a']) dp[0] += -0.1
    if (keys['ArrowUp']) dp[1] += 0.1
    if (keys['ArrowDown']) dp[1] += -0.1
    if (keys['w']) dp[2] += 0.1
    if (keys['s']) dp[2] += -0.1

    // apply translation
    if(dp.some(v => v !== 0)) setShape(move(dp, shape))

    // initial rotational velocity
    let dr = [0, 0, 0]

    // set rotational velocity
    if (keys['x']) dr[0] += -2
    if (keys['y']) dr[1] += -2
    if (keys['z']) dr[2] += -2

    // apply rotation
    if(dr.some(v => v !== 0)) setShape(rotate(dr, shape))

    // set the total tranlational and rotational difference
    let v = values
    v.translation[0] += dp[0]
    v.translation[1] += dp[1]
    v.translation[2] += dp[2]

    v.rotation[0] += dr[0]
    v.rotation[1] += dr[1]
    v.rotation[2] += dr[2]

    // make sure rotational value does not exceed +-360
    Object.keys(v.rotation).forEach(k => {v.rotation[k] %= 360})    

    // ensure useEffect is called after every event
    setValues({...values})
  }

  const handleMouseEvent = (e, last) => {
    if(!state.mouseDown || last === undefined) return;

    var canvas = document.getElementById('canvas')
    let ctx

    try {
      ctx = canvas.getContext('2d')
    } catch {
      return
    } 

    let r = canvas.getBoundingClientRect()
    let x = e.clientX - r.left, dx = last.clientX - r.left - x
    let y = e.clientY - r.top, dy = last.clientY - r.top - y
    let points = shape.points_2d
    let t = 5
    
    draw(shape, values)

    ctx.beginPath()
    ctx.lineWidth = 0.6

    for(let i = 0; i < shape.points.length; i++) {
      let px = points[i][0]
      let py = points[i][1]

      if((Math.abs(x - px) < t && Math.abs(y - py) < t && state.held.length === 0) || state.held.includes(i)) {
        let m = {...shape}

        move_point([dx/100, 0, dy/100], shape.points[i]);

        setShape(m)
        setState(prev => ({...prev, held: state.held.concat([i])}))
      }
    }

    ctx.closePath()
    ctx.stroke()
  }

  return (
    <div className="App">
      <canvas
        id="canvas"
        tabIndex={0}
        width={800}
        height={800}
        onKeyDown={handleKeyEvent}
        onKeyUp={handleKeyEvent}
        onMouseDown={(e) => {
          state.mouseDown = true
          handleMouseEvent(e)

          setState({mouseDown: true, e: e, held: []})
        }}
        onMouseUp={(e) => {
          state.mouseDown = false
          handleMouseEvent(e)

          setState({mouseDown: false, e: e, held: []})
        }}
        onMouseMove={(e) => {
          handleMouseEvent(e, state.e)

          setState((prev) => ({...prev, e: e}))
        }}
        style={{ border: "1px solid #d3d3d3" }}
      />
    </div>
  )
}

export default Canvas
