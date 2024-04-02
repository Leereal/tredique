import moment from "moment";
import Image from "next/image";
import { FaHandPointUp } from "react-icons/fa6";
import {
  IoArrowDownCircleSharp,
  IoArrowUpCircleSharp,
  IoRadioButtonOn,
} from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { ForexSignal } from "@/types";
import Link from "next/link";

const HomeBinarySignalCard = ({ signal }: { signal: ForexSignal }) => {
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
            // className="bg-black border border-gray-200 rounded-lg m-2 p-2 flex flex-row items-center shadow-xl cursor-pointer"
            className={`${
              signal.profit
                ? signal.profit > 0
                  ? "bg-green-300"
                  : "bg-red-200"
                : signal.isActive
                ? "bg-black"
                : "bg-gray-500"
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
                <div className="uppercase text-xl font-bold text-white whitespace-nowrap">
                  {signal.symbol.toLowerCase().includes("volatility")
                    ? signal.symbol
                        .toLowerCase()
                        .replace("volatility", "V")
                        .replace(/\bindices?\b/g, "") // Remove "indices"
                        .replace(/\bindex(?:es?)?\b/gi, "") // Remove index
                        .trim()
                    : signal.symbol}
                </div>

                <div>
                  <IoRadioButtonOn
                    size={24}
                    color={signal.isActive ? "green" : "grey"}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                {signal.profit ? (
                  <p>Closed</p>
                ) : !signal.isPremium ? (
                  <>
                    <div className="font-bold text-xl text-green-500 whitespace-nowrap">
                      {signal.entryRange}
                    </div>
                    {signal.type.includes("buy") ? (
                      <IoArrowUpCircleSharp
                        size={32}
                        className="text-green-500"
                      />
                    ) : (
                      <IoArrowDownCircleSharp
                        size={32}
                        className="text-red-500"
                      />
                    )}
                  </>
                ) : (
                  <p className="text-sm">Click to view full signal</p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="whitespace-nowrap">{signal.expiration} mins</p>
                <p className="text-xs italic text-right whitespace-nowrap">
                  {moment(signal.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HomeBinarySignalCard;
