import Header from "@/components/common/Header";
import { getAllConnections } from "@/lib/actions/connection.actions";
import { IConnection } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ConnectionList from "./_components/ConnectionList";

const ConnectionsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch connections synchronously
  const response = await getAllConnections({});
  const connections: IConnection[] = response?.data ?? [];

  return (
    <>
      <Header title="Connections" subtitle="In this page we add connections" />
      <section className="mt-10">
        <ConnectionList connections={connections} />
      </section>
    </>
  );
};

export default ConnectionsPage;
