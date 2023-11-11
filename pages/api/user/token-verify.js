import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function UserForgetPassword(request, response) {

    const JWT_SECRET = process.env.JWT_SECRET

    if (request.method === "GET") {
        try {

            const token = request.query.token;

            // console.log('token', token);

            jwt.verify(token, JWT_SECRET, async function (err, decoded) {
                if (err) {
                    return response.status(422).json({ status: false, message: "Sorry, this token has expired!!!" })
                }
                else {

                    // const password_resets = await prisma.password_resets.findUnique({
                    //     where: {
                    //         token: token
                    //     }
                    // });

                    console.log('decoded', decoded);

                    return response.status(200).json({
                        status: true,
                        user_id: decoded.user_id,
                        message: "Token verbified successfully!!!",
                    })
                }
            });

        } catch (err) {
            console.log(err)
            response.status(500).send("error")
        }
    } else {
        response.status(405).json({ message: "Method not allowed" })
    }
}
