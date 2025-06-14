import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { CronosUserModel } from "../../../../models/userModel";

const JWT_SECRET = process.env.TOKEN_SECRET!;

export async function POST(request: NextRequest) {
  const { userWhoSentRequest } = await request.json();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token found in cookies." },
      { status: 401 }
    );
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
      email: string;
    };
  } catch (err) {
    console.log("Token error:", err);
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 401 }
    );
  }

  const you = await CronosUserModel.findById(decodedToken.id);
  if (!you) {
    return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
    );
  }

  const sender = await CronosUserModel.findOne({ username: userWhoSentRequest });
  if (!sender) {
    return NextResponse.json(
      { message: "Sender not found." },
      { status: 404 }
    );
  }

  // Remove sender from your friendRequests
  await CronosUserModel.findByIdAndUpdate(
    decodedToken.id,
    {
      $pull: { friendRequests: userWhoSentRequest },
    },
    { new: true }
  );

  // Remove you from sender's friendRequests
  await CronosUserModel.findOneAndUpdate(
    { username: userWhoSentRequest },
    {
      $pull: { friendRequests: you.username },
    },
    { new: true }
  );

  return NextResponse.json({
    success: true,
    message: "Friend request rejected successfully.",
  });
}
