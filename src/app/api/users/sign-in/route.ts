import { NextRequest, NextResponse } from "next/server";
import { CronosUserModel } from "../../../../../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbconnect } from "../../../../../dbconfig/dbConfig";

export async function POST(request: NextRequest) {
    try {
        const { identifier, password } = await request.json();

        if (!identifier || !password) {
            return NextResponse.json(
                { success: false, message: "Identifier and password are required." },
                { status: 400 }
            );
        }

        await dbconnect();

        // 🔹 Find user by email OR username
        const user = await CronosUserModel.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        console.log(user)

        if (!user) {
            return NextResponse.json(
                { success: false, message: "No such user found" },
                { status: 401 }
            );
        }

        // 🔹 Check if user is verified
        if (!user.isUserVerified) {
            return NextResponse.json(
                { success: false, message: "User is not verified. Please verify your email first." },
                { status: 403 }
            );
        }

        // 🔹 Compare password with stored hash
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { success: false, message: "Invalid password." },
                { status: 401 }
            );
        }

        // 🔹 Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // 🔹 Create JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // 🔹 Set token in HTTP-only cookie
        const response = NextResponse.json(
            { success: true, message: "Login successful" }
        );

        response.cookies.set("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",  // Secure in production
            sameSite: "strict",  // Prevent CSRF attacks
            path: "/", // Cookie is valid for the entire app
            maxAge: 24 * 60 * 60 // 1 day expiration
        });

        return response;
        
    } catch (error) {
        console.error("Error in sign-in:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}
