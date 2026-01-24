import { Metadata } from "next";
import Link from "next/link";
import { getThoughts } from "@/lib/supabase/queries";
import ThoughtCard from "@/components/ThoughtCard";

export const metadata: Metadata = {
  title: "Thoughts | Diego Moraes",
  description: "Micro-posts, ideas and reflections on technology and software development.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();

  return (
    <main className="min-h-screen w-full max-w-[1440px] mx-auto">
      <section className="bg-background py-16 md:py-[120px] px-6 md:px-20 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-text-muted-dark text-sm hover:text-accent transition-colors w-fit"
          >
            ← Back
          </Link>

          <span className="text-accent font-bold text-sm md:text-base">
            $ cat thoughts.log
          </span>

          <h1 className="text-foreground font-bold text-3xl md:text-5xl lg:text-6xl leading-none tracking-[-1px]">
            Thoughts
          </h1>

          <p className="text-text-muted text-base md:text-lg max-w-2xl">
            Micro-posts, ideas and reflections on technology, software development and other things that interest me.
          </p>
        </div>

        {thoughts.length === 0 ? (
          <div className="border border-border p-8 text-center">
            <p className="text-text-muted">No thoughts yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {thoughts.map((thought, index) => (
              <ThoughtCard
                key={thought.id}
                {...thought}
                number={thoughts.length - index}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
