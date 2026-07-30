"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BASE_COLOR = new THREE.Color("#94A3B8");
const ACCENT_COLOR = new THREE.Color("#3B82F6");

type SignalFieldProps = {
  className?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return mobile;
}

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * A structural point in the exploded stack.
 * `layerY` is the explode-axis offset — it gets multiplied by the breathing
 * explode factor at runtime. `yLocal` is fixed thickness jitter within a layer.
 */
type TeardownPoint = {
  x: number;
  z: number;
  layerY: number;
  yLocal: number;
  accent: number;
};

/** A signal route between two layers that pulse particles travel along. */
type FlowPath = {
  fx: number;
  fy: number;
  fz: number;
  tx: number;
  ty: number;
  tz: number;
};

type Rand = () => number;

function pushOutline(
  pts: TeardownPoint[],
  layerY: number,
  halfW: number,
  halfD: number,
  n: number,
  rand: Rand,
  accent = 0
) {
  // Superellipse ("squircle") outline in the XZ plane.
  const k = 0.35;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand() * 0.05;
    const sx = Math.abs(Math.cos(a));
    const sz = Math.abs(Math.sin(a));
    const r = 1 / Math.pow(sx ** (2 / k) + sz ** (2 / k), k / 2);
    pts.push({
      x: Math.cos(a) * halfW * r + (rand() - 0.5) * 0.03,
      z: Math.sin(a) * halfD * r + (rand() - 0.5) * 0.03,
      layerY,
      yLocal: (rand() - 0.5) * 0.05,
      accent,
    });
  }
}

function pushFilledRect(
  pts: TeardownPoint[],
  layerY: number,
  cx: number,
  cz: number,
  w: number,
  d: number,
  n: number,
  rand: Rand,
  accent = 0
) {
  for (let i = 0; i < n; i++) {
    pts.push({
      x: cx + (rand() - 0.5) * w,
      z: cz + (rand() - 0.5) * d,
      layerY,
      yLocal: (rand() - 0.5) * 0.05,
      accent,
    });
  }
}

function pushCircle(
  pts: TeardownPoint[],
  layerY: number,
  cx: number,
  cz: number,
  r: number,
  n: number,
  rand: Rand,
  filled: boolean,
  accent = 0
) {
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const rad = filled ? r * Math.sqrt(rand()) : r * (0.9 + rand() * 0.1);
    pts.push({
      x: cx + Math.cos(a) * rad,
      z: cz + Math.sin(a) * rad,
      layerY,
      yLocal: (rand() - 0.5) * 0.05,
      accent,
    });
  }
}

function pushTrace(
  pts: TeardownPoint[],
  layerY: number,
  x1: number,
  z1: number,
  x2: number,
  z2: number,
  n: number,
  rand: Rand,
  accent = 0
) {
  for (let i = 0; i < n; i++) {
    const t = (i + rand()) / n;
    pts.push({
      x: x1 + (x2 - x1) * t + (rand() - 0.5) * 0.02,
      z: z1 + (z2 - z1) * t + (rand() - 0.5) * 0.02,
      layerY,
      yLocal: (rand() - 0.5) * 0.04,
      accent,
    });
  }
}

/** Faint dotted wire between two layers, so signal routes are visible. */
function pushWire(pts: TeardownPoint[], path: FlowPath, n: number, rand: Rand) {
  for (let i = 0; i < n; i++) {
    const t = (i + rand()) / n;
    pts.push({
      x: path.fx + (path.tx - path.fx) * t + (rand() - 0.5) * 0.02,
      z: path.fz + (path.tz - path.fz) * t + (rand() - 0.5) * 0.02,
      layerY: path.fy + (path.ty - path.fy) * t,
      yLocal: 0,
      accent: 0.18,
    });
  }
}

const SHELL = -1.15;
const PCB = -0.55;
const MODULE = 0.05;
const SENSOR = 0.62;
const GLASS = 1.2;
const LAYER_YS = [SHELL, PCB, MODULE, SENSOR, GLASS];

/**
 * Abstract device teardown, exploded along the Y axis:
 * shell → PCB → battery/module → sensor array → glass,
 * wired together by faint static signal routes.
 */
