import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import absoluteUrl from "next-absolute-url"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "~/helpers/sendMail";

const prisma = new PrismaClient()

export default async function UserForgetPassword(request, response) {

    const JWT_SECRET = process.env.JWT_SECRET

    if (request.method === "POST") {
        try {
            const body = request.body;
            const { email } = body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            // console.log('user :', user);

            if (user) {

                const deleteToken = await prisma.password_resets.delete({
                    where: {
                        email: email,
                    },
                })

                const token = jwt.sign({ id: user.id }, JWT_SECRET, {
                    expiresIn: '5m',
                })

                const passwordResets = await prisma.password_resets.findUnique({
                    where: {
                        email: email
                    }
                });

                // console.log('passwordResets', passwordResets);

                function addMinutes(date, minutes) {
                    const newDate = new Date(date);
                    const addFive = new Date(newDate.getTime() + minutes * 60000);
                    return Math.floor(addFive.getTime() / 1000);
                }

                const expiration = addMinutes(Date.now(), 5);
                const newToken = await prisma.password_resets.create({
                    data: {
                        email: email,
                        token: token,
                        expiration: Number(expiration)
                    }
                });


                const { origin } = absoluteUrl(request);
                const link = `${origin}/reset-password/${token}`;

                const message = `<div>Click on the link below to reset your password, if the link is not working then please paste into the browser.</div></br>
                <div><a href=${link}>Reset Now</a></div>`;

                await sendEmail({
                    to: user.email,
                    subject: "Password Reset",
                    text: message,
                })

                return response.status(200).json({
                    status: true,
                    message: "Please check you email!",
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
