import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma/index";

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user_id = req.user_id;
    if (!user_id) {
        res.status(401).json({ message: " Usuário não Autorizado" });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            id: user_id
        }, select: {
            id: true,
            role: true
        }
    })

    if (!user) {
        res.status(401).json({ message: " Usuário não Autorizado" });
        return;
    }
    if (user.role !== "ADMIN") {
        res.status(403).json({ message: "Acesso negado. Você não tem permissão para acessar este recurso." });
        return;
    }
    //usuario é admin, prossiga para a próxima etapa
    next();
}
