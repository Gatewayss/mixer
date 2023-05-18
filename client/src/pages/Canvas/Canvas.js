import React, { useEffect, useRef, useState } from "react";
import { Puff } from 'react-loading-icons'
import Menu from "./Menu";
import "./canvas.css";

function Canvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lineOpacity, setLineOpacity] = useState(0.1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
	  ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;

    const savedImage = localStorage.getItem("canvasImage");
    if (savedImage) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
      image.src = savedImage;
    }
  }, [lineColor, lineWidth, lineOpacity]);

  const startDrawing = (e) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    setIsDrawing(true);
  };

  const endDrawing = () => {
    const ctx = ctxRef.current;
    ctx.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }

    const ctx = ctxRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const autoSave = () => {
    setIsAutoSaving(true);

    setTimeout(() => {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL("image/png");
      localStorage.setItem("canvasImage", image);

      setIsAutoSaving(false);
    }, 2000);
  };

  useEffect(() => {
    const intervalId = setInterval(autoSave, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const saveCanvasImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    localStorage.setItem("canvasImage", image);
  };

  const deleteCanvasImage = () => {
    localStorage.removeItem("canvasImage");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="App">
      <h1>Mixer Canvas</h1>
      {isAutoSaving && (
        <div className="auto-save-spinner" style={{ textAlign: 'center' }}>
          <Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} />
          <span>Auto-saving...</span>
        </div>
      )}
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          deleteCanvasImage={deleteCanvasImage}
          canvasRef={canvasRef}
		  setLineOpacity={setLineOpacity}
          saveCanvasImage={saveCanvasImage}
        />

        <canvas
          id="Mcanvas"
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`720px`}
        />
      </div>
    </div>
  );
}

export default Canvas;
