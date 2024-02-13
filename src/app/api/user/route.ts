import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      throw new Error("Unauthorized", {
        cause: 403,
      });
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) {
      const newUser = await db.user.create({
        data: {
          email: user.emailAddresses[0].emailAddress,
          id: user.id,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
