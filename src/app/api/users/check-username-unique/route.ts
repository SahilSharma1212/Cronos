import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "../../../../../dbconfig/dbConfig";
import { CronosUserModel } from "../../../../../models/userModel";

export async function POST(request:NextRequest){
    const {username} = await request.json()

    await dbconnect()

    try {
        const foundUserByUsername = await CronosUserModel.findOne({username})

        if(foundUserByUsername){
            return NextResponse.json({
                success:false,
                message:"username is already taken",
                error:"username is already taken"
            })
        }

        return NextResponse.json({
            success:true,
            message:"username is unique",
        })

    } catch (error) {
        console.log('unable to verify if username is unique - ' , error)
        return NextResponse.json({
            success:false,
            message:"there was an error checking uniqeness",
            error:"unable to verify if username is unique"
        })
    }
}