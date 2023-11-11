import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function getUser(request, response) {

    const JWT_SECRET = process.env.JWT_SECRET

    if (request.method === "GET") {
        try {

            const { authorization } = request.headers

            const token = authorization.substring(7, authorization.length);
            let user_id;

            jwt.verify(token, JWT_SECRET, async function (err, decoded) {
                if (err) {
                    console.log(err)
                }
                else {
                    user_id = decoded.user_id;
                }
            });

            // console.log('token :', token)

            const id = request.query.id;
            const user = await prisma.user.findFirst({
                where: {
                    id: user_id
                }
            });

            if (user) {
                return response.status(200).json({
                    status: true,
                    user: user,
                })
            } else {
                return response.status(422).json({
                    status: false,
                    message: "This account don't exists!!!"
                })
            }
        } catch (err) {
            console.log(err)
            response.status(500).send("error")
        }
    } else {
        response.status(405).json({ message: "Method not allowed" })
    }

}
