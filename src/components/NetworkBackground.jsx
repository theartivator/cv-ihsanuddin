import { useEffect, useRef } from "react";

// Background ambient untuk seluruh halaman: field titik-titik yang
// berputar pelan sebagai satu kesatuan, saling terhubung dengan garis
// tipis saat berdekatan, dan memencar radial menjauhi kursor saat
// didekati lalu kembali pelan ke posisi semula (spring-back).
export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr;
    let dots = [];
    let t = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const LINK_DIST = 140;
    const REPEL_RADIUS = 160;
    const REPEL_STRENGTH = 2.6;
    const SPRING_K = 0.02;
    const DAMPING = 0.9;
    const ROTATION_SPEED = 0.00045; // rad/frame — satu putaran penuh ~ beberapa menit

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(260, Math.floor((width * height) / 6500));
      dots = Array.from({ length: count }, () => ({
        homeX: Math.random() * width,
        homeY: Math.random() * height,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
        r: Math.random() * 1.1 + 0.5,
      }));
    }

    // Rotasi invers untuk memetakan posisi kursor layar ke ruang model
    // (unrotated), supaya efek memencar tetap akurat mengikuti kursor
    // meski seluruh field sedang berputar.
    function inverseRotate(px, py, cx, cy, angle) {
      const dx = px - cx;
      const dy = py - cy;
      const cos = Math.cos(-angle);
      const sin = Math.sin(-angle);
      return {
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos,
      };
    }

    function step() {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      const angle = reduceMotion ? 0 : t * ROTATION_SPEED;
      const cx = width / 2;
      const cy = height / 2;

      const mouseModel = reduceMotion
        ? { x: -9999, y: -9999 }
        : inverseRotate(mouseRef.current.x, mouseRef.current.y, cx, cy, angle);

      for (const d of dots) {
        if (!reduceMotion) {
          const posX = d.homeX + d.dx;
          const posY = d.homeY + d.dy;
          const rdx = posX - mouseModel.x;
          const rdy = posY - mouseModel.y;
          const dist = Math.hypot(rdx, rdy);

          if (dist < REPEL_RADIUS && dist > 0.01) {
            const falloff = 1 - dist / REPEL_RADIUS;
            const force = falloff * falloff * REPEL_STRENGTH;
            d.vx += (rdx / dist) * force;
            d.vy += (rdy / dist) * force;
          }

          d.vx += -d.dx * SPRING_K;
          d.vy += -d.dy * SPRING_K;
          d.vx *= DAMPING;
          d.vy *= DAMPING;
          d.dx += d.vx;
          d.dy += d.vy;
        }
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.translate(-cx, -cy);

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const ax = a.homeX + a.dx;
          const ay = a.homeY + a.dy;
          const bx = b.homeX + b.dx;
          const by = b.homeY + b.dy;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(143,166,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.homeX + d.dx, d.homeY + d.dy, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(233,237,251,0.5)";
        ctx.fill();
      }

      ctx.restore();

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
