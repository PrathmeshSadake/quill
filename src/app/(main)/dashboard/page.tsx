import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const data = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!data) redirect("/auth-callback?origin=dashboard");

  return <div>Dashboard</div>;
};

export default Dashboard;
