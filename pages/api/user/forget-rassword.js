import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import absoluteUrl from "next-absolute-url"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helpers/sendMail";

const prisma = new PrismaClient()

export default async function UserForgetPassword(request, response) {

    const JWTSECRET = process.env.JWT_SECRET

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

                const token = jwt.sign({ _id: user._id }, JWTSECRET, {
                    expiresIn: "1d",
                })

                const { origin } = absoluteUrl(req);
                const link = `${origin}/reset-password/${token}`;

                const message = `<div>Click on the link below to reset your password, if the link is not working then please paste into the browser.</div></br><div>link:${link}</div>`;

                await sendEmail({
                    to: user.email,
                    subject: "Password Reset",
                    text: message,
                })

                return res.status(200).json({
                    status: true,
                    message: "Your password reset link send in email , please check you email!",
                })


            } else {
                return res.status(422).json({ status: false, error: "This account don't exists!!!" })
            }

        } catch (err) {
            console.log(err)
            response.status(500).send("error")
        }
    } else {
        response.status(405).json({ message: "Method not allowed" })
    }

}
