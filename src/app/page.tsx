import HeroSection from "./_components/HeroSection.component";
import AboutMe from "./_components/AboutMe/index";
import Services from "./_components/Services";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col"
      style={{
        background:
          "linear-gradient(0deg, rgba(130,171,165,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <HeroSection />
      <AboutMe />
      <Services />
    </main>
  );
}
