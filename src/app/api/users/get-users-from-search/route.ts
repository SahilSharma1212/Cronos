import { NextRequest, NextResponse } from "next/server";
import { CronosUserModel, CronosUserSchemaInterface } from "../../../../../models/userModel";
import { dbconnect } from "../../../../../dbconfig/dbConfig";

export async function POST(request: NextRequest) {
  await dbconnect();

  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({
        success: false,
        message: "Username is required",
      });
    }

    const users = await CronosUserModel.find({
      username: { $regex: username, $options: "i" }, // case-insensitive match
    })

    if (users.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No users found",
        users: [],
      });
    }

    const usernames:string[] = [] 
    
    users.forEach((user:CronosUserSchemaInterface)=>{
        usernames.push(user.username)
    })

    return NextResponse.json({
      success: true,
      message: "Users fetched",
      users:usernames,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
}
