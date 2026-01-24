import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ThoughtTags from "./ThoughtTags";

interface ThoughtCardProps {
  slug: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

export default function ThoughtCard({
  slug,
  title,
  content,
  tags,
  created_at,
}: ThoughtCardProps) {
  const formattedDate = format(new Date(created_at), "d MMM yyyy", {
    locale: es,
  });

  // Truncate content for preview
  const preview =
    content.length > 150 ? content.substring(0, 150) + "..." : content;

  return (
    <Link href={`/thoughts/${slug}`}>
      <article className="p-6 md:p-8 flex flex-col gap-4 w-full border border-border hover:border-accent/50 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-foreground font-bold text-lg md:text-xl">
            {title}
          </h2>
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
