import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || !user.email)
      return new NextResponse("Unauthorized", { status: 401 });

    // check if the user is in the database
    //   const dbUser = await db.user.findFirst({
    //     where: {
    //       id: user.id,
    //     },
    //   });

    //   if (!dbUser) {
    //     // create user in db
    //     await db.user.create({
    //       data: {
    //         id: user.id,
    //         email: user.email,
    //       },
    //     });
    //   }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[AUTH_CALLBACK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
