"use client";

import { useEffect, useRef } from "react";
import { type CanvasSize, type Circle, randomCircle, stepCircle } from "../utils/particle-physics";

const PARTICLE_COUNT_MAX = 500;

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}

function drawCircle(context: CanvasRenderingContext2D, circle: Circle): void {
  context.beginPath();
  const x = circle.x + circle.translateX;
  const y = circle.y + circle.translateY;
  context.arc(x, y, circle.radiusPx, 0, 2 * Math.PI);
  context.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
  context.fill();
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quantity < 0 || quantity > PARTICLE_COUNT_MAX) {
      throw new Error(`invariant: particle quantity ${quantity} outside 0..${PARTICLE_COUNT_MAX}`);
    }
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas === null || container === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return; // no 2D canvas: the background just goes without particles

    const dpr = window.devicePixelRatio;
    const size: CanvasSize = { widthPx: 0, heightPx: 0 };
    const mouse = { x: 0, y: 0 };
    let circles: Circle[] = [];
    let frameId = 0;

    const resize = () => {
      size.widthPx = container.offsetWidth;
      size.heightPx = container.offsetHeight;
      canvas.width = size.widthPx * dpr;
      canvas.height = size.heightPx * dpr;
      canvas.style.width = `${size.widthPx}px`;
      canvas.style.height = `${size.heightPx}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      circles = Array.from({ length: quantity }, () => randomCircle(size));
    };

    // mouse offset from the canvas centre; ignored while the pointer is outside it
    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - size.widthPx / 2;
      const y = event.clientY - rect.top - size.heightPx / 2;
      if (Math.abs(x) < size.widthPx / 2 && Math.abs(y) < size.heightPx / 2) {
        mouse.x = x;
        mouse.y = y;
      }
    };

    const frame = () => {
      context.clearRect(0, 0, size.widthPx, size.heightPx);
      for (const [index, circle] of circles.entries()) {
        const isOnCanvas = stepCircle(circle, size, mouse, staticity, ease);
        const shown = isOnCanvas ? circle : randomCircle(size);
        circles[index] = shown;
        drawCircle(context, shown);
      }
      frameId = window.requestAnimationFrame(frame);
    };

    resize();
    frameId = window.requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [quantity, staticity, ease]);

  return (
    <div className={className} ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
