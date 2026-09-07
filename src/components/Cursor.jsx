import { useEffect, useRef, useState } from "react";

/**
 * Cursor pesawat ulang-alik (space shuttle) kustom: menggantikan cursor
 * bawaan OS dengan elemen DOM supaya api pendorongnya benar-benar bisa
 * beranimasi (flicker) — sesuatu yang tidak mungkin dicapai lewat properti
 * CSS `cursor: url(...)` biasa.
 *
 * - Badan pesawat ulang-alik monochrome (mengikuti warna teks): hidung
 *   lancip, badan ramping, sepasang sayap delta menyapu ke belakang, jendela
 *   kokpit bulat, dan dua nosel mesin di ekor.
 * - Api di ekor berwarna biru, tiga lapis, masing-masing berkedip dengan
 *   timing berbeda supaya terasa hidup, membesar sesaat saat klik.
 */
export default function Cursor() {
  const rootRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = rootRef.current;
    if (!el) return undefined;

    // Hotspot: titik ujung hidung pesawat, sedikit di bawah puncak ikon,
    // supaya posisi "klik" terasa presisi di ujung pesawat seperti sebelumnya.
    const HOTSPOT_X = 30;
    const HOTSPOT_Y = 8;

    let raf = null;
    let pending = null;

    const move = (e) => {
      pending = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!pending) return;
        el.style.transform = `translate3d(${pending.clientX - HOTSPOT_X}px, ${
          pending.clientY - HOTSPOT_Y
        }px, 0)`;
      });
    };

    const show = () => el.classList.remove("rocket-cursor--hidden");
    const hide = () => el.classList.add("rocket-cursor--hidden");
    const boostOn = () => el.classList.add("rocket-cursor--boost");
    const boostOff = () => el.classList.remove("rocket-cursor--boost");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", boostOn);
    window.addEventListener("pointerup", boostOff);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    document.documentElement.classList.add("has-rocket-cursor");

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", boostOn);
      window.removeEventListener("pointerup", boostOff);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("has-rocket-cursor");
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="rocket-cursor rocket-cursor--hidden"
      aria-hidden="true"
    >
      <svg
        width="60"
        height="94"
        viewBox="0 0 60 94"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- Api / thruster flame (biru, animasi flicker 3 lapis) --- */}
        <g className="rocket-cursor__flames" transform="translate(30 64)">
          <path
            className="rocket-cursor__flame rocket-cursor__flame--outer"
            d="M0 0 C -9 9, -8 20, 0 30 C 8 20, 9 9, 0 0 Z"
          />
          <path
            className="rocket-cursor__flame rocket-cursor__flame--mid"
            d="M0 2 C -6 9, -5.5 17, 0 24 C 5.5 17, 6 9, 0 2 Z"
          />
          <path
            className="rocket-cursor__flame rocket-cursor__flame--inner"
            d="M0 4 C -3.2 9, -3 14, 0 18 C 3 14, 3.2 9, 0 4 Z"
          />
        </g>

        {/* --- Badan pesawat ulang-alik (monochrome, menghadap ke atas) --- */}
        <g className="rocket-cursor__hull">
          <path
            d="M30 4
               C 36 10, 40 16, 38 24
               C 37 32, 36 40, 35 48
               C 34.5 52, 34 56, 33 60
               L 27 60
               C 26 56, 25.5 52, 25 48
               C 24 40, 23 32, 22 24
               C 20 16, 24 10, 30 4 Z"
          />
          <path
            className="rocket-cursor__fin rocket-cursor__fin--left"
            d="M24 38 C 14 42, 4 54, 2 68 C 10 64, 18 58, 26 50 Z"
          />
          <path
            className="rocket-cursor__fin rocket-cursor__fin--right"
            d="M36 38 C 46 42, 56 54, 58 68 C 50 64, 42 58, 34 50 Z"
          />
          <circle
            className="rocket-cursor__window"
            cx="30"
            cy="16"
            r="3.4"
          />
          <circle className="rocket-cursor__nozzle" cx="26.5" cy="62" r="2.6" />
          <circle className="rocket-cursor__nozzle" cx="33.5" cy="62" r="2.6" />
        </g>
      </svg>
    </div>
  );
}
