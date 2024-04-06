import React from "react";
import DashWidgets from "./_components/DashWidgets";
import SignalGroup from "../signals/_components/SignalGroup";
import { getAllSignals } from "@/lib/actions/signal.actions";
import { ForexSignal } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashData } from "@/lib/actions/dashboard.actions";
import SocialWidgets from "./_components/SocialWidgets";

const Dashboard = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;

  if (!userId) redirect("/sign-in");

  const signals: ForexSignal[] = (await getAllSignals({ limit: 12 }))?.data;
  const dashData = await getDashData();

  const skeleton = () => {
    return (
      <div className="space-y-2">
        <Skeleton className="h-32 bg-white" />
        <div className="flex flex-row justify-between space-x-16">
          <Skeleton className="h-8 w-20  bg-white" />
          <Skeleton className="h-8 w-20  bg-white" />
        </div>
      </div>
    );
  };

  return (
    <section className="mt-10">
      {dashData && <DashWidgets dashData={dashData} />}
      <SocialWidgets />
      <div className="min-w-screen bg-slate-100 px-5 py-5 mt-5 rounded-2xl">
        <div className="flex  items-center justify-between">
          <h3 className="font-bold text-xl mb-2">Most Recent Signals</h3>
          {/* <div className=" flex items-center">
            <p className="text-primary font-semibold">Risk Meter : </p>
            <div>
              {[...Array(7)].map((_, index) => (
                <span
                  key={index}
                  className="mr-1 bg-yellow-600 rounded-full text-xs px-2 text-white"
                >
                  0TM
                </span>
              ))}
            </div>
          </div> */}
        </div>
        {signals ? (
          <SignalGroup signals={signals} userId={userId} />
        ) : (
          <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
