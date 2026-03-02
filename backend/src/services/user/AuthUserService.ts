import { Response, Request, NextFunction } from "express";
import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthUserServiceProps) {
        const userExists = await prismaClient.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!userExists) {
            throw new Error("Email ou senha incorretos");
        }

        const passwordMatch = await compare(password, userExists.password);
        if (!passwordMatch) {
            throw new Error("Email ou senha incorretos");
        }

        const token = sign({
            name: userExists.name,
            email: userExists.email,
        }, process.env.JWT_SECRET as string, {
            subject: userExists.id,
            expiresIn: "30d",
        })

        return {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            role: userExists.role,
            token: token,
        }
    }
}

export { AuthUserService };