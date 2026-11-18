export interface CanvasSize {
  widthPx: number;
  heightPx: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  radiusPx: number;
  alpha: number;
  alphaTarget: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export const EDGE_FADE_PX = 20; // particles fade out over the last 20px before an edge
export const ALPHA_STEP = 0.02; // fade-in per frame

export function randomCircle(size: CanvasSize): Circle {
  return {
    x: Math.floor(Math.random() * size.widthPx),
    y: Math.floor(Math.random() * size.heightPx),
    translateX: 0,
    translateY: 0,
    radiusPx: Math.floor(Math.random() * 2) + 0.1,
    alpha: 0,
    alphaTarget: Number((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
    magnetism: 0.1 + Math.random() * 4,
  };
}

function edgeDistancePx(circle: Circle, size: CanvasSize): number {
  const left = circle.x + circle.translateX - circle.radiusPx;
  const right = size.widthPx - circle.x - circle.translateX - circle.radiusPx;
  const top = circle.y + circle.translateY - circle.radiusPx;
  const bottom = size.heightPx - circle.y - circle.translateY - circle.radiusPx;
  return Math.min(left, right, top, bottom);
}

// one frame of drift, fade and mouse pull; false once the circle has left the canvas
export function stepCircle(
  circle: Circle,
  size: CanvasSize,
  mouse: Point,
  staticity: number,
  ease: number,
): boolean {
  if (staticity <= 0 || ease <= 0) throw new Error("invariant: staticity and ease must be > 0");

  const edgeRatio = Number(Math.max(edgeDistancePx(circle, size) / EDGE_FADE_PX, 0).toFixed(2));
  if (edgeRatio > 1) {
    circle.alpha = Math.min(circle.alpha + ALPHA_STEP, circle.alphaTarget);
  } else {
    circle.alpha = circle.alphaTarget * edgeRatio;
  }

  circle.x += circle.dx;
  circle.y += circle.dy;
  const pull = staticity / circle.magnetism;
  circle.translateX += (mouse.x / pull - circle.translateX) / ease;
  circle.translateY += (mouse.y / pull - circle.translateY) / ease;

  if (circle.alpha < 0 || circle.alpha > 1) throw new Error(`invariant: alpha ${circle.alpha}`);
  const r = circle.radiusPx;
  if (circle.x < -r || circle.x > size.widthPx + r) return false;
  if (circle.y < -r || circle.y > size.heightPx + r) return false;
  return true;
}
