import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export default async function UserRegister(request, response) {

    if (request.method === "POST") {
        try {
            const body = request.body;
            const { name, email, password } = body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            // console.log('user :', user);

            if (user) {
                return response.status(422).json({ status: false, error: "This account is already exists!!!" })
            }

            const HashedPassword = await bcrypt.hash(password, 12)

            const newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: HashedPassword
                }
            });

            return response.status(200).json({
                status: true,
                message: "Your account is registered successfully!",
            })

        } catch (err) {
            console.log(err)
            response.status(500).send("error")
        }
    } else {
        response.status(405).json({ message: "Method not allowed" })
    }

}
