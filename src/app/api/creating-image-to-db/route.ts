import { NextRequest, NextResponse } from "next/server";
import { CronosImageModel } from "../../../../models/userModel";
import jwt from "jsonwebtoken";
import { dbconnect } from "../../../../dbconfig/dbConfig";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "your_TOKEN_SECRET";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "You must be signed in to upload images" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, TOKEN_SECRET) as { id: string };
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token - ", err },
        { status: 403 }
      );
    }

    const userId = decoded.id;

    const body = await req.json();

    await dbconnect();

    const newImage = await CronosImageModel.create({
      userId,
      fileId: body.fileId,
      fileType: body.fileType,
      size: body.size,
      height: body.height,
      width: body.width,
      path: body.filePath,
      thumbnailUrl: body.thumbnailUrl,
      url: body.url,
    });

    return NextResponse.json(
      { success: true, image: newImage },
      { status: 201 }
    );
  } catch (error) {
    console.error("[UPLOAD-SAVE-ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
