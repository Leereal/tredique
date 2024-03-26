import { ForexSignal } from "@/types";
import CallToAction from "./_components/CallToAction";
import ContactForm from "./_components/ContactForm";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import LogoGrid from "./_components/LogoGrid";
import Testimonial from "./_components/Testimonial";
import { getAllSignals } from "@/lib/actions/signal.actions";
import HomeSignalGroup from "./_components/HomeSignalGroup";

export default async function Home() {
  const signals: ForexSignal[] = (await getAllSignals({ limit: 8 }))?.data;
  const forexSignals: ForexSignal[] = signals?.filter(
    (signal) => signal.isActive && !signal.isBinary
  );
  const binarySignals: ForexSignal[] = signals?.filter(
    (signal) => signal.isActive && signal.isBinary
  );
  return (
    <>
      {" "}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F52BA] to-[#50C878] opacity-25"></div>
        <div className="relative z-10 wrapper">
          <Header />
          <Hero />

          {forexSignals && forexSignals.length > 0 && (
            <div className="max-w-screen-xl flex-col items-center space-x-9 mt-10 mx-auto">
              <h2 className="text-black text-3xl text-center font-bold mb-5">
                Latest Forex Signals
              </h2>
              <HomeSignalGroup signals={forexSignals} />
            </div>
          )}
          {binarySignals && binarySignals.length > 0 && (
            <div className="max-w-screen-xl flex-col items-center space-x-9 mt-10 mx-auto">
              <h2 className="text-black text-3xl text-center font-bold mb-5">
                Latest Binary Signals
              </h2>
              <HomeSignalGroup signals={binarySignals} />
            </div>
          )}
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
