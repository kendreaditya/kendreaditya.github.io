"use client";

import { useEffect, useRef } from "react";

export default function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create noise pattern
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        const alpha = Math.random() * 0.12; // More visible noise
        
        data[i] = noise;     // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = alpha * 255; // Alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animate noise
    const animateNoise = () => {
      createNoise();
      requestAnimationFrame(animateNoise);
    };

    // Start with a slight delay and lower frame rate for performance
    let frame = 0;
    const animate = () => {
      frame++;
      if (frame % 4 === 0) { // Update every 4 frames (~15fps)
        createNoise();
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-60"
      style={{
        mixBlendMode: "overlay",
      }}
    />
  );
}