function buildTeardown(count: number, seed: number) {
  const rand = mulberry32(seed);
  const pts: TeardownPoint[] = [];

  // Bottom shell — solid base.
  pushOutline(pts, SHELL, 1.15, 0.78, 180, rand);
  pushFilledRect(pts, SHELL, 0, 0, 2.0, 1.3, 110, rand);

  // PCB — grid fill, traces, chips.
  pushOutline(pts, PCB, 1.0, 0.68, 80, rand);
  pushFilledRect(pts, PCB, 0, 0, 1.85, 1.2, 130, rand);
  pushTrace(pts, PCB, -0.85, -0.4, 0.85, -0.4, 30, rand);
  pushTrace(pts, PCB, -0.85, 0.1, 0.4, 0.1, 26, rand);
  pushTrace(pts, PCB, 0.4, 0.1, 0.4, 0.45, 14, rand);
  pushTrace(pts, PCB, -0.5, -0.4, -0.5, 0.4, 22, rand);
  pushTrace(pts, PCB, 0.1, -0.4, 0.1, 0.3, 18, rand);
  pushFilledRect(pts, PCB, -0.45, 0.22, 0.34, 0.3, 45, rand, 1);
  pushFilledRect(pts, PCB, 0.42, -0.18, 0.3, 0.26, 40, rand, 1);
  pushFilledRect(pts, PCB, -0.05, -0.15, 0.22, 0.2, 30, rand, 1);

  // Battery + secondary module.
  pushFilledRect(pts, MODULE, -0.38, 0.02, 0.88, 0.62, 150, rand);
  pushOutline(pts, MODULE, 0.98, 0.66, 60, rand);
  pushFilledRect(pts, MODULE, 0.58, -0.12, 0.44, 0.4, 70, rand, 0.5);

  // Sensor array — central lens, ring, corner sensors.
  pushCircle(pts, SENSOR, 0, 0, 0.3, 90, rand, true, 0.8);
  pushCircle(pts, SENSOR, 0, 0, 0.52, 80, rand, false);
  pushCircle(pts, SENSOR, -0.78, 0.42, 0.1, 26, rand, true);
  pushCircle(pts, SENSOR, 0.78, 0.42, 0.1, 26, rand, true);
  pushCircle(pts, SENSOR, -0.78, -0.42, 0.1, 26, rand, true);
  pushCircle(pts, SENSOR, 0.78, -0.42, 0.1, 26, rand, true);

  // Top glass — light outline, sparse fill.
  pushOutline(pts, GLASS, 1.1, 0.75, 140, rand);
  pushFilledRect(pts, GLASS, 0, 0, 1.95, 1.25, 90, rand);

  // Corner rails + cross-layer wires (static structure only).
  for (const [x, z] of [
    [0.95, 0.6],
    [-0.95, 0.6],
    [0.95, -0.6],
    [-0.95, -0.6],
  ]) {
    pushWire(
      pts,
      { fx: x, fy: SHELL, fz: z, tx: x, ty: GLASS, tz: z },
      34,
      rand
    );
  }

  for (let gap = 0; gap < LAYER_YS.length - 1; gap++) {
    for (let j = 0; j < 7; j++) {
      pushWire(
        pts,
        {
          fx: (rand() - 0.5) * 1.6,
          fy: LAYER_YS[gap],
          fz: (rand() - 0.5) * 1.0,
          tx: (rand() - 0.5) * 1.6,
          ty: LAYER_YS[gap + 1],
          tz: (rand() - 0.5) * 1.0,
        },
        9,
        rand
      );
    }
  }

  const basePos = new Float32Array(count * 3);
  const layerY = new Float32Array(count);
  const accents = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const p = pts[i % pts.length];
    const i3 = i * 3;
    basePos[i3] = p.x + (rand() - 0.5) * 0.02;
    basePos[i3 + 1] = p.yLocal;
    basePos[i3 + 2] = p.z + (rand() - 0.5) * 0.02;
    layerY[i] = p.layerY;
    accents[i] = p.accent;
    phases[i] = rand() * Math.PI * 2;
  }

  return { basePos, layerY, accents, phases };
}

const ROT_X_MIN = -1.1;
const ROT_X_MAX = 1.25;

/** Explode ↔ assemble cycle (same device, two states). */
const HOLD_OPEN = 3.6;
const ASSEMBLE = 1.7;
const HOLD_CLOSED = 2.0;
const EXPLODE = 1.7;
const CYCLE =
  HOLD_OPEN + ASSEMBLE + HOLD_CLOSED + EXPLODE;
const EXPLODE_OPEN = 1;
const EXPLODE_CLOSED = 0.16;

/** Activation sweep travels bottom-to-top while open. */
const SWEEP_PERIOD = 3.2;
const SWEEP_SPAN_FROM = -1.6;
const SWEEP_SPAN_TO = 1.7;

