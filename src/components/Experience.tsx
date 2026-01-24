"use client";

import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import TypingText from "./TypingText";

interface ExperienceCardProps {
  company: string;
  status?: string;
  roles: {
    title: string;
    description: string;
  }[];
  index: number;
  isVisible: boolean;
}

function ExperienceCard({ company, status, roles, index, isVisible }: ExperienceCardProps) {
  return (
    <div
      className={`work-card border border-border p-6 md:p-8 flex flex-col gap-4 w-full transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${300 + index * 100}ms` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
        <h3 className="text-foreground font-bold text-xl md:text-2xl">
          {company}
        </h3>
        {status && (
          <span className="text-accent text-sm md:text-base">
            [{status}]
          </span>
        )}
      </div>

      {roles.map((role, roleIndex) => (
        <div key={roleIndex} className="flex flex-col gap-2">
          <p className="text-text-muted text-base md:text-lg">
            &gt; {role.title}
          </p>
          <p className="text-text-gray text-sm md:text-base leading-[1.5]">
            {role.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const { ref, isVisible } = useAnimateOnScroll<HTMLElement>({ threshold: 0.1 });

  const experiences = [
    {
      company: "Mercado Libre",
      status: "Current",
      roles: [
        {
          title: "Senior Software Engineer (2024 - Present)",
          description:
            "I thrive on solving complex challenges as a Senior Software Engineer on MercadoLibre's search engine team. We handle one of the world's most heavily used search bars, processing over 5 million queries per minute. My role involves analyzing our search applications, identifying areas for improvement, and mentoring teammates to implement optimized solutions. Our work is critical to the success of the platform, directly impacting the shopping experience for millions of users across Latin America.",
        },
        {
          title: "Software Engineer (2022 - 2024)",
          description:
            "Long-term task estimates, development plans involving coordination of several teams. Mentor of new entries, referent in technical decisions. Implementation of new applications involving communication with different microservices and databases.",
        },
        {
          title: "Software Development Analyst (2021 - 2022)",
          description:
            "Part of the listing management team where sellers can manage their publications across all countries. Technology stack: React, Node, Java, GraphQL. Clean architecture, cross libraries. Handling ~200k RPM across 10 auto-scaling groups. Monitoring: Kibana, New Relic, Datadog. Team of 16 developers using agile methodologies.",
        },
      ],
    },
    {
      company: "Arkano Software",
      roles: [
        {
          title: "Semi Senior Developer",
          description:
            "Tech lead working on multiple projects simultaneously with different clients. Stack: C#, SQL Server, ReactJS, Azure.",
        },
      ],
    },
    {
      company: "Prometeo Open Banking",
      roles: [
        {
          title: "Developer",
          description:
            "Developed internal tools and features in dashboards for API consumption tracking. Implemented the first version of the billing and plans system.",
        },
      ],
    },
    {
      company: "TCS",
      roles: [
        {
          title: "IT Trainee",
          description:
            "IT Trainee position focused on learning enterprise-level software development practices and methodologies.",
        },
      ],
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-background py-12 md:py-20 px-6 md:px-20 flex flex-col gap-8 md:gap-10"
    >
      <span className="text-accent font-bold text-xs tracking-[2px]">
        {isVisible ? (
          <TypingText text="// WORK EXPERIENCE" speed={50} showCursor={false} />
        ) : (
          "// WORK EXPERIENCE"
        )}
      </span>

      <div className="flex flex-col gap-0.5 w-full">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.company} {...exp} index={index} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
