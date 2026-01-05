import React, { useEffect, useRef } from "react";

export default function StarryBackground({ audioRef }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const maxFPS = 30;
    let lastFrameTime = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();

    const layers = [
      {
        count: isMobile ? 40 : 80,
        radiusRange: [0.5, 1],
        baseAlphaRange: [0.3, 0.6],
        pulseSpeedRange: [0.01, 0.03],
        audioMultiplier: 0.4,
        stars: [],
      },
      {
        count: isMobile ? 30 : 50,
        radiusRange: [1.2, 2],
        baseAlphaRange: [0.6, 0.85],
        pulseSpeedRange: [0.02, 0.04],
        audioMultiplier: 0.7,
        stars: [],
      },
      {
        count: isMobile ? 10 : 20,
        radiusRange: [2, 3],
        baseAlphaRange: [0.7, 1],
        pulseSpeedRange: [0.03, 0.06],
        audioMultiplier: 1,
        stars: [],
      },
    ];

    let width = canvas.width;
    let height = canvas.height;

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        layer.stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius:
            Math.random() * (layer.radiusRange[1] - layer.radiusRange[0]) +
            layer.radiusRange[0],
          baseAlpha:
            Math.random() * (layer.baseAlphaRange[1] - layer.baseAlphaRange[0]) +
            layer.baseAlphaRange[0],
          alpha: 1,
          pulseSpeed:
            Math.random() * (layer.pulseSpeedRange[1] - layer.pulseSpeedRange[0]) +
            layer.pulseSpeedRange[0],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    });

    if (audioRef?.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        const analyser = audioContextRef.current.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContextRef.current.destination);
        analyser.fftSize = 128;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      } catch {
        analyserRef.current = null;
        dataArrayRef.current = null;
      }
    }

    const draw = (timestamp) => {
      if (timestamp - lastFrameTime < 1000 / maxFPS) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      }

      layers.forEach((layer) => {
        layer.stars.forEach((star, i) => {
          const freqIndex = Math.floor(
            (i / layer.stars.length) * (dataArrayRef.current?.length || 0)
          );
          const freqValue = dataArrayRef.current ? dataArrayRef.current[freqIndex] : 0;

          star.pulsePhase += star.pulseSpeed;
          const sinePulse = (Math.sin(star.pulsePhase) + 1) / 2;

          star.alpha =
            star.baseAlpha + (freqValue / 255) * sinePulse * layer.audioMultiplier;

          const alphaClamped = Math.min(star.alpha, 1);

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

          if (layer.radiusRange[0] >= 1.2) {
            ctx.fillStyle = `rgba(255, 230, 180, ${alphaClamped})`;
            ctx.shadowColor = "rgba(255, 215, 100, 0.8)";
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alphaClamped})`;
            ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
          }

          ctx.shadowBlur = freqValue / 2 + star.radius * 2;
          ctx.fill();
        });
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      resizeCanvas();
      width = canvas.width;
      height = canvas.height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
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
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "black",
        touchAction: "none", // 📱 prevents weird touches
      }}
    />
  );
}
