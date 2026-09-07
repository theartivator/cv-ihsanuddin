import { useEffect, useState } from "react";
import { profile, social } from "../data/content";

/**
 * Types out each line in `lines` one character at a time, then moves on to
 * the next line. Returns the currently revealed text per line plus which
 * line is active, so the caller can render a blinking cursor next to it.
 */
function useTypewriterLines(
  lines,
  { charDelay = 55, lineGap = 450, startDelay = 300 } = {}
) {
  const [output, setOutput] = useState(() => lines.map(() => ""));
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts = [];
    const schedule = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
      return id;
    };

    const typeLine = (lineIndex, charIndex) => {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }
      const text = lines[lineIndex] ?? "";
      setActiveLine(lineIndex);
      if (charIndex <= text.length) {
        setOutput((prev) => {
          const next = [...prev];
          next[lineIndex] = text.slice(0, charIndex);
          return next;
        });
        schedule(() => typeLine(lineIndex, charIndex + 1), charDelay);
      } else {
        schedule(() => typeLine(lineIndex + 1, 0), lineGap);
      }
    };

    schedule(() => typeLine(0, 0), startDelay);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")]);

  return { output, activeLine, done };
}

export default function Hero() {
  const { output, activeLine, done } = useTypewriterLines(
    [profile.heroLine1, profile.heroLine2],
    { charDelay: 55, lineGap: 450, startDelay: 350 }
  );

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-24"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row-reverse lg:items-center gap-12 lg:gap-16">
        <div className="flex-1 min-w-0">
          <p
            className="text-sm mb-6"
            style={{ color: "var(--text-dim)" }}
          >
            {profile.heroEyebrow}
          </p>

          <h1 className="font-display font-semibold leading-[1.05]">
            {/* Baris 1 & 2 diberi ukuran huruf berbeda supaya lebar visual
                kedua baris tetap sejajar walau jumlah karakternya beda. */}
            <span
              className="block whitespace-nowrap text-[10vw] sm:text-[7.2vw] md:text-[4.8vw]"
              aria-hidden={!done}
            >
              {output[0]}
              {!done && activeLine === 0 && (
                <span className="typewriter-cursor" aria-hidden="true" />
              )}
            </span>
            <span
              className="block whitespace-nowrap text-[6.2vw] sm:text-[4.5vw] md:text-[3vw]"
              style={{ color: "var(--accent)" }}
            >
              {output[1]}
              {(done || activeLine === 1) && (
                <span className="typewriter-cursor" aria-hidden="true" />
              )}
            </span>
            <span className="sr-only">
              {profile.heroLine1} — {profile.heroLine2}
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                Peran saat ini
              </p>
              <p className="font-display text-sm mt-1">{profile.role}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                Organisasi
              </p>
              <p className="font-display text-sm mt-1">
                {profile.company} · {profile.companySince}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                Lokasi
              </p>
              <p className="font-display text-sm mt-1">{profile.location}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={profile.resumeUrl}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gold)", color: "#12100a" }}
            >
              Unduh Resume
            </a>
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="px-5 py-2.5 rounded-full text-sm transition-colors"
                style={{ border: "1px solid var(--line)", color: "var(--text-muted)" }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="hidden lg:block lg:w-[36%] lg:max-w-md aspect-[3/4] rounded-3xl overflow-hidden shrink-0"
          style={{
            border: "1px solid var(--line)",
            background: "linear-gradient(160deg, var(--surface), var(--surface-2))",
          }}
        >
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={`${profile.name} ${profile.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center font-display text-3xl"
                style={{
                  background: "var(--gold-soft)",
                  color: "var(--gold)",
                  border: "1px solid var(--line)",
                }}
              >
                MI
              </div>
              <p className="text-xs text-center px-8" style={{ color: "var(--text-dim)" }}>
                Ganti dengan fotomu di src/data/content.js (profile.photoUrl)
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
