import { NextRequest } from "next/server";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        // 🔹 Extract token from cookies manually (Fix for Next.js API Routes)
        const cookies = req.headers.get("cookie") || "";
        const token = cookies.split("; ").find(row => row.startsWith("token="))?.split("=")[1] || "";

        if (!token) {
            return { error: "No token provided" };
        }

        if (!process.env.TOKEN_SECRET) {
            return { error: "Server error: Missing TOKEN_SECRET" };
        }

        // 🔹 Verify token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET) as jwt.JwtPayload;

        return { userId: decodedToken.id }; // ✅ Returns user ID properly

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return { error: "Token expired. Please log in again." };
        }
        if (error instanceof JsonWebTokenError) {
            return { error: "Invalid token. Please log in again." };
        }

        console.log("An unknown error occurred decoding token:", error);
        return { error: "Unknown error while decoding token" };
    }
};
