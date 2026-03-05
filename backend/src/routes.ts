//para este routes vamos utilizar a estrutura de camadas (MVC)
// o router recebe as requisições e encaminha para os controllers, 
//que são responsáveis por lidar com a lógica de negócio, e os controllers podem chamar os services,
//que são responsáveis por lidar com a lógica de acesso a dados, e os services podem chamar os repositories,
//que são responsáveis por lidar com a lógica de acesso ao banco de dados

import { Router, Request, Response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { CreateUserController } from './controllers/user/CreateUserController';
import { validateSchema } from './middlewares/validateSchema';
import { createUserSchema, authUserSchema } from './schemas/UserSchema';
import { createCategorySchema, updateCategorySchema } from './schemas/CategorySchema';
import { createProductSchema, listProductsCategorySchema } from './schemas/ProductSchema';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { isAdmin } from './middlewares/isAdmin';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { EditCategoryController } from './controllers/category/EditCategoryController';
import { createProductController } from './controllers/product/CreateProductController';
import { ListProductController } from './controllers/product/ListProductController';
import { DeleteProductController } from './controllers/product/DeleteProductController';
import { ListProductCategoryController } from './controllers/product/ListProductCategoryController';

const router = Router();
const upload = multer(multerConfig);
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


//rotas category
router.post("/category",
    isAuthenticated,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle);

router.get("/categories",
    isAuthenticated,
    new ListCategoryController().handle);

router.put("/category",
    isAuthenticated,
    validateSchema(updateCategorySchema),
    new EditCategoryController().handle);//rota para listar categorias, quando chegar uma requisição do tipo GET para a rota /categories, o router vai chamar o método handle do ListCategoryController

//rota produtos
router.post("/product",
    isAuthenticated,
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    new createProductController().handle);//rota para criar produtos, quando chegar uma requisição do tipo POST para a rota /product, o router vai chamar o método handle do createProductController

router.get("/products", isAuthenticated, new ListProductController().handle);//rota para listar produtos, quando chegar uma requisição do tipo GET para a rota /products, o router vai chamar o método handle do ListProductController

router.post("/product/delete",
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle);//rota para deletar produtos, quando chegar uma requisição do tipo POST para a rota /product/delete, o router vai chamar o método handle do DeleteProductController

router.get("/products/category", isAuthenticated, validateSchema(listProductsCategorySchema), new ListProductCategoryController().handle);//rota para listar produtos por categoria, quando chegar uma requisição do tipo GET para a rota /products/category, o router vai chamar o método handle do ListProductCategoryController
export { router };