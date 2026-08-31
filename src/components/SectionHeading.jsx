export default function SectionHeading({ eyebrow, title, id }) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="text-sm mb-3" style={{ color: "var(--gold)" }}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-display font-semibold text-3xl md:text-4xl max-w-xl leading-tight"
      >
        {title}
      </h2>
    </div>
  );
}
