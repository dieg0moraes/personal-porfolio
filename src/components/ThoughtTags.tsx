interface ThoughtTagsProps {
  tags: string[];
}

export default function ThoughtTags({ tags }: ThoughtTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 text-xs text-accent border border-accent/50 bg-accent/10"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
