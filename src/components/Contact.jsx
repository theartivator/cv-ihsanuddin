import { profile, social } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-full overflow-hidden shrink-0"
            style={{ border: "2px solid var(--accent)", background: "var(--surface)" }}
          >
            {profile.openToWorkPhotoUrl ? (
              <img
                src={profile.openToWorkPhotoUrl}
                alt={`${profile.name} ${profile.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center font-display text-sm"
                style={{ color: "var(--accent)" }}
              >
                MI
              </div>
            )}
          </div>
          <span
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
              border: "1px solid var(--line)",
            }}
          >
            Open to Work
          </span>
        </div>

        <p className="text-sm mb-3" style={{ color: "var(--gold)" }}>
          Kontak
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-5xl max-w-2xl leading-tight mb-8">
          Terbuka untuk kolaborasi lintas tim dan peran baru.
        </h2>
        <p
          className="max-w-lg text-base leading-relaxed mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Kalau ada tim yang butuh orang untuk merapikan sistem operasional
          sekaligus menjaga sisi brand-nya tetap hidup, atau sekadar mau
          diskusi soal inovasi dan tata kelola — silakan hubungi saya.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3 rounded-full text-sm font-medium"
            style={{ background: "var(--gold)", color: "#12100a" }}
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="px-6 py-3 rounded-full text-sm"
            style={{ border: "1px solid var(--line)", color: "var(--text-muted)" }}
          >
            {profile.phone}
          </a>
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="px-6 py-3 rounded-full text-sm"
              style={{ border: "1px solid var(--line)", color: "var(--text-muted)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      className="relative px-6 py-8 text-xs flex flex-wrap justify-between gap-2"
      style={{ borderTop: "1px solid var(--line)", color: "var(--text-dim)" }}
    >
      <span>
        {profile.name} {profile.lastName} · {new Date().getFullYear()}
      </span>
      <span>Dirancang &amp; dibangun bersama Claude</span>
    </footer>
  );
}
