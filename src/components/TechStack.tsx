interface TechBoxProps {
  title: string;
  items: string[];
}

function TechBox({ title, items }: TechBoxProps) {
  return (
    <div className="border border-border p-6 md:p-8 flex flex-col gap-4 w-full md:flex-1">
      <h3 className="text-foreground font-bold text-lg">
        {title}
      </h3>

      <ul className="text-text-gray text-sm md:text-base leading-[1.8]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TechStack() {
  const stacks = [
    {
      title: "Frontend",
      items: ["React", "React Native", "JavaScript/TypeScript", "GraphQL"],
    },
    {
      title: "Backend",
      items: ["Python (Django, Django REST, aiohttp)", "Java", "Node.js", "SQL Server"],
    },
    {
      title: "Tools",
      items: ["Docker", "AWS", "Git", "Kibana, New Relic, Datadog"],
    },
    {
      title: "Focus Areas",
      items: ["Clean Architecture", "Microservices", "GO", "Performance Optimization"],
    },
  ];

  return (
    <section className="bg-background py-12 md:py-20 px-6 md:px-20 flex flex-col gap-8 md:gap-10">
      <span className="text-accent font-bold text-xs tracking-[2px]">
        // TECH STACK
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 w-full">
        {stacks.map((stack) => (
          <TechBox key={stack.title} {...stack} />
        ))}
      </div>
    </section>
  );
}
