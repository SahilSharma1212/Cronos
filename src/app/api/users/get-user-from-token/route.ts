import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CronosUserModel } from "../../../../../models/userModel";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

export async function GET(request: NextRequest) {
  // 🔍 Log the raw cookies from request
  const allCookies = request.cookies.getAll();
  console.log("🔍 All cookies:", allCookies);

  const token = request.cookies.get("token")?.value;
  console.log("🔑 Token from cookie:", token);

  if (!token) {
    console.log("❌ No token found in cookies");
    return NextResponse.json(
      {
        success: false,
        message: "You are not signed in",
        error: "You must be signed in to create a capsule",
      },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET!) as TokenPayload;
    console.log("✅ Decoded token:", decoded);

    const userfound = await CronosUserModel.findById(decoded.id)
    if(!userfound){
        return NextResponse.json({
        success: true,
        message: "Token is valid",
        user:{}
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Token is valid",
        user: {
          userId: decoded.id,
          username:decoded.username,
          email: decoded.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("❌ Token verification failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 401 }
    );
  }
}
