import Header from "@/components/common/Header";
import { getAllRobots } from "@/lib/actions/robot.actions";
import { IRobot } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import RobotList from "./_components/RobotList";

const RobotsPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const robots: IRobot[] = await getAllRobots();

  return (
    <>
      <Header
        title="Robots"
        subtitle="In this page we add new robots and it's only available to admins"
      />
      <section className="mt-10">{<RobotList bots={robots} />}</section>
    </>
  );
};

export default RobotsPage;
