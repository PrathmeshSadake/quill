import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";

export async function GET(req: Request, res: Response) {
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

export async function DELETE(req: Request, res: Response) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      throw new Error("Unauthorized", {
        cause: 403,
      });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      throw new Error("Bad Request", {
        cause: 400,
      });
    }

    const file = await db.file.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!file) {
      throw new Error("Not Found", {
        cause: 404,
      });
    }

    await db.file.delete({
      where: {
        id,
      },
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      throw new Error("Unauthorized", {
        cause: 403,
      });
    }

    const body = await req.json();
    const { key } = body;

    if (key) {
      const file = await db.file.findFirst({
        where: {
          key,
          userId: user.id,
        },
      });

      if (!file) {
        throw new Error("Not Found", {
          cause: 404,
        });
      }

      return NextResponse.json(file);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
