import Header from "@/components/common/Header";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";

import ShowSignals from "./_components/ShowSignals";
import { getAllSignals } from "@/lib/actions/signal.actions";
import { ForexSignal } from "@/types";

const SignalsPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const signals: ForexSignal[] = (await getAllSignals({}))?.data;

  return (
    <>
      <Header title="Signals" subtitle="Synthetic Signals" />
      <section className="mt-10">
        {/* {signals.length && <ShowSignals signals={signals} />} */}
        <ShowSignals signals={[]} />
      </section>
    </>
  );
};

export default SignalsPage;
