import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id; //aqui pegamos o id do usuário logado, que foi adicionado no middleware de autenticação

        if (!user_id) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute(user_id);

        return res.json(user);
    }
}
export { DetailUserController };
