import { useEffect, useRef } from "react";

// Background ambient generik untuk seluruh halaman: titik-titik yang
// mengambang pelan dan saling terhubung dengan garis tipis saat berdekatan
// (constellation effect), tanpa label atau makna skill apa pun.
export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr;
    let dots = [];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const LINK_DIST = 130;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(140, Math.floor((width * height) / 11000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1 + 0.6,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const d of dots) {
        if (!reduceMotion) {
          d.x += d.vx;
          d.y += d.vy;

          const dx = d.x - mx;
          const dy = d.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0.01) {
            const force = (1 - dist / 110) * 0.04;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }
          d.vx *= 0.99;
          d.vy *= 0.99;
        }

        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;
        if (d.y < -10) d.y = height + 10;
        if (d.y > height + 10) d.y = -10;
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(143,166,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(233,237,251,0.45)";
        ctx.fill();
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
