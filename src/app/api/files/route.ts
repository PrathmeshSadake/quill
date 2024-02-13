import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      throw new Error("Unauthorized", {
        cause: 403,
      });
    }

    const files = await db.file.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
