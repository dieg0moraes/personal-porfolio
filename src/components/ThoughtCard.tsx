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
  image_url?: string | null;
}

export default function ThoughtCard({
  slug,
  content,
  tags,
  created_at,
  number,
  image_url,
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
          <div className="flex items-center gap-2">
            <span className="text-accent font-mono text-sm">
              thought.{String(number).padStart(3, "0")}
            </span>
            {image_url && (
              <span className="text-accent" title="Contains image attachment">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </span>
            )}
          </div>
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
