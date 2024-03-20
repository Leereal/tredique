import React from "react";
import { auth } from "@clerk/nextjs";

const Dashboard = () => {
  const { sessionClaims } = auth();
  return <div>Dashboard</div>;
};

export default Dashboard;
