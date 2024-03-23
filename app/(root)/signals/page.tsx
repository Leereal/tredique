import Header from "@/components/common/Header";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ShowSignals from "./_components/ShowSignals";
import { getAllSignals } from "@/lib/actions/signal.actions";
import { ForexSignal } from "@/types";
import { getUserById } from "@/lib/actions/user.actions";

const SignalsPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;

  if (!userId) redirect("/sign-in");

  const signals: ForexSignal[] = (await getAllSignals({}))?.data;

  const skeleton = () => {
    return (
      <div className="space-y-2">
        <Skeleton className="h-32" />
        <div className="flex flex-row justify-between space-x-16">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header title="Signals" />
      <section className="mt-10">
        {signals ? (
          //I want to check if user.isPremium to show this component or not
          <ShowSignals signals={signals} userId={userId} />
        ) : (
          <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </section>
    </>
  );
};

export default SignalsPage;
