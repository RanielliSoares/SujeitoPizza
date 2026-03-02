import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){
        
        const {name, email, password} = req.body; //aqui pegamos os dados enviados no json da requisição
        //console.log({name, email, password});//aqui mostramos os dados no console para verificar se estão chegando corretamente
        
        
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({ name: name, email: email, password: password });

        res.json({message: user});
    }   
}

export {CreateUserController};