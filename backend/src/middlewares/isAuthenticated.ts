import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token nao Autorizado" });
    }
    try {
        const [, tokenReceived] = token.split(" ");

        try {
            const { sub } = verify(tokenReceived!, process.env.JWT_SECRET! as string) as Payload;
            req.user_id = sub;
            return next();

        }
        catch (err) {
            return res.status(401).json({ message: "Token Invalido" });
        }

        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token Invalido" });
    }
}