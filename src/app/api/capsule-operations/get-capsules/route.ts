import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { dbconnect } from "../../../../../dbconfig/dbConfig";
import { CronosCapsuleModel } from "../../../../../models/userModel";
export async function POST(request:NextRequest){
    const token = request.cookies.get("token")?.value;
    
        if (!token) {
          return NextResponse.json(
            {
              success: false,
              message: "You are not signed in",
              error:
                "There was an error, You must be signed in to create a capsule",
            },
            { status: 401 }
          );
        }
    
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    
        if (typeof decoded !== "object" || !("id" in decoded)) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid token",
            },
            { status: 401 }
          );
        }
    
        const userId = decoded.id;
    
        await dbconnect();

        const userCapsules = await CronosCapsuleModel.find({userId:userId})

        return NextResponse.json({
            success: true,
            message: "Capsules fetched successfully",
            data: userCapsules,
          });
          
}