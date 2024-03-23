"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import SignalCard from "./SignalCard";
import { ForexSignal } from "@/types";

const SignalGroup = ({ signals }: { signals: ForexSignal[] | undefined }) => {
  return (
    <div className="space-y-3">
      {signals && signals.length > 0 ? (
        <div
          className={cn(
            signals && signals.length
              ? "grid gap-4   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              : "flex justify-center items-center"
          )}
        >
          {signals && signals.length ? (
            signals
              .filter((signal) => signal.isActive === true)
              ?.map((signal) => <SignalCard signal={signal} key={signal._id} />)
          ) : (
            <div className="font-bold text-red-600">No active signals</div>
          )}
        </div>
      ) : (
        <div className="font-bold text-red-600">No signals</div>
      )}
    </div>
  );
};

export default SignalGroup;
