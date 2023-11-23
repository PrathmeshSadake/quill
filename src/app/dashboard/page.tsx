import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <div>{user ? user.email : "Dashboard"}</div>;
};

export default Dashboard;
