import { useEffect, useRef, useState } from "react";
import { skillNodes, skillCategories } from "../data/content";

// Graph view ala Obsidian, tapi sebagai KONTEN section (bukan background
// fullscreen). Canvas dibatasi tinggi container-nya sendiri. Setiap node
// mewakili satu kompetensi, warna mengikuti kategori, node saling
// terhubung dengan garis saat berdekatan, dan bisa di-hover untuk melihat
// label + kategori secara jelas.
export default function SkillGraph() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr;
    let nodes = [];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const LINK_DIST = 150;
    const HOVER_RADIUS = 14;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = skillNodes.map((s) => {
        const cat = skillCategories[s.category];
        return {
          id: s.label,
          label: s.label,
          color: cat.color,
          category: cat.label,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 4,
        };
      });
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let hoveredNode = null;

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= 0.995;
          n.vy *= 0.995;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < 0.04) {
            n.vx += (Math.random() - 0.5) * 0.015;
            n.vy += (Math.random() - 0.5) * 0.015;
          }
        }
        if (n.x < n.r) { n.x = n.r; n.vx *= -1; }
        if (n.x > width - n.r) { n.x = width - n.r; n.vx *= -1; }
        if (n.y < n.r) { n.y = n.r; n.vy *= -1; }
        if (n.y > height - n.r) { n.y = height - n.r; n.vy *= -1; }

        const dist = Math.hypot(n.x - mx, n.y - my);
        if (dist < HOVER_RADIUS + n.r) hoveredNode = n;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const sameCategory = a.color === b.color;
            const baseAlpha = (1 - dist / LINK_DIST) * (sameCategory ? 0.35 : 0.08);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = sameCategory
              ? hexToRgba(a.color, baseAlpha)
              : `rgba(200,210,240,${baseAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.font = "12px Inter, sans-serif";
      ctx.textBaseline = "middle";
      for (const n of nodes) {
        const isHover = hoveredNode === n;
        const r = isHover ? n.r * 1.6 : n.r;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(n.color, isHover ? 0.22 : 0.1);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        if (isHover) {
          ctx.textAlign = n.x > width / 2 ? "right" : "left";
          ctx.fillStyle = "rgba(233,237,251,0.95)";
          ctx.fillText(n.label, n.x + (n.x > width / 2 ? -12 : 12), n.y);
        }
      }

      setHovered((prev) => {
        const next = hoveredNode ? hoveredNode.id : null;
        return prev === next ? prev : next;
      });

      raf = requestAnimationFrame(step);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    step();
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] md:h-[420px] rounded-2xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 cursor-default" />

      <span className="sr-only">
        Peta kompetensi: {skillNodes.map((s) => s.label).join(", ")}.
      </span>
    </div>
  );
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
