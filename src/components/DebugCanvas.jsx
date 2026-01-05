import React, { useEffect, useRef, useState } from "react";

export default function DebugCanvas({ audioSrc }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [audioCtxState, setAudioCtxState] = useState("not created");
  const [freqData, setFreqData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("Canvas initialized - should see this text", 20, 40);

    let animationFrameId;
    let audioCtx;
    let analyser;
    let dataArray;

    if (audioRef.current) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioCtxState(audioCtx.state);

      const source = audioCtx.createMediaElementSource(audioRef.current);
      analyser = audioCtx.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 64;
      dataArray = new Uint8Array(analyser.frequencyBinCount);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000022";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        analyser.getByteFrequencyData(dataArray);
        setFreqData([...dataArray]);

        // Draw bars for frequency data
        const barWidth = canvas.width / dataArray.length;
        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = dataArray[i];
          ctx.fillStyle = `rgb(${barHeight + 100},50,150)`;
          ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      // Resume AudioContext if suspended
      if (audioCtx.state === "suspended") {
        audioCtx.resume().then(() => {
          setAudioCtxState(audioCtx.state);
          draw();
        });
      } else {
        draw();
      }
    } else {
      ctx.fillStyle = "red";
      ctx.fillText("No audio element found or ref is null", 20, 80);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (audioCtx) audioCtx.close();
    };
  }, [audioSrc]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        controls
        style={{ position: "fixed", bottom: 20, left: 20, zIndex: 1000 }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}
      />
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          color: "white",
          backgroundColor: "#000a",
          padding: 10,
          fontFamily: "monospace",
          zIndex: 1000,
          maxWidth: 300,
          overflowWrap: "break-word",
        }}
      >
        <div>AudioContext state: {audioCtxState}</div>
        <div>Frequency data (first 10 bins): {freqData ? freqData.slice(0, 10).join(", ") : "N/A"}</div>
      </div>
    </>
  );
}
