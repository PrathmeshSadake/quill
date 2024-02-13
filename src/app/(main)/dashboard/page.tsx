import db from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Dashboard from "./_components/dashboard";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const data = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!data) redirect("/auth-callback?origin=dashboard");

  return (
    <MaxWidthWrapper>
      <Dashboard />
    </MaxWidthWrapper>
  );
};

export default DashboardPage;
