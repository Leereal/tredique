"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SignalGroup from "./SignalGroup";
import { ForexSignal } from "@/types";
import { Button } from "@/components/ui/button";
import SignalModal from "./SignalModal";

const ShowSignals = ({ signals }: { signals: ForexSignal[] }) => {
  const [visible, setVisible] = useState(false);
  const [signal, setSignal] = useState({});

  const renderTabs = (tabs: { value: string; label: string }[]) => {
    return tabs.map((tab) => (
      <TabsContent key={tab.value} value={tab.value} className="space-y-4">
        <SignalGroup
          signals={
            tab.value === "overview"
              ? signals
              : signals.filter(
                  (signal) => signal.signalCategory?.name === tab.value
                )
          }
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
        <Button onClick={() => setVisible(true)}>Create</Button>
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
      <SignalModal visible={visible} setVisible={() => setVisible(false)} />
    </div>
  );
};

export default ShowSignals;
