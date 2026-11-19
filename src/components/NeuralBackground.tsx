import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // 0.4 (far) to 1 (near): drives scroll parallax and size
  phase: number;
  hub: boolean;
}

interface Pulse {
  a: number;
  b: number;
  t: number;
  speed: number;
}

const LINK = 150; // max distance for a connection, in CSS pixels
const POINTER = 190; // radius of the pointer's influence
const RING = 100; // nodes settle at about this distance from a resting pointer
const MIN_GAP = 56; // nodes never crowd closer than this to each other

/**
 * A quiet, fixed network of drifting nodes behind the page. Nodes link up when near,
 * signals travel along some links, and the pointer pulls nearby nodes in. It follows the
 * scroll a little for depth, pauses when the tab is hidden, and draws a still frame
 * when the visitor prefers reduced motion.
 */
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let last = 0;
    const pointer = { x: -9999, y: -9999, on: false };
    let scrollY = window.scrollY;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(96, Math.round((w * h) / 17000)));
      nodes = Array.from({ length: count }, () => {
        const depth = 0.4 + Math.random() * 0.6;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 1.4 + depth * 1.8,
          depth,
          phase: Math.random() * Math.PI * 2,
          hub: Math.random() < 0.1,
        };
      });
      pulses = [];
    };

    const py = (n: Node) => {
      const y = n.y - scrollY * 0.07 * n.depth;
      return ((y % h) + h) % h;
    };

    const draw = (time: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const pos = nodes.map((n) => ({ x: n.x, y: py(n) }));

      if (dt > 0) {
        // The pointer only gathers its nearest few neurons, so it can never sweep them all into one spot.
        const near = new Set<number>();
        if (pointer.on) {
          nodes
            .map((_, i) => ({ i, d: Math.hypot(pointer.x - pos[i].x, pointer.y - pos[i].y) }))
            .filter((o) => o.d < POINTER)
            .sort((a, b) => a.d - b.d)
            .slice(0, 7)
            .forEach((o) => near.add(o.i));
        }
        nodes.forEach((n, i) => {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
          if (near.has(i)) {
            const dx = pointer.x - pos[i].x;
            const dy = pointer.y - pos[i].y;
            const d = Math.hypot(dx, dy) || 1;
            // Pulled in from afar, pushed out when too close, and never faster than a gentle drift.
            const f = Math.max(-1.5, Math.min(1.5, (d - RING) * 0.012)) * dt;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        });
        // Hard minimum gap: a few relaxation passes push every close pair fully apart.
        for (let pass = 0; pass < 3; pass++) {
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const dx = pos[j].x - pos[i].x;
              const dy = pos[j].y - pos[i].y;
              let d = Math.hypot(dx, dy);
              if (d < MIN_GAP) {
                let ux = dx / (d || 1);
                let uy = dy / (d || 1);
                if (d < 0.01) {
                  ux = Math.random() - 0.5;
                  uy = Math.random() - 0.5;
                  d = 0;
                }
                const push = (MIN_GAP - d) * 0.25;
                nodes[i].x -= ux * push;
                nodes[i].y -= uy * push;
                nodes[j].x += ux * push;
                nodes[j].y += uy * push;
                pos[i].x -= ux * push;
                pos[i].y -= uy * push;
                pos[j].x += ux * push;
                pos[j].y += uy * push;
              }
            }
          }
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.2;
            ctx.strokeStyle = `rgba(34, 139, 34, ${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.stroke();
            if (dt > 0 && pulses.length < 14 && Math.random() < 0.0009 * dt) {
              pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.012 });
            }
          }
        }
        // links from the pointer to nearby nodes
        if (pointer.on) {
          const d = Math.hypot(pointer.x - pos[i].x, pointer.y - pos[i].y);
          if (d < POINTER) {
            ctx.strokeStyle = `rgba(34, 139, 34, ${(1 - d / POINTER) * 0.32})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(pos[i].x, pos[i].y);
            ctx.stroke();
          }
        }
      }

      // signals travelling along links
      pulses = pulses.filter((p) => {
        p.t += p.speed * (dt || 0);
        if (p.t >= 1) return false;
        const A = pos[p.a];
        const B = pos[p.b];
        if (Math.hypot(A.x - B.x, A.y - B.y) > LINK * 1.1) return false;
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const al = Math.sin(p.t * Math.PI);
        ctx.fillStyle = `rgba(34, 139, 34, ${al * 0.18})`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(26, 106, 26, ${al * 0.85})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // nodes
      nodes.forEach((n, i) => {
        const breathe = 0.75 + 0.25 * Math.sin(time * 0.0012 + n.phase);
        const r = n.r * (n.hub ? 1.7 : 1) * (reduce ? 1 : breathe);
        if (n.hub) {
          ctx.fillStyle = 'rgba(34, 139, 34, 0.08)';
          ctx.beginPath();
          ctx.arc(pos[i].x, pos[i].y, r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(26, 106, 26, ${0.28 + n.depth * 0.3})`;
        ctx.beginPath();
        ctx.arc(pos[i].x, pos[i].y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const frame = (t: number) => {
      const dt = last ? Math.min((t - last) / 16.67, 3) : 1;
      last = t;
      draw(t, dt);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduce || raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    if (reduce) draw(0, 0);
    else start();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduce) draw(0, 0);
      }, 150);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = true;
    };
    const onLeave = () => {
      pointer.on = false;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduce) draw(0, 0);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce]);

  return <canvas ref={ref} className="neural" aria-hidden="true" />;
}
