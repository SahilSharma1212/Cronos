import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { CronosUserModel } from "../../../../models/userModel";

const JWT_SECRET = process.env.TOKEN_SECRET!;

export async function POST(request: NextRequest) {
  const { userWhoSentRequest } = await request.json();

  // Extract token from cookies
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token found in cookies." },
      { status: 401 }
    );
  }

  // Decode and verify JWT
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

  // Get the logged-in user (you)
  const you = await CronosUserModel.findById(decodedToken.id);
  if (!you) {
    return NextResponse.json(
      { message: "User not found." },
      { status: 404 }
    );
  }

  // Get the sender of the friend request
  const sender = await CronosUserModel.findOne({ username: userWhoSentRequest });
  if (!sender) {
    return NextResponse.json(
      { message: "Sender not found." },
      { status: 404 }
    );
  }

  // Update your data: remove sender from friendRequests, add to friends
  await CronosUserModel.findByIdAndUpdate(
    decodedToken.id,
    {
      $pull: { friendRequests: userWhoSentRequest },
      $addToSet: { friends: userWhoSentRequest }, // addToSet avoids duplicates
    },
    { new: true }
  );

  // Update sender data: remove you from their friendRequests, add you to friends
  await CronosUserModel.findOneAndUpdate(
    { username: userWhoSentRequest },
    {
      $pull: { friendRequests: you.username },
      $addToSet: { friends: you.username },
    },
    { new: true }
  );

  return NextResponse.json({
    success: true,
    message: "Friend request accepted successfully.",
  });
}