function explodeAmount(t: number, reducedMotion: boolean) {
  if (reducedMotion) return EXPLODE_OPEN;
  const u = t % CYCLE;
  if (u < HOLD_OPEN) return EXPLODE_OPEN;
  if (u < HOLD_OPEN + ASSEMBLE) {
    const p = easeInOutCubic((u - HOLD_OPEN) / ASSEMBLE);
    return EXPLODE_OPEN + (EXPLODE_CLOSED - EXPLODE_OPEN) * p;
  }
  if (u < HOLD_OPEN + ASSEMBLE + HOLD_CLOSED) return EXPLODE_CLOSED;
  const p = easeInOutCubic(
    (u - HOLD_OPEN - ASSEMBLE - HOLD_CLOSED) / EXPLODE
  );
  return EXPLODE_CLOSED + (EXPLODE_OPEN - EXPLODE_CLOSED) * p;
}

function TeardownPoints({
  count,
  reducedMotion,
}: {
  count: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { gl, camera, size } = useThree();

  const pointerNdc = useRef(new THREE.Vector2(999, 999));
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });
  // Captured from a preferred drag pose: more upright / straighter-on than the old 0.5 pitch.
  const rot = useRef({ x: 0.27, y: -0.5 });
  const rotVel = useRef({ x: 0, y: 0 });

  const { basePos, layerY, accents, phases } = useMemo(
    () => buildTeardown(count, 42),
    [count]
  );

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = basePos[i3];
      positions[i3 + 1] = layerY[i] + basePos[i3 + 1];
      positions[i3 + 2] = basePos[i3 + 2];
      const a = accents[i] * 0.5;
      colors[i3] = BASE_COLOR.r + (ACCENT_COLOR.r - BASE_COLOR.r) * a;
      colors[i3 + 1] = BASE_COLOR.g + (ACCENT_COLOR.g - BASE_COLOR.g) * a;
      colors[i3 + 2] = BASE_COLOR.b + (ACCENT_COLOR.b - BASE_COLOR.b) * a;
    }
    return { positions, colors };
  }, [count, basePos, layerY, accents]);

  const tmp = useMemo(
    () => ({ dir: new THREE.Vector3(), local: new THREE.Vector3() }),
    []
  );

  useEffect(() => {
    const element = gl.domElement;

    const updateNdc = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointerNdc.current.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };

    const onPointerDown = (event: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      rotVel.current.x = 0;
      rotVel.current.y = 0;
      try {
        element.setPointerCapture(event.pointerId);
      } catch {
        // Synthetic events have no active pointer to capture.
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      updateNdc(event);
      if (!drag.current.active) return;
      const dx = event.clientX - drag.current.lastX;
      const dy = event.clientY - drag.current.lastY;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      rot.current.y += dx * 0.006;
      rot.current.x = THREE.MathUtils.clamp(
        rot.current.x + dy * 0.005,
        ROT_X_MIN,
        ROT_X_MAX
      );
      rotVel.current.y = dx * 0.006;
      rotVel.current.x = dy * 0.005;
    };

    const endDrag = () => {
      drag.current.active = false;
    };

    const onPointerLeave = () => {
      pointerNdc.current.set(999, 999);
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);
    element.addEventListener("pointerleave", onPointerLeave);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", endDrag);
      element.removeEventListener("pointercancel", endDrag);
      element.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const points = pointsRef.current;
    if (!group || !points) return;

    const t = state.clock.elapsedTime;

    // Rotation: user momentum decays, then a slow idle spin takes over.
    if (!drag.current.active) {
      rot.current.y += rotVel.current.y;
      rot.current.x = THREE.MathUtils.clamp(
        rot.current.x + rotVel.current.x,
        ROT_X_MIN,
        ROT_X_MAX
      );
      rotVel.current.x *= 0.94;
      rotVel.current.y *= 0.94;
      if (!reducedMotion && Math.abs(rotVel.current.y) < 0.0015) {
        rot.current.y += delta * 0.1;
      }
    }
    group.rotation.set(rot.current.x, rot.current.y, 0);
    group.updateMatrixWorld();

    // Project the cursor onto the y=0 world plane, then into group space,
    // so repulsion tracks the structure no matter how it's rotated.
    const pointerActive = pointerNdc.current.x < 50 && !reducedMotion;
    if (pointerActive) {
      tmp.dir
        .set(pointerNdc.current.x, pointerNdc.current.y, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize();
      const dist = -camera.position.z / tmp.dir.z;
      tmp.local.copy(camera.position).addScaledVector(tmp.dir, dist);
      group.worldToLocal(tmp.local);
    }

    const posAttr = points.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const colorAttr = points.geometry.getAttribute(
      "color"
    ) as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const col = colorAttr.array as Float32Array;

    const explode = explodeAmount(t, reducedMotion);
    // How "open" we are — drives signal intensity.
    const openness =
      (explode - EXPLODE_CLOSED) / (EXPLODE_OPEN - EXPLODE_CLOSED);
    const fieldRadius = 0.55;
    const repelStrength = 0.26;
    const follow = reducedMotion ? 1 : 0.14;

    // Activation sweep: a band of light travels up the stack each cycle.
    const sweepU = (t % SWEEP_PERIOD) / SWEEP_PERIOD;
    const sweepY =
      SWEEP_SPAN_FROM + (SWEEP_SPAN_TO - SWEEP_SPAN_FROM) * sweepU;
    // Brief "inference" burst when the sweep crosses the sensor layer.
    const sensorHit = 1 - Math.min(1, Math.abs(sweepY - SENSOR * explode) / 0.35);
    const burst = sensorHit * sensorHit * openness;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      const idleX = reducedMotion ? 0 : Math.sin(t * 0.9 + phase) * 0.03;
      const idleY = reducedMotion
        ? 0
        : Math.cos(t * 0.75 + phase * 1.3) * 0.03;
      const idleZ = reducedMotion
        ? 0
        : Math.sin(t * 0.6 + phase * 1.5) * 0.025;

      let targetX = basePos[i3] + idleX;
      let targetY = layerY[i] * explode + basePos[i3 + 1] + idleY;
      let targetZ = basePos[i3 + 2] + idleZ;
      let hover = 0;

      if (pointerActive) {
        const dx = targetX - tmp.local.x;
        const dy = targetY - tmp.local.y;
        const dz = targetZ - tmp.local.z;
        const d = Math.hypot(dx, dy, dz);
        if (d < fieldRadius) {
          const falloff = 1 - d / fieldRadius;
          const soft = falloff * falloff;
          const inv = d > 0.0001 ? 1 / d : 0;
          const push = soft * repelStrength;
          targetX += dx * inv * push;
          targetY += dy * inv * push;
          targetZ += dz * inv * push;
          hover = soft;
        }
      }

      pos[i3] += (targetX - pos[i3]) * follow;
      pos[i3 + 1] += (targetY - pos[i3 + 1]) * follow;
      pos[i3 + 2] += (targetZ - pos[i3 + 2]) * follow;

      let a = accents[i] * 0.5 + hover;

      if (!reducedMotion) {
        const dSweep = Math.abs(targetY - sweepY);
        if (dSweep < 0.4) {
          const band = 1 - dSweep / 0.4;
          a += band * band * 0.55 * (0.35 + 0.65 * openness);
        }
        // Chips shimmer; brighter during sensor burst.
        if (accents[i] > 0.4) {
          a +=
            (0.12 + burst * 0.35) *
            (0.5 + 0.5 * Math.sin(t * 2.5 + phase * 9));
        }
      }

      a = Math.min(1, a);
      col[i3] = BASE_COLOR.r + (ACCENT_COLOR.r - BASE_COLOR.r) * a;
      col[i3 + 1] = BASE_COLOR.g + (ACCENT_COLOR.g - BASE_COLOR.g) * a;
      col[i3 + 2] = BASE_COLOR.b + (ACCENT_COLOR.b - BASE_COLOR.b) * a;
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={size.width < 500 ? 0.05 : 0.042}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function TeardownScene({
  reducedMotion,
  mobile,
}: {
  reducedMotion: boolean;
  mobile: boolean;
}) {
  const count = mobile ? 950 : 1900;
  return (
    <>
      <ambientLight intensity={0.7} />
      <TeardownPoints count={count} reducedMotion={reducedMotion} />
    </>
  );
}

export function SignalField({ className }: SignalFieldProps) {
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className ?? ""} [&_canvas]:cursor-grab [&_canvas]:active:cursor-grabbing [&_canvas]:touch-pan-y`}
      aria-hidden
      style={{
        maskImage:
          "radial-gradient(ellipse 72% 68% at 50% 50%, black 42%, transparent 86%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 72% 68% at 50% 50%, black 42%, transparent 86%)",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <TeardownScene reducedMotion={reducedMotion} mobile={mobile} />
      </Canvas>
    </div>
  );
}
