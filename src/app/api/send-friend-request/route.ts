import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "../../../../dbconfig/dbConfig";
import { CronosUserModel } from "../../../../models/userModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_SECRET!;

export async function POST(request: NextRequest) {
  try {
    await dbconnect();

    const { receiver } = await request.json();

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
      console.log("error", err);
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const senderUsername = decodedToken.username;

    if (senderUsername === receiver) {
      return NextResponse.json(
        { message: "You cannot send a friend request to yourself." },
        { status: 400 }
      );
    }

    const senderUser = await CronosUserModel.findOne({
      username: senderUsername,
    });
    const receiverUser = await CronosUserModel.findOne({ username: receiver });

    if (!senderUser || !receiverUser) {
      return NextResponse.json(
        { message: "Sender or receiver not found." },
        { status: 404 }
      );
    }

    const senderId = senderUser._id;

    if (
      receiverUser.friendRequests?.includes(senderId) ||
      receiverUser.friends?.includes(senderId)
    ) {
      return NextResponse.json(
        { message: "Friend request already sent or you are already friends." },
        { status: 409 }
      );
    }

    // Optional: check if receiver already sent a request to sender
    if (senderUser.friendRequests?.includes(receiverUser._id)) {
      return NextResponse.json(
        { message: "User has already sent you a friend request." },
        { status: 409 }
      );
    }

    await CronosUserModel.updateOne(
      { _id: receiverUser._id },
      { $addToSet: { friendRequests: senderId } }
    );

    return NextResponse.json(
      { message: "Friend request sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while sending friend request:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
