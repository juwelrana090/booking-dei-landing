import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export default async function UserForgetPassword(request, response) {

    if (request.method === "POST") {
        try {
            const body = request.body;
            const { user_id, password } = body;

            const user = await prisma.user.findFirst({
                where: {
                    id: user_id
                }
            });

            // console.log('user :', user);

            if (user) {

                const HashedPassword = await bcrypt.hash(password, 12)

                const updateUser = await prisma.user.update({
                    where: {
                        id: user_id
                    },
                    data: {
                        password: HashedPassword,
                    },
                })

                return response.status(200).json({
                    status: true,
                    message: "Password reset successfully!",
                })

            } else {
                return response.status(422).json({ status: false, message: "This account don't exists!!!" })
            }

        } catch (err) {
            console.log(err)
            response.status(500).send("error")
        }
    } else {
        response.status(405).json({ message: "Method not allowed" })
    }

}
