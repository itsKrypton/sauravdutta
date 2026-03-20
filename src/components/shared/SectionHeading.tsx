interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "center" | "left";
  accentWords?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
  accentWords,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!accentWords) return title;
    const idx = title.indexOf(accentWords);
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + accentWords.length);
    return (
      <>
        {before}
        <span className="text-gradient">{accentWords}</span>
        {after}
      </>
    );
  };

  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary">
          {label}
        </p>
      )}
      <h2 className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
        {renderTitle()}
      </h2>
      <div
        className={`accent-line mt-4 ${align === "center" ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
