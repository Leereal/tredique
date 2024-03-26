"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ForexSignal } from "@/types";
import SignalCard from "../(root)/signals/_components/SignalCard";
import HomeSignalCard from "./HomeSignalCard";
import HomeBinarySignalCard from "./HomeBinarySignalCard";

const HomeSignalGroup = ({
  signals,
}: {
  signals: ForexSignal[] | undefined;
}) => {
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
          {signals
            .filter((signal) => signal.isActive === true)
            ?.map((signal) => {
              if (signal.isBinary) {
                return (
                  <HomeBinarySignalCard signal={signal} key={signal._id} />
                );
              } else {
                return <HomeSignalCard signal={signal} key={signal._id} />;
              }
            })}
        </div>
      ) : (
        <div className="font-bold text-red-600">No signals</div>
      )}
    </div>
  );
};

export default HomeSignalGroup;
