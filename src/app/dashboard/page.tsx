import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { db } from "@/db";

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.email || !user.id) redirect(`/auth-callback?origin=dashboard`);

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return <Dashboard />;
};

export default DashboardPage;
