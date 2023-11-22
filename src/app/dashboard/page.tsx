import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) return redirect("/auth-callback?origin=dashboard");
  return <div>Dashboard</div>;
};

export default Dashboard;
