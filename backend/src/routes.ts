//para este routes vamos utilizar a estrutura de camadas (MVC)
// o router recebe as requisições e encaminha para os controllers, 
//que são responsáveis por lidar com a lógica de negócio, e os controllers podem chamar os services,
//que são responsáveis por lidar com a lógica de acesso a dados, e os services podem chamar os repositories,
//que são responsáveis por lidar com a lógica de acesso ao banco de dados

import { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { validateSchema } from './middlewares/validateSchema';
import { createUserSchema, authUserSchema } from './schemas/UserSchema';
import { createCategorySchema } from './schemas/CategorySchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { isAdmin } from './middlewares/isAdmin';

const router = Router();
// Rotas Usuario
router.post(
    "/users",
    validateSchema(createUserSchema),
    new CreateUserController().handle);//rota para criar usuários, quando chegar uma requisição do tipo POST para a rota /users, o router vai chamar o método handle do CreateUserController

router.post(
    "/session",
    validateSchema(authUserSchema),
    new AuthUserController().handle);//rota para autenticar usuários, quando chegar uma requisição do tipo POST para a rota /session, o router vai chamar o método handle do AuthUserController

router.get("/me", isAuthenticated, new DetailUserController().handle);//rota para pegar os detalhes do usuário logado, quando chegar uma requisição do tipo GET para a rota /me, o router vai chamar o método handle do DetailUserController
export { router };

//rotas category
router.post("/category", validateSchema(createCategorySchema), isAuthenticated, isAdmin, new CreateCategoryController().handle);