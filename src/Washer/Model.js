import React, { useState, useEffect } from "react";
import "./Slider.css";

function equation1(x) {
  return ((Math.pow(Math.sqrt(x), Math.cos(2*x)))*Math.log(x));
}

function equation2(x) {
  return (Math.sqrt(x));
}

function parseEquation(e) {
  e.forEach(a => console.log(a));
}

function createLine(f) {
  var line = [];

  var length = 5;
  var a = 0.05;
  var rotation = Math.PI/32;

  for(var j = 0; j < 2*Math.PI; j += rotation) {
    var l = [];
    for(var i = 0; i < length; i += a) {
      var v = f(i);

      var radius = v;
      var y = radius * Math.cos(j);
      var z = radius * Math.sin(j);

      l.push([i, -y, z]);
    }
    line.push(l);
  }

  for(var i = 0; i < length; i += a) {
    var l = [];
    for(var j = 0; j < 2*Math.PI; j += rotation) {
      var v = f(i);

      var radius = v;
      var y = radius * Math.cos(j);
      var z = radius * Math.sin(j);

      l.push([i, -y, z]);
    }
    line.push(l);
  }

  return line;
}

function createWasher(f, washerPos) {
  var washer = [];
  var a = 0.1
  var length = 10;
  var rotation = Math.PI/24;
  var start = Math.round(washerPos)/length;

  for(var j = 0; j < 2*Math.PI; j += rotation) {
    var l = [];
    for(var i = start; Math.abs(i-(start+(a*2))) > 0.0000001; i += a) {
      console.log(i + " " + (start+2*a));
      var v = f(i);

      var radius = v;
      var y = radius * Math.cos(j);
      var z = radius * Math.sin(j);

      l.push([i, -y, z]);
    }
    washer.push(l);
  }

  for(var i = start; Math.abs(i-(start+a*2)) > 0.0000001; i += a) {
    var l = [];
    for(var j = 0; j < 2*Math.PI; j += rotation) {
      var v = f(i);

      var radius = v;
      var y = radius * Math.cos(j);
      var z = radius * Math.sin(j);

      l.push([i, -y, z]);
    }
    washer.push(l);
  }

  return washer;
}

function getLines(equation, washerPos) {

  var lines = [];

  //lines.push(createLine(equation));
  lines.push(createLine(equation));
  //lines.push(createLine(equation2));

  return lines
}

export default function Model({shape, setShape}) {
  const [inputEquation, setInputEquation] = useState("");
  const [equation, setEquation] = useState([]);
  const [sliderState, setSliderState] = useState({min: 0, max: 10, pos: 0});
  const [dragState, setDragState] = useState({click: false, start: 0});
  const [update, setUpdate] = useState(false);
  const ID = 4;

  useEffect(() => {
    console.log(update);
    if(shape.shape === ID) {
      setShape({config: getLines(equation, sliderState.pos), shape: ID, type: "washer"});
    }
  }, [update]);

  useEffect(() => {
    //setEquation(parseEquation(inputEquation))
    setEquation(() => equation1);
    setUpdate(!update)
  }, [inputEquation])

  const handleMouseDown = (e) => {
    setDragState((prev) => ({...prev, click: true, start: 0}))
  }

  const handleMouseUp = (e) => {
    setDragState((prev) => ({...prev, click: false}))
  }

  const handleMouseDrag = (e) => {
    var offset = e.currentTarget.getBoundingClientRect().x;
    if(!(sliderState.pos >= e.currentTarget.getBoundingClientRect().width - 5 && sliderState.pos - (e.clientX - offset) < 0)) {
      setSliderState((prev) => ({...prev, pos: e.clientX - offset}))
    }
    setUpdate(!update);
  }

  return (
    
    <div className="Model"
    onMouseUp={(e) => handleMouseUp(e)}
    >
      <div 
        className="wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100%",
          minWidth: "100%"
        }}
      >
        <input placeholder="Input equation 1" 
          onKeyUp={ (e) => {
              if(e.key === "Enter") {
                setShape({ config: getLines(equation, sliderState.pos), shape: ID, type: "equation" })
              }}}>
        </input>
        
        <div className="slider">
          {sliderState.min}
          <div 
            className="track-wrapper"
            onMouseMove={(e) => {
              if(dragState.click) {
                handleMouseDrag(e);
              }
            }}
          >
            <div className="track"> 
              <div 
                className="slide" 
                onMouseDown={(e) => handleMouseDown(e)}  
                style={{marginLeft: sliderState.pos}}          
              >
              </div>
            </div>
          </div>
          {sliderState.max}
        </div>
      </div>
    </div>
  )
}