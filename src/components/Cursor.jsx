import { useEffect, useRef, useState } from "react";

/**
 * Cursor roket kustom: menggantikan cursor bawaan OS dengan elemen DOM
 * supaya api roketnya benar-benar bisa beranimasi (flicker) — sesuatu yang
 * tidak mungkin dicapai lewat properti CSS `cursor: url(...)` biasa.
 *
 * - Ukuran lebih besar dari cursor lama (34px -> 30x50 px area render).
 * - Badan roket monochrome (mengikuti warna teks), menghadap ke atas.
 * - Api di ekor roket berwarna merah, tiga lapis, masing-masing berkedip
 *   dengan timing berbeda supaya terasa hidup, membesar sesaat saat klik.
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

    // Hotspot: titik ujung hidung roket, sedikit di bawah puncak ikon,
    // supaya posisi "klik" terasa presisi di ujung roket seperti sebelumnya.
    const HOTSPOT_X = 27;
    const HOTSPOT_Y = 10;

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
        width="54"
        height="82"
        viewBox="0 0 54 82"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- Api / thruster flame (merah, animasi flicker 3 lapis) --- */}
        <g className="rocket-cursor__flames" transform="translate(27 52)">
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

        {/* --- Badan roket (monochrome, menghadap ke atas) --- */}
        <g className="rocket-cursor__hull">
          <path
            d="M27 2
               C 34 12, 38 22, 36 36
               C 35.3 42, 33.6 47.5, 31.5 52
               L 22.5 52
               C 20.4 47.5, 18.7 42, 18 36
               C 16 22, 20 12, 27 2 Z"
          />
          <path
            className="rocket-cursor__fin rocket-cursor__fin--left"
            d="M19.5 34 C 12 36, 6.5 42, 4 51 C 10.5 49.5, 16 46.5, 20.5 42 Z"
          />
          <path
            className="rocket-cursor__fin rocket-cursor__fin--right"
            d="M34.5 34 C 42 36, 47.5 42, 50 51 C 43.5 49.5, 38 46.5, 33.5 42 Z"
          />
          <circle
            className="rocket-cursor__window"
            cx="27"
            cy="22"
            r="5.2"
          />
        </g>
      </svg>
    </div>
  );
}
