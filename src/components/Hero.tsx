export default function Hero() {
  return (
    <section className="bg-background py-16 md:py-[120px] px-6 md:px-20 flex flex-col gap-6 md:gap-8">
      <span className="text-accent font-bold text-sm md:text-base">$ whoami</span>

      <h1 className="text-foreground font-bold text-4xl md:text-6xl lg:text-[72px] leading-none tracking-[-2px]">
        Diego Moraes
      </h1>

      <p className="text-text-muted text-lg md:text-xl">
        &gt; Senior Software Engineer @ Mercado Libre
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <span className="text-text-muted-dark text-sm md:text-base">
          📍 Punta del Este, Uruguay
        </span>
        <span className="text-accent text-sm md:text-base">
          ● Available for interesting projects
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <a
          href="https://github.com/dieg0moraes"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 border-2 border-accent text-accent font-bold text-sm md:text-base hover:bg-accent hover:text-background transition-colors text-center"
        >
          GitHub →
        </a>
        <a
          href="https://linkedin.com/in/dieg0moraes"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 border-2 border-border text-foreground font-bold text-sm md:text-base hover:border-text-muted transition-colors text-center"
        >
          LinkedIn →
        </a>
      </div>
    </section>
  );
}
