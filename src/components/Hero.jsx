import { profile, social } from "../data/content";

export default function Hero() {
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
            Dari desain visual ke desain sistem operasional
          </p>

          <h1 className="font-display font-semibold leading-[0.95] text-[13vw] sm:text-[9vw] md:text-[6.2vw]">
            <span className="block">{profile.name}</span>
            <span className="block" style={{ color: "var(--accent)" }}>
              {profile.lastName}
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
