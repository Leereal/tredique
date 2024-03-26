import moment from "moment";
import Image from "next/image";
import { FaHandPointUp } from "react-icons/fa6";
import { IoRadioButtonOn } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { ForexSignal } from "@/types";
import { useState } from "react";
import Link from "next/link";

const HomeSignalCard = ({ signal }: { signal: ForexSignal }) => {
  return (
    <>
      <Link href="/sign-up">
        <div className="relative m-2">
          {signal.isPremium && (
            <div className="absolute top-0 left-0 bg-yellow-400 text-white py-1 px-2 text-xs font-bold rounded-br-lg rounded-tl-lg">
              Premium
            </div>
          )}
          <div
            className={`${
              signal.profit
                ? signal.profit > 0
                  ? "bg-green-300"
                  : "bg-red-200"
                : signal.isActive
                ? "bg-blue-200"
                : "bg-gray-200"
            } border border-gray-200 rounded-lg m-2 p-2 flex flex-row items-center shadow-xl cursor-pointer`}
          >
            <div className="p-2">
              <Image
                src={`/assets/icons/${signal?.symbol?.toLowerCase()}.svg`}
                alt={signal.symbol}
                height={64}
                width={64}
                priority={true}
              />
            </div>

            <div className="ml-2 flex-1">
              <div className="flex flex-row justify-between items-center">
                <div className="uppercase text-sm font-bold text-blue-950">
                  {signal.symbol}
                </div>

                <div>
                  <IoRadioButtonOn
                    size={24}
                    color={signal.isActive ? "green" : "grey"}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="capitalize font-extrabold text-blue-800 text-xs whitespace-nowrap">
                  {signal.type}
                </div>

                <Separator className="my-1" />
                {!signal.isPremium && (
                  <div className="uppercase font-semibold text-xs text-slate-600 whitespace-nowrap">
                    {signal.entryRange}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  {/* This div will only be visible on small screens (sm: hidden hides it on screens ≥640px) */}
                  {!signal.isPremium ? (
                    <div className="text-xs font-bold text-green-700 flex mt-1 sm:hidden">
                      Touch for TP and SL{" "}
                      <FaHandPointUp size={14} color="green" />
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-green-700 flex mt-1 sm:hidden">
                      Touch for Entry Price, TP and SL{" "}
                      <FaHandPointUp size={14} color="green" />
                    </div>
                  )}

                  {/* This div will be hidden on small screens and visible on screens ≥640px (sm:flex) */}
                  {!signal.isPremium ? (
                    <div className="hidden sm:flex text-xs font-bold text-green-700 mt-1">
                      Click for TP and SL{" "}
                      <FaHandPointUp size={14} color="green" />
                    </div>
                  ) : (
                    <div className="hidden sm:flex text-xs font-bold text-green-700 mt-1">
                      Click for Entry Price, TP and SL{" "}
                      <FaHandPointUp size={14} color="green" />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs italic text-right">
                {moment(signal.createdAt).fromNow()}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HomeSignalCard;
