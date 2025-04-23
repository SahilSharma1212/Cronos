import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "../../../../../dbconfig/dbConfig";
import { CronosCapsuleModel, CronosUserModel } from "../../../../../models/userModel";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not signed in",
          error:
            "There was an error, You must be signed in to create a capsule",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    if (typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    await dbconnect();

    const { capsuleName, content, privacyType, openingDate , imagesArray } =
      await request.json();

    if (!capsuleName || !content || !privacyType || !openingDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const newCapsule = new CronosCapsuleModel({
      userId,
      capsuleName,
      content,
      privacyType,
      openingDate,
      createdAt: Date.now(),
      imagesArray
    });

    const savedCapsule = await newCapsule.save();

    if (!savedCapsule) {
      return NextResponse.json(
        {
          success: false,
          message: "Capsule was not saved",
        },
        { status: 400 }
      );
    }

    await CronosUserModel.findByIdAndUpdate(
      userId,
      {
        $push: { allCapsules: savedCapsule }
      },
      { new: true }
    );
    

    return NextResponse.json(
      {
        success: true,
        message: "Capsule created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Capsule creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error,
      },
      { status: 500 }
    );
  }
}
