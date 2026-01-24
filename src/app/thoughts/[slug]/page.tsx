import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getThoughtBySlug, getThoughts } from "@/lib/supabase/queries";
import ThoughtTags from "@/components/ThoughtTags";

interface ThoughtPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ThoughtPageProps): Promise<Metadata> {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) {
    return {
      title: "Thought no encontrado | Diego Moraes",
    };
  }

  return {
    title: `${thought.title} | Diego Moraes`,
    description: thought.content.substring(0, 160),
    openGraph: {
      title: thought.title,
      description: thought.content.substring(0, 160),
      type: "article",
      publishedTime: thought.created_at,
    },
  };
}

export async function generateStaticParams() {
  const thoughts = await getThoughts();
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export const revalidate = 60;

export default async function ThoughtPage({ params }: ThoughtPageProps) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  const formattedDate = format(new Date(thought.created_at), "d MMMM yyyy", {
    locale: es,
  });

  return (
    <main className="min-h-screen w-full max-w-[1440px] mx-auto">
      <article className="bg-background py-16 md:py-[120px] px-6 md:px-20 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link
            href="/thoughts"
            className="text-text-muted-dark text-sm hover:text-accent transition-colors w-fit"
          >
            ← Volver a Thoughts
          </Link>

          <span className="text-accent font-bold text-sm md:text-base">
            $ cat thought/{thought.slug}
          </span>
        </div>

        <header className="flex flex-col gap-4 border-b border-border pb-8">
          <h1 className="text-foreground font-bold text-2xl md:text-4xl lg:text-5xl leading-tight">
            {thought.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <time className="text-text-muted-dark text-sm md:text-base">
              {formattedDate}
            </time>

            <ThoughtTags tags={thought.tags} />
          </div>

          {thought.x_post_id && (
            <a
              href={`https://x.com/i/web/status/${thought.x_post_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm hover:underline w-fit"
            >
              Ver en X →
            </a>
          )}
        </header>

        <div className="prose prose-invert max-w-none">
          <p className="text-text-light text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {thought.content}
          </p>
        </div>
      </article>
    </main>
  );
}
