import { expect, test } from "bun:test";
import { ALPHA_STEP, type Circle, randomCircle, stepCircle } from "./particle-physics";

const SIZE = { widthPx: 1000, heightPx: 1000 };
const STILL_MOUSE = { x: 0, y: 0 };

function circleAt(x: number, y: number, alpha: number): Circle {
  return {
    x,
    y,
    translateX: 0,
    translateY: 0,
    radiusPx: 0.5,
    alpha,
    alphaTarget: 0.5,
    dx: 1,
    dy: 0,
    magnetism: 1,
  };
}

// goal: pin the fade rules (fade in by a step, cap at target, fade by edge distance) and
// the off-canvas signal, each on one hand-built circle
test("mid-canvas circle fades in one step and drifts", () => {
  const circle = circleAt(500, 500, 0);
  expect(stepCircle(circle, SIZE, STILL_MOUSE, 50, 50)).toBe(true);
  expect(circle.alpha).toBeCloseTo(ALPHA_STEP);
  expect(circle.x).toBe(501);
});

test("fade-in stops at the target alpha", () => {
  const circle = circleAt(500, 500, 0.49);
  stepCircle(circle, SIZE, STILL_MOUSE, 50, 50);
  expect(circle.alpha).toBe(0.5);
});

test("near an edge, alpha scales with distance to it", () => {
  const circle = circleAt(10.5, 500, 0); // 10px from the left edge: half of 20px fade band
  stepCircle(circle, SIZE, STILL_MOUSE, 50, 50);
  expect(circle.alpha).toBeCloseTo(0.25);
});

test("exactly one fade band from the edge still uses the edge rule", () => {
  const circle = circleAt(20.5, 500, 0); // ratio 1.00: not > 1, so alpha = target
  stepCircle(circle, SIZE, STILL_MOUSE, 50, 50);
  expect(circle.alpha).toBeCloseTo(0.5);
});

test("a circle that drifts off the canvas reports it", () => {
  expect(stepCircle(circleAt(1000.6, 500, 0), SIZE, STILL_MOUSE, 50, 50)).toBe(false);
  expect(stepCircle(circleAt(-2, 500, 0), SIZE, STILL_MOUSE, 50, 50)).toBe(false);
  expect(stepCircle({ ...circleAt(500, 1000.6, 0), dx: 0 }, SIZE, STILL_MOUSE, 50, 50)).toBe(
    false,
  );
});

test("the mouse pulls a circle by magnetism over staticity, eased", () => {
  const circle = circleAt(500, 500, 0);
  stepCircle(circle, SIZE, { x: 100, y: 50 }, 50, 10);
  expect(circle.translateX).toBeCloseTo(100 / 50 / 10);
  expect(circle.translateY).toBeCloseTo(50 / 50 / 10);
});

test("zero staticity or ease is a programming error", () => {
  expect(() => stepCircle(circleAt(500, 500, 0), SIZE, STILL_MOUSE, 0, 50)).toThrow();
  expect(() => stepCircle(circleAt(500, 500, 0), SIZE, STILL_MOUSE, 50, 0)).toThrow();
});

test("random circles start invisible and on the canvas", () => {
  for (let i = 0; i < 100; i += 1) {
    const circle = randomCircle(SIZE);
    expect(circle.alpha).toBe(0);
    expect(circle.x).toBeGreaterThanOrEqual(0);
    expect(circle.x).toBeLessThan(SIZE.widthPx);
    expect(circle.alphaTarget).toBeGreaterThanOrEqual(0.1);
    expect(circle.alphaTarget).toBeLessThanOrEqual(0.7);
  }
});
