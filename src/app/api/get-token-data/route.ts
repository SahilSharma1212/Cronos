import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Your JWT secret (in real projects, store it in environment variables)
const TOKEN_SECRET = process.env.JWT_SECRET || "your_token_secret";

export async function GET(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not signed in",
        error: "There was an error, You must be signed in to create a capsule",
      },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, TOKEN_SECRET!);

    // You can return the user data or any other relevant information
    return NextResponse.json(
      {
        success: true,
        message: "Token is valid",
        user: decoded, // contains the payload you set when signing the token
      },
      { status: 200 }
    );
  } catch (error) {
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
