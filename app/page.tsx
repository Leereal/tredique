import CallToAction from "./_components/CallToAction";
import ContactForm from "./_components/ContactForm";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import LogoGrid from "./_components/LogoGrid";
import Testimonial from "./_components/Testimonial";

export default function Home() {
  return (
    <>
      {" "}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F52BA] to-[#50C878] opacity-25"></div>
        <div className="relative z-10 wrapper">
          <Header />
          <Hero />
          <LogoGrid />
          <CallToAction />
          <Testimonial />
          <ContactForm />
          <Footer />
        </div>
      </div>
    </>
  );
}
