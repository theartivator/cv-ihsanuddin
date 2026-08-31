import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr;
    let stars = [];
    let shootingStars = [];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(180, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.25,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
        parallax: Math.random() * 0.03 + 0.005,
      }));
    }

    function maybeSpawnShootingStar() {
      if (reduceMotion) return;
      if (Math.random() < 0.0035 && shootingStars.length < 2) {
        const y = Math.random() * height * 0.5;
        shootingStars.push({
          x: Math.random() * width * 0.4,
          y,
          vx: 6 + Math.random() * 4,
          vy: 2.5 + Math.random() * 1.5,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        });
      }
    }

    let t = 0;
    function draw() {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      const g1 = ctx.createRadialGradient(
        width * 0.78,
        height * 0.15,
        0,
        width * 0.78,
        height * 0.15,
        width * 0.55
      );
      g1.addColorStop(0, "rgba(143,166,255,0.08)");
      g1.addColorStop(1, "rgba(143,166,255,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.12,
        height * 0.85,
        0,
        width * 0.12,
        height * 0.85,
        width * 0.45
      );
      g2.addColorStop(0, "rgba(232,184,75,0.05)");
      g2.addColorStop(1, "rgba(232,184,75,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const s of stars) {
        const dx = reduceMotion ? 0 : (mx - width / 2) * s.parallax;
        const dy = reduceMotion ? 0 : (my - height / 2) * s.parallax;
        const alpha = reduceMotion
          ? s.baseAlpha
          : s.baseAlpha +
            Math.sin(t * s.twinkleSpeed + s.phase) * 0.25 * s.baseAlpha;
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233,237,251,${Math.max(0, alpha)})`;
        ctx.fill();
      }

      maybeSpawnShootingStar();
      shootingStars = shootingStars.filter((sh) => sh.life < sh.maxLife);
      for (const sh of shootingStars) {
        sh.life += 1;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const fade = 1 - sh.life / sh.maxLife;
        const grad = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * 8,
          sh.y - sh.vy * 8
        );
        grad.addColorStop(0, `rgba(232,184,75,${0.8 * fade})`);
        grad.addColorStop(1, "rgba(232,184,75,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
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
