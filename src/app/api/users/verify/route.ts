import { NextRequest, NextResponse } from "next/server";
import { CronosUserModel } from "../../../../../models/userModel";
import { dbconnect } from "../../../../../dbconfig/dbConfig";

export async function POST(request: NextRequest) {
    try {
        const { username, verifyCode } = await request.json();

        if (!username || !verifyCode) {
            return NextResponse.json(
                { success: false, message: "Username and verification code are required.",error: "Username and verification code are required."},
                { status: 400 }
            );
        }

        await dbconnect();

        const foundUserByUsername = await CronosUserModel.findOne({ username });

        console.log(verifyCode)

        if (!foundUserByUsername) {
            return NextResponse.json(
                { success: false, message: "User not found." },
                { status: 404 }
            );
        }

        if (foundUserByUsername.isUserVerified) {
            return NextResponse.json(
                { success: false, message: "You are already verified. Proceed to sign in.",error:"You are already verified. Proceed to sign in." },
                { status: 400 }
            );
        }

        if (!foundUserByUsername.verifyCode || foundUserByUsername.verifyCodeExpiry < Date.now()) {
            return NextResponse.json(
                { success: false, message: "Your verification code has expired. Request a new one." },
                { status: 401 }
            );
        }

        if (verifyCode !== foundUserByUsername.verifyCode) {
            return NextResponse.json(
                { success: false, message: "Invalid verification code." },
                { status: 401 }
            );
        }

        await CronosUserModel.findByIdAndUpdate(foundUserByUsername._id, {
            $set: { verifyCodeExpiry: null, verifyCode: "", isUserVerified: true }
        }
        );

        return NextResponse.json(
            { success: true, message: "You have been successfully verified. Proceed to sign in." }
        );

        

    } catch (error) {
        console.error("Error in verification:", error);
        return NextResponse.json(
            { success: false, message: "An internal server error occurred." },
            { status: 500 }
        );
    }
}
