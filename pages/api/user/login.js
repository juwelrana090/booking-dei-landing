import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function UserLogin(request, response) {

    const JWT_SECRET = process.env.JWT_SECRET

    if (request.method === "POST") {
        try {
            const body = request.body;
            const { email, password } = body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            // console.log('user :', user);

            if (!user) {
                return response.status(404).json({
                    status: false,
                    message: "Login details don't match"
                })
            }

            const doMatch = await bcrypt.compare(password, user.password);

            if (doMatch) {
                const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
                    expiresIn: "30d",
                })

                if (!doMatch) {
                    return response.status(401).json({
                        status: false,
                        message: "Login details don't match"
                    })
                }

                const { id, name, email } = user;

                response.status(201).json({
                    status: true,
                    token,
                    user: { id, name, email },
                    message: "login successfully",
                })
            } else {
                return response.status(404).json({ status: false, message: "Login details don't match" })
            }

        } catch (err) {
            console.log(err)
            response.status(500).send("error")
        }
    } else {
        response.status(405).json({ message: "Method not allowed" })
    }

}
