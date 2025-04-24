import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "../../../../dbconfig/dbConfig";
import { CronosUserModel } from "../../../../models/userModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_SECRET!;
export async function GET(request: NextRequest) {
  try {
    await dbconnect();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found in cookies." },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
      email: string;
    };

    const user = await CronosUserModel.findOne({ username: decodedToken.username });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const userFriendRequests = user.friendRequests;

    const friendUsers = await Promise.all(
      userFriendRequests.map(async (id:string) => {
        const friend = await CronosUserModel.findById(id).select("username");
        return friend?.username || null;
      })
    );

    // Filter out nulls just in case
    const arrayOfNames = friendUsers.filter(Boolean);

    return NextResponse.json(
      { success: true, friendRequests: arrayOfNames },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}
