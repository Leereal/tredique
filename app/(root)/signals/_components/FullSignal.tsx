import React, { useState } from "react";
import { ForexSignal } from "@/types";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import AdminPermission from "@/components/common/AdminPermission";
import SignalModal from "./SignalModal";

const FullSignal: React.FC<{
  signal: ForexSignal;
  closeModal: () => void;
  userId: any;
}> = ({ signal, closeModal, userId }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="max-w-sm md:w-[500px]  mx-auto p-4 relative">
        <div className="absolute z-0 pointer-events-none inset-0 flex justify-center items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Watermark"
            layout=""
            width={400}
            height={400}
            className="object-cover rounded-full opacity-10"
          />
        </div>
        <div className="items-center mb-4">
          <h1 className="text-2xl font-bold uppercase text-center">
            {signal.symbol} Complete Signal
          </h1>
          <p className="capitalize text-center text-xs text-primary">
            Please exercise good risk management.
          </p>
          <Logo />
        </div>

        <div className="border-b-2 border-slate-200 pb-3 mb-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Type</h2>
            <span
              className={`font-bold uppercase text-lg ${
                signal.type.toLowerCase().includes("buy")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {signal.type}
            </span>
          </div>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Entry Range</span>
          <Image
            src="/assets/icons/enter.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.entryRange}
          </span>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Stop Loss</span>
          <Image
            src="/assets/icons/stop.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.stopLoss}
          </span>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Take Profit 1</span>
          <Image
            src="/assets/icons/take-profit.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.takeProfit1}
          </span>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Take Profit 2</span>
          <Image
            src="/assets/icons/take-profit.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.takeProfit2}
          </span>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Take Profit 3</span>
          <Image
            src="/assets/icons/take-profit.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.takeProfit3}
          </span>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Take Profit 4</span>
          <Image
            src="/assets/icons/take-profit.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.takeProfit4}
          </span>
        </div>

        <div className="flex justify-between border-b-2 border-b-slate-200 pb-3 mb-3">
          <span className="flex-1 text-md font-bold">Take Profit 5</span>
          <Image
            src="/assets/icons/take-profit.svg"
            alt="logo"
            width={24}
            height={24}
          />
          <span className="flex-1 text-md font-bold uppercase text-right">
            {signal.takeProfit5}
          </span>
        </div>

        <div className="flex justify-between">
          <AdminPermission>
            <button
              onClick={() => setVisible(true)}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-bold text-sky-500">Edit</span>
              <Image
                src="/assets/icons/edit.svg"
                alt="logo"
                width={16}
                height={16}
              />
            </button>
          </AdminPermission>
          <button
            onClick={() => {
              closeModal();
            }}
            className="p-4 rounded-md m-4 items-center"
          >
            <span className="font-bold text-sm  text-sky-500 uppercase">
              Done
            </span>
          </button>
        </div>
      </div>
      <AdminPermission>
        <SignalModal
          type="Update"
          visible={visible}
          setVisible={() => setVisible(false)}
          userId={userId}
          signal={signal}
        />
      </AdminPermission>
    </>
  );
};

export default FullSignal;
