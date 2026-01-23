import {
  Hero,
  About,
  Experience,
  Projects,
  TechStack,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[1440px] mx-auto">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Footer />
    </main>
  );
}
