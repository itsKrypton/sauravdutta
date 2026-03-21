"use client";

interface TagFilterProps {
  tags: string[];
  activeTag: string;
  onFilterChange: (tag: string) => void;
}

export default function TagFilter({
  tags,
  activeTag,
  onFilterChange,
}: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onFilterChange("All")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-fast ${
          activeTag === "All"
            ? "bg-accent text-white"
            : "border border-accent/20 bg-accent/5 text-text-secondary hover:bg-accent/10 hover:text-accent"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onFilterChange(tag)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-fast ${
            activeTag === tag
              ? "bg-accent text-white"
              : "border border-accent/20 bg-accent/5 text-text-secondary hover:bg-accent/10 hover:text-accent"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
