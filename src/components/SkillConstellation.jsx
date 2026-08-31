import { useEffect, useRef } from "react";
import { skillNodes, skillCategories } from "../data/content";

// Satu Canvas + satu requestAnimationFrame loop untuk seluruh halaman.
// Setiap node mewakili satu kompetensi, warnanya mengikuti kategori
// (sistem / riset / kreatif). Node bergerak pelan dan saling terhubung
// dengan garis saat berdekatan — mirip graph view Obsidian.
export default function SkillConstellation() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr;
    let nodes = [];
    let bgStars = [];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const LINK_DIST = 190;
    const MOUSE_REPEL_DIST = 130;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = Math.min(140, Math.floor((width * height) / 12000));
      bgStars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1 + 0.2,
        a: Math.random() * 0.35 + 0.1,
      }));

      nodes = skillNodes.map((s, i) => {
        const cat = skillCategories[s.category];
        return {
          label: s.label,
          color: cat.color,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 2.6,
          labelSide: i % 2 === 0 ? 1 : -1,
        };
      });
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (const s of bgStars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233,237,251,${s.a})`;
        ctx.fill();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;

          const dx = n.x - mx;
          const dy = n.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_REPEL_DIST && dist > 0.01) {
            const force = (1 - dist / MOUSE_REPEL_DIST) * 0.06;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }

          n.vx *= 0.98;
          n.vy *= 0.98;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < 0.05) {
            n.vx += (Math.random() - 0.5) * 0.02;
            n.vy += (Math.random() - 0.5) * 0.02;
          }
        }

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle =
              a.color === b.color
                ? hexToRgba(a.color, alpha * 1.4)
                : `rgba(200,210,240,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.font = "11px Inter, sans-serif";
      ctx.textBaseline = "middle";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(n.color, 0.12);
        ctx.fill();

        const offset = 9 * n.labelSide;
        ctx.textAlign = n.labelSide === 1 ? "left" : "right";
        ctx.fillStyle = hexToRgba(n.color, 0.55);
        ctx.fillText(n.label, n.x + offset, n.y);
      }

      raf = requestAnimationFrame(step);
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "var(--bg)" }}
    />
  );
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
