import { NextResponse, NextRequest } from "next/server";
import { CronosUserModel } from "../../../../../models/userModel";
import { dbconnect } from "../../../../../dbconfig/dbConfig";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../../../helpers/sendemail";

export async function POST(req: NextRequest) {
  await dbconnect();
  console.log("✅ Connected to DB");

  try {
    const { username, email, password } = await req.json();
    console.log("✅ Request body:", { username, email });

    const existingUser = await CronosUserModel.findOne({
      $or: [{ email }, { username }],
    });

    console.log("✅ Existing user:", existingUser);

    if (existingUser) {
      if (existingUser.isVerified === true) {
        console.log("❌ User already exists and is verified.");
        return NextResponse.json(
          {
            success: false,
            message: "User already exists with same credentials. Proceed to sign-in",
            error: "User already exists with same credentials. Proceed to sign-in",
          },
          { status: 400 }
        );
      }

      if (existingUser.isVerified === false) {
        console.log("⚠️ User exists but not verified. Resending code...");
        const generatedVerifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        await CronosUserModel.findByIdAndUpdate(existingUser._id, {
          verifyCode: generatedVerifyCode,
          verifyCodeExpiry: Date.now() + 30 * 60 * 1000,
        });

        const emailResponse = await sendVerificationEmail({
          email,
          username,
          verifyCode: generatedVerifyCode,
        });

        console.log("✅ Email response:", emailResponse);

        if (!emailResponse.success) {
          return NextResponse.json(
            {
              success: false,
              message: "User exists, but email could not be sent.",
              error: "User exists, but email could not be sent.",
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            success: true,
            message:
              "User already exists but is not verified. Resending verification code.",
          },
          { status: 200 }
        );
      }
    }

    console.log("🆕 New user. Registering...");
    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedVerifyCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = new CronosUserModel({
      username,
      email,
      password: hashedPassword,
      verifyCode: generatedVerifyCode,
      verifyCodeExpiry: Date.now() + 30 * 60 * 1000,
    });

    const savedUser = await newUser.save();
    console.log("✅ Saved user:", savedUser);

    if (!savedUser._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Error saving the user.",
          error: "Error saving the user.",
        },
        { status: 500 }
      );
    }

    const emailResponse = await sendVerificationEmail({
      email,
      username,
      verifyCode: generatedVerifyCode,
    });

    console.log("✅ Email sent:", emailResponse);

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: "User created, but email could not be sent.",
          error: "User created, but email could not be sent.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "A verification code has been sent to your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in user registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unknown error occurred.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
