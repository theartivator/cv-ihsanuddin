import { useEffect, useState } from "react";

function useClock(timeZone) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

export default function AmbientHUD() {
  const jakarta = useClock("Asia/Jakarta");
  const progress = useScrollProgress();
  const pct = Math.round(progress * 100);
  const circumference = 2 * Math.PI * 9;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 hidden md:flex items-center justify-between px-6 py-2 text-[11px] font-mono-num tracking-wide"
      style={{
        color: "var(--text-dim)",
        borderBottom: "1px solid var(--line)",
        background: "rgba(5,7,15,0.55)",
        backdropFilter: "blur(6px)",
      }}
    >
      <span>
        JKT <span style={{ color: "var(--text-muted)" }}>{jakarta}</span>{" "}
        WIB
      </span>
      <span className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <circle
            cx="10"
            cy="10"
            r="9"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1.5"
          />
          <circle
            cx="10"
            cy="10"
            r="9"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
        </svg>
        <span style={{ color: "var(--text-muted)" }}>{pct}%</span>
      </span>
    </div>
  );
}
