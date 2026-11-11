import HeroSection from "./_components/HeroSection.component";
import QueTeTrae from "./_components/QueTeTrae";
import AboutMe from "./_components/AboutMe/index";
import Services from "./_components/Services";
import Testimonials from "./_components/Testimonials";
import ContactForm from "./_components/ContactForm";
import BuyEbook from "./_components/BuyEbook";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[100svh] flex-col bg-ground">
        <HeroSection />
        <QueTeTrae />
        <AboutMe />
        <Services />
        <Testimonials />
        <BuyEbook />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
