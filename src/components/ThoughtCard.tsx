import Link from "next/link";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import ThoughtTags from "./ThoughtTags";

interface ThoughtCardProps {
  slug: string;
  content: string;
  tags: string[];
  created_at: string;
  number: number;
}

export default function ThoughtCard({
  slug,
  content,
  tags,
  created_at,
  number,
}: ThoughtCardProps) {
  const formattedDate = format(new Date(created_at), "MMM d, yyyy · h:mm a", {
    locale: enUS,
  });

  // Truncate content for preview
  const preview =
    content.length > 150 ? content.substring(0, 150) + "..." : content;

  return (
    <Link href={`/thoughts/${slug}`}>
      <article className="p-6 md:p-8 flex flex-col gap-4 w-full border border-border hover:border-accent/50 transition-colors">
        <div className="flex items-center justify-between gap-2">
          <span className="text-accent font-mono text-sm">
            thought.{String(number).padStart(3, "0")}
          </span>
          <span className="text-text-muted-dark text-xs md:text-sm shrink-0">
            {formattedDate}
          </span>
        </div>

        <p className="text-text-gray text-sm md:text-base leading-relaxed">
          {preview}
        </p>

        <ThoughtTags tags={tags} />
      </article>
    </Link>
  );
}
