import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const data = await request.json();
        const response = await axios.post(process.env.DOMAIN! + "/user/googleAuth", {
            email: data.email,
            userName: data.name,
            profileUrl: data.profileUrl,
        });
        const finalResponse = NextResponse.json({
            data: response.data
        },
            {
                status: response.status
            },
        );
        finalResponse.cookies.set("token", response.data.token, {
            httpOnly: true,
            sameSite: "lax",
        });
        return finalResponse;
    } catch (error: any) {
        const response = NextResponse.json({
            status: "error",
            message: error.response.data.message
        },
            {
                status: error.response.status
            }
        );
        response.cookies.set("token", "");
        return response;
    }
}