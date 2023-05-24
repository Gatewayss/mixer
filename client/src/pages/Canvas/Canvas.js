import { useEffect, useRef, useState } from "react";
import { Puff } from 'react-loading-icons'
import Menu from "./Menu";
import "./canvas.css";
import Header from "../../components/Header/Header";
// import Navbar from '../../components/Navbar/Navbar';

function Canvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [brushShape, setBrushShape] = useState('round');
  const [lineColor, setLineColor] = useState("black");
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
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
  }, [lineColor, lineWidth]);

  const startDrawing = (e) => {
    if (brushShape === 'square') {
      const ctx = ctxRef.current;
      ctx.fillRect(
        e.nativeEvent.offsetX - lineWidth / 2,
        e.nativeEvent.offsetY - lineWidth / 2,
        lineWidth,
        lineWidth
      );
    } else if (brushShape === 'round') {
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }

    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    setIsDrawing(true);
  };

  const endDrawing = () => {
    if (brushShape === 'round') {
      const ctx = ctxRef.current;
      ctx.closePath();
    }
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
    ctx.lineCap = brushShape === 'square' ? 'square' : 'round';

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
    <div className="canvas-container">
      <div className="canvas-header">
        <Header />
      </div>
      {/* <div className="canvas-navbar">
        <Navbar />
      </div> */}
      
      <div className="canvas-top">
        <div className="spinner-container">
        {isAutoSaving && (
        <div className="auto-save-spinner" style={{ textAlign: 'center' }}>
          <Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} />
          <span>Auto-saving...</span>
        </div>
        )}
        </div>
        <div className="canvas-menu-container">
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            deleteCanvasImage={deleteCanvasImage}
            canvasRef={canvasRef}
            brushShape={brushShape}
            setBrushShape={setBrushShape}
            saveCanvasImage={saveCanvasImage}
          />
          </div>
      </div>
      <div className="draw-area">
        <canvas className="canvas"
          id="Mcanvas"
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1180px`}
          height={`560px`}
        />
      </div>
    </div>
  );
}

export default Canvas;
