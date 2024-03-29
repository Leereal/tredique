"use client";
import { useState } from "react";
import PremiumPermission from "@/components/common/PremiumPermission";
import moment from "moment";
import Image from "next/image";
import {
  IoArrowDownCircleSharp,
  IoArrowUpCircleSharp,
  IoRadioButtonOn,
  IoTrash,
} from "react-icons/io5";
import { ForexSignal } from "@/types";
import { InsufficientCreditsModal } from "@/components/common/InsufficientCreditsModal";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteSignal } from "@/lib/actions/signal.actions";
import { useSocket } from "@/context/SocketContext";
import AdminPermission from "@/components/common/AdminPermission";
import SignalModal from "./SignalModal";

const BinarySignalCard = ({ signal }: { signal: ForexSignal }) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { showMessage, socket, user } = useSocket();
  const accept = async () => {
    await deleteSignal({ signalId: signal._id, path: "/signals" });
    showMessage("success", "Success", "Signal deleted");
    socket.emit("deleteSignal", { signalId: signal._id });
  };

  const reject = () => {};
  const confirm = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };
  return (
    <>
      <ConfirmPopup />
      <div className="relative m-2 group">
        {signal.isPremium && (
          <div className="absolute top-0 left-0 bg-yellow-400 text-white py-1 px-2 text-xs font-bold rounded-br-lg rounded-tl-lg">
            Premium
          </div>
        )}
        {user?.role === "Admin" && (
          <div className="absolute top-2 right-2 hidden group-hover:block">
            <IoTrash
              size={24}
              className="text-red-600 hover:text-red-500 cursor-pointer"
              onClick={confirm}
            />
          </div>
        )}
        <div
          // className="bg-black border border-gray-200 rounded-lg m-2 p-2 flex flex-row items-center shadow-xl cursor-pointer"
          className={`${
            signal.profit
              ? signal.profit >= 0
                ? "bg-green-300"
                : "bg-red-200"
              : signal.isActive
              ? "bg-black"
              : "bg-gray-500"
          } border border-gray-200 rounded-lg m-2 p-2 flex flex-row items-center shadow-xl cursor-pointer`}
          onClick={() => {
            if (signal.isPremium) {
              setVisible(true);
            }
            if (user?.role === "Admin") {
              setOpen(true);
            }
          }}
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
                {signal.symbol.toLowerCase().includes("volatility indices")
                  ? signal.symbol
                      .toLowerCase()
                      .replace("volatility indices", "V")
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
              {signal.profit !== null || signal.profit !== undefined ? (
                signal.profit === 0 ? (
                  <p>Closed / Cancelled</p>
                ) : signal.profit > 0 ? (
                  <p className="text-green-500">Closed (ITM)</p> // In The Money
                ) : (
                  <p className="text-red-500">Closed (OTM)</p> // Out of The Money
                )
              ) : !signal.isPremium ? (
                <>
                  <div className="font-bold text-xl text-green-500 whitespace-nowrap">
                    {signal.entryRange}
                  </div>
                  {signal.type.includes("BUY") ? (
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

      {visible && (
        <PremiumPermission signal={signal} skipPermission={!signal.isPremium}>
          <InsufficientCreditsModal />
        </PremiumPermission>
      )}
      <AdminPermission>
        <SignalModal
          type="Update"
          visible={open}
          setVisible={() => setOpen(false)}
          userId={user?._id}
          signal={signal}
        />
      </AdminPermission>
    </>
  );
};

export default BinarySignalCard;
