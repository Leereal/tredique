"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import SignalGroup from "./SignalGroup";
import { ForexSignal } from "@/types";
import { Button } from "@/components/ui/button";
import SignalModal from "./SignalModal";
import AdminPermission from "@/components/common/AdminPermission";
import { useSocket } from "@/context/SocketContext";

const ShowSignals = ({
  signals: initialSignals,
  userId,
}: {
  signals: ForexSignal[] | undefined;
  userId: string; // Assuming userId is a string. Adjust type accordingly.
}) => {
  const [signals, setSignals] = useState<ForexSignal[] | undefined>(
    initialSignals
  );
  const [visible, setVisible] = useState(false);
  const { socket, showMessage } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handleNewSignal = (signal: ForexSignal) => {
      // Use a functional update to maintain immutability
      setSignals((currentSignals) => [signal, ...(currentSignals || [])]);
      showMessage("success", "New Signal", "New signal has been added");
      const sound = new Audio("/assets/sounds/pop-sound.mp3");
      sound.play();
    };

    const handleUpdateSignal = (updatedSignal: ForexSignal) => {
      setSignals((currentSignals) => {
        if (!currentSignals) return currentSignals;

        return currentSignals.map((signal) => {
          if (signal._id === updatedSignal._id) {
            // Replace the old signal with the updated one
            return updatedSignal;
          } else {
            return signal;
          }
        });
      });
      showMessage(
        "success",
        "Signal Updated",
        `Signal "${updatedSignal.symbol}" has been updated`
      );
    };

    const handleDeleteSignal = ({ signalId }: { signalId: string }) => {
      setSignals((currentSignals) => {
        const filteredSignals = currentSignals?.filter(
          (signal) => signal._id !== signalId
        );
        return filteredSignals;
      });
      showMessage(
        "success",
        "Signal Deleted",
        `There is a signal that was deleted`
      );
    };

    socket.on("broadcastedSignal", handleNewSignal);
    socket.on("deleteSignal", handleDeleteSignal);
    socket.on("updatedSignal", handleUpdateSignal);

    return () => {
      socket.off("broadcastedSignal", handleNewSignal);
      socket.off("deleteSignal", handleDeleteSignal);
      socket.off("updatedSignal", handleUpdateSignal);
    };
  }, [socket]);

  const renderTabs = (tabs: { value: string; label: string }[]) => {
    return tabs.map((tab) => (
      <TabsContent key={tab.value} value={tab.value} className="space-y-4">
        <SignalGroup
          signals={
            tab.value === "overview"
              ? signals
              : signals?.filter(
                  (signal) => signal.signalCategory?.name === tab.value
                )
          }
          userId={userId}
        />
      </TabsContent>
    ));
  };

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "forex", label: "Forex" },
    { value: "synthetic", label: "Synthetic" },
    { value: "iqoption-binary", label: "Currency Binary" },
    { value: "deriv-binary", label: "Deriv Binary" },
  ];

  return (
    <>
      <div>
        <div className="mb-3">
          <AdminPermission>
            <Button className="submit-button" onClick={() => setVisible(true)}>
              Create
            </Button>
          </AdminPermission>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {renderTabs(tabs)}
        </Tabs>
        <AdminPermission>
          <SignalModal
            type="Create"
            visible={visible}
            setVisible={() => setVisible(false)}
            userId={userId}
          />
        </AdminPermission>
      </div>
    </>
  );
};

export default ShowSignals;
