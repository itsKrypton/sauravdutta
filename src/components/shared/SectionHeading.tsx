interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  label?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  accentWord,
  label,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!accentWord || !title.includes(accentWord)) {
      return title;
    }
    const index = title.lastIndexOf(accentWord);
    const before = title.slice(0, index);
    const accent = title.slice(index, index + accentWord.length);
    const after = title.slice(index + accentWord.length);
    return (
      <>
        {before}
        <span className="text-accent italic">{accent}</span>
        {after}
      </>
    );
  };

  return (
    <div className="mb-12 text-center">
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
        {renderTitle()}
      </h2>
      {subtitle && <p className="mt-3 text-text-secondary">{subtitle}</p>}
    </div>
  );
}
