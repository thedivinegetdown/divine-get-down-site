import React, { useEffect, useRef } from "react";

export default function AudioVisualizer({ audioRef }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    // Create audio context and analyser
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioCtx;

    const source = audioCtx.createMediaElementSource(audioRef.current);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 100;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArrayRef.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArrayRef.current[i] / 2;
        ctx.fillStyle = `rgba(252, 204, 21, ${barHeight / 128})`; // Gold tone, opacity based on amplitude
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100px",
        zIndex: 1000,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
      aria-hidden="true"
    />
  );
}
