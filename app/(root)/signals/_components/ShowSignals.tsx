"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SignalGroup from "./SignalGroup";
import { ForexSignal } from "@/types";
import { Button } from "@/components/ui/button";
import SignalModal from "./SignalModal";
import AdminPermission from "@/components/common/AdminPermission";

const ShowSignals = ({
  signals,
  userId,
}: {
  signals: ForexSignal[] | undefined;
  userId: any;
}) => {
  const [visible, setVisible] = useState(false);
  const [signal, setSignal] = useState({});

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
    { value: "iqoption-binary", label: "IQ Option Binary" },
    { value: "deriv-binary", label: "Deriv Binary" },
  ];

  return (
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
  );
};

export default ShowSignals;
