interface ContactBoxProps {
  label: string;
  value: string;
  href?: string;
  highlighted?: boolean;
}

function ContactBox({ label, value, href, highlighted = false }: ContactBoxProps) {
  const content = (
    <>
      <span className="text-text-muted-dark text-xs md:text-sm">{label}</span>
      <span className={`font-bold text-base md:text-lg ${highlighted ? "text-accent" : "text-foreground"}`}>
        {value}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-2 flex-1 hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return <div className="flex flex-col gap-2 flex-1">{content}</div>;
}

export default function Footer() {
  const contacts = [
    {
      label: "Email",
      value: "dmoraes11cb@gmail.com",
      href: "mailto:dmoraes11cb@gmail.com",
      highlighted: true,
    },
    {
      label: "GitHub",
      value: "github.com/dieg0moraes",
      href: "https://github.com/dieg0moraes",
      highlighted: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/dieg0moraes",
      href: "https://linkedin.com/in/dieg0moraes",
      highlighted: false,
    },
    {
      label: "X",
      value: "x.com/techbydie",
      href: "https://x.com/techbydie",
      highlighted: false,
    },
  ];

  return (
    <footer className="bg-background-secondary py-12 md:py-20 px-6 md:px-20 flex flex-col gap-8 md:gap-12">
      <span className="text-accent font-bold text-xs tracking-[2px]">
        // GET IN TOUCH
      </span>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-[60px] w-full">
        {contacts.map((contact) => (
          <ContactBox key={contact.label} {...contact} />
        ))}
      </div>

      <div className="w-full h-px bg-border" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
        <span className="text-text-muted-dark text-xs md:text-sm">
          © 2026 Diego Moraes
        </span>
        <span className="text-text-muted-dark text-xs md:text-sm">
          Built with precision &gt; Built with tools
        </span>
      </div>
    </footer>
  );
}
