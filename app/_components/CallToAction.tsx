import { Button } from "@/components/ui/button";
import Image from "next/image";

const CallToAction = () => {
  return (
    <div className="hidden md:block bg-slate-400 md:py-15 md:px-40">
      <h1 className="text-3xl md:text-5xl text-center text-white font-semibold py-5">
        Unlock the Potential of Every Trade
      </h1>
      <div className="md:flex items-center justify-between pb-10 md:space-x-10">
        <div className="flex gap-2">
          <Image src="/assets/icons/top.svg" width={80} height={80} alt="top" />
          <div className="">
            <h2 className="text-lg font-semibold text-white">
              Elevate Your Trading Strategy
            </h2>
            <p className="text-black">
              <strong> Maximize Profits, Minimize Risks:</strong> Get clear
              directives on when to sell. Our signals come with a clear exit
              strategy, ensuring you know exactly when to take profits.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Image
            src="/assets/icons/secure.svg"
            width={80}
            height={80}
            alt="top"
          />
          <div className="">
            <h2 className="text-lg font-semibold text-white">
              Trade with Confidence
            </h2>
            <p className="text-black">
              <strong>Protect Your Investment:</strong> Trade smarter, not
              harder. Each signal includes a well-calculated stop loss to
              safeguard your trades against sudden market movements.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Image
            src="/assets/icons/money-dollar-bank.svg"
            width={80}
            height={80}
            alt="top"
          />
          <div className="">
            <h2 className="text-lg font-semibold text-white">
              Simplified Trading, Amplified Results
            </h2>
            <p className="text-black">
              <strong>Expertly Curated Signals:</strong> From pinpointing entry
              points to setting a stop loss, let Tredique guide your trading
              decisions in Forex and Synthetic Indices.
            </p>
          </div>
        </div>

        <div>
          <Button className="submit-button">GET PIPS NOW</Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
