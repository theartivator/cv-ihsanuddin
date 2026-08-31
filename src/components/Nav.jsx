import { useState } from "react";
import { profile } from "../data/content";

const links = [
  { href: "#contact", label: "Kontak" },
  { href: "#proof", label: "Bukti" },
  { href: "#skills", label: "Keahlian" },
  { href: "#work", label: "Karya" },
  { href: "#experience", label: "Perjalanan" },
  { href: "#about", label: "Tentang" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 md:top-[33px] left-0 right-0 z-30"
      style={{
        borderBottom: "1px solid var(--line)",
        background: "rgba(5,7,15,0.55)",
        backdropFilter: "blur(6px)",
      }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display font-semibold text-sm tracking-wide"
        >
          {profile.name} {profile.lastName}
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--text)")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--text-muted)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-sm px-3 py-1.5 rounded-full"
          style={{ border: "1px solid var(--line)", color: "var(--text)" }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="md:hidden flex flex-col px-6 pb-4 gap-3 text-sm"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
