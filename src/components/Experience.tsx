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
          title: "Senior Software Engineer (2021 - Present)",
          description:
            "Currently part of the listing management team where sellers manage their publications across all countries. Previously worked on the search engine team, handling one of the world's most heavily used search bars with over 5 million queries per minute. Tech stack includes React, Node, Java, Golang, and GraphQL with clean architecture patterns. Experience working with high-traffic systems across auto-scaling groups, using monitoring tools like Kibana, New Relic, and Datadog.",
        },
      ],
    },
    {
      company: "Arkano Software",
      roles: [
        {
          title: "Semi Senior Developer (Oct 2020 - May 2021)",
          description:
            "Worked on multiple projects across different industries: developed and maintained an adverse effects reporting system for a pharmaceutical company, built SharePoint solutions, and performed data analysis for a mining company. Stack: C#, SQL Server, ReactJS, Azure.",
        },
      ],
    },
    {
      company: "Prometeo Open Banking",
      roles: [
        {
          title: "Developer (Jan 2020 - Oct 2020)",
          description:
            "My first experience in the startup world. Implemented Jenkins pipelines to integrate CI into the project, built the first version of the billing and plans system, and handled BAU tasks. Developed internal tools and dashboard features for API consumption tracking.",
        },
      ],
    },
    {
      company: "TCS",
      roles: [
        {
          title: "IT Trainee (Jun 2019 - Jan 2020)",
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